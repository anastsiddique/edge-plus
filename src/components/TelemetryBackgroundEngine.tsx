import { useAtomValue, useSetAtom } from 'jotai';
import { clusterRegistryAtom, globalLogsAtom } from '../store/clusterStore';
import { LogStreamOptimizer } from '../features/telemetry/services/logParser';
import { generateTelemetryBatch } from '../features/telemetry/services/mockStreamGenerator';
import type { DeduplicatedLog, TelemetryPacket } from '../features/telemetry/types/telemetry.types';
import { useEffect, useRef } from 'react';

export function TelemetryBackgroundEngine() {
    const setGlobalLogs = useSetAtom(globalLogsAtom);
    const currentNodes = useAtomValue(clusterRegistryAtom);
    const bufferRef = useRef<TelemetryPacket[]>([]);
    const cacheRef = useRef<Map<string, DeduplicatedLog>>(new Map());
    const nodesRef = useRef(currentNodes);

    useEffect(() => {
        nodesRef.current = currentNodes;
    }, [currentNodes]);

    useEffect(() => {
        const ingestionTimer = setInterval(() => {
            const newPackets = generateTelemetryBatch();

            const allowedPackets = newPackets.filter(packet => {
                const matchingNodes = nodesRef.current.find(node => node.nodeId === packet.serverNodeId);
                return matchingNodes ? matchingNodes.isOnline : false;
            });
            bufferRef.current.push(...allowedPackets);
        }, 200);

        const reconciliationTimer = setInterval(() => {
            if (bufferRef.current.length === 0) return;

            const batch = bufferRef.current;
            bufferRef.current = [];

            const nextCache = LogStreamOptimizer.processStreamBatch(batch, cacheRef.current);
            cacheRef.current = nextCache;

            setGlobalLogs(Array.from(nextCache.values()));
        }, 1000);

        return () => {
            clearInterval(ingestionTimer);
            clearInterval(reconciliationTimer);
        };
    }, [setGlobalLogs]);

    return null;
}
