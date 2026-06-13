import { atom } from "jotai";

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