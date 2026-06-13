import { useAtomValue } from 'jotai';
import { clusterRegistryAtom, activeNodesCountAtom } from '../../../store/clusterStore';

export function ClusterSummaryHeader() {
    const allNodes = useAtomValue(clusterRegistryAtom);
    const activeCount = useAtomValue(activeNodesCountAtom);

    return (
        <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-lg mb-4 font-mono text-slate-800 shadow-sm">
            <div className="flex space-x-6">
                <div>
                    <span className="text-slate-400 text-xs block font-bold">TOTAL DISPATCHED NODES</span>
                    <span className="text-xl font-bold text-slate-900">
                        {allNodes.length || '-'}
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 text-xs block font-bold">ACTIVE RUNTIME MESH</span>
                    <span className="text-xl font-bold text-emerald-600">
                        {activeCount || 0}
                    </span>
                </div>
            </div>
            <div className="text-right">
                <span className="text-slate-400 text-xs block font-bold">MESH INTEGRITY</span>
                <span className="text-xs text-blue-600 font-bold px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded">
                    DECENTRALIZED JOTAI ATOMIC
                </span>
            </div>
        </div>
    );
}
