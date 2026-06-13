import { atom } from "jotai";
import type { DeduplicatedLog } from "../features/telemetry/types/telemetry.types";

export interface ServerNode {
    nodeId: string;
    region: string;
    isOnline: boolean;
}

export const clusterRegistryAtom = atom<ServerNode[]>([
    { nodeId: 'node-edge-1', region: 'dc-region-1', isOnline: true },
    { nodeId: 'node-edge-2', region: 'dc-region-2', isOnline: false },
    { nodeId: 'node-edge-3', region: 'dc-region-1', isOnline: true }
])

export const activeNodesCountAtom = atom<number>((get) => {
    const nodeRegistry = get(clusterRegistryAtom);
    return nodeRegistry.filter((node) => node.isOnline).length;
});

export const globalLogsAtom = atom<DeduplicatedLog[]>([]);

export const systemHealthSelectorAtom = atom((get) => {
  const currentLogs = get(globalLogsAtom);
  
  if (currentLogs.length === 0) return 100;

  const criticalCount = currentLogs.filter(log => log.severity === 'CRITICAL').length;
  const healthPercentage = 100 - (criticalCount / currentLogs.length) * 100;
  
  return Math.round(healthPercentage);
});