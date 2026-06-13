import React from 'react';
import { useAtomValue } from 'jotai'; // Imported Jotai reader hook
import { activeNodesCountAtom, clusterRegistryAtom } from '../../../store/clusterStore';

export const ClusterSummaryHeader: React.FC = () => {
    const allNodes = useAtomValue(clusterRegistryAtom);
    const activeCount = useAtomValue(activeNodesCountAtom);

    return (
        <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-lg mb-4 font-mono text-slate-100">
            <div className="flex space-x-6">
                <div>
                    <span className="text-slate-500 text-xs block">TOTAL DISPATCHED NODES</span>
                    <span className="text-xl font-bold text-slate-200">
                        {allNodes.length || '-'}
                    </span>
                </div>
                <div>
                    <span className="text-slate-500 text-xs block">ACTIVE RUNTIME MESH</span>
                    <span className="text-xl font-bold text-emerald-400">
                        {activeCount || 0}
                    </span>
                </div>
            </div>
            <div className="text-right">
                <span className="text-slate-500 text-xs block">MESH INTEGRITY</span>
                <span className="text-xs text-blue-400 font-bold px-1.5 py-0.5 bg-blue-950/40 border border-blue-900/30 rounded">
                    DECENTRALIZED JOTAI ATOMIC
                </span>
            </div>
        </div>
    );
};
