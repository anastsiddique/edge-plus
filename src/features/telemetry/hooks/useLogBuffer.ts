import { useEffect, useRef, useState } from "react";
import type { DeduplicatedLog, TelemetryPacket } from "../types/telemetry.types";
import { LogStreamOptimizer } from "../services/logParser";
import { generateTelemetryBatch } from "../services/mockStreamGenerator";

export function useLogBuffer() {
    const [logCache, setLogCache] = useState<Map<string, DeduplicatedLog>>(new Map());
    const bufferRef = useRef<TelemetryPacket[]>([]);

    useEffect(() => {
        const ingestionTimer = setInterval(() => {
            const newPackets = generateTelemetryBatch();
            bufferRef.current.push(...newPackets);
        }, 200);

        const reconciliationTimer = setInterval(() => {
            if (bufferRef.current.length === 0) return;

            const batch = bufferRef.current;
            bufferRef.current = [];

            setLogCache(previousCache => {
                return LogStreamOptimizer.processStreamBatch(batch, previousCache);
            });
        }, 1000);

        return () => {
            clearInterval(ingestionTimer);
            clearInterval(reconciliationTimer);
        };
    }, []);

    return Array.from(logCache.values()).sort((a, b) => b.lastSeenTimestamp - a.lastSeenTimestamp);
}
