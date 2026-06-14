import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LogStreamTerminal } from '../features/telemetry/components/LogStreamTerminal';
import { clusterRegistryAtom, globalLogsAtom, systemHealthSelectorAtom } from '../store/clusterStore';
import { useAtom, useAtomValue } from 'jotai';

export function AnalyticsPanel() {
    const logs = useAtomValue(globalLogsAtom);
    const systemHealth = useAtomValue(systemHealthSelectorAtom);
    const [nodes, setNodes] = useAtom(clusterRegistryAtom);

    const toggleNodeStatus = (targetId: string) => {
        const updatedNodes = nodes.map(node =>
            node.nodeId === targetId ? { ...node, isOnline: !node.isOnline } : node
        );
        setNodes(updatedNodes);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 rounded-lg font-mono shadow-sm text-slate-800">
            <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-sm font-bold tracking-wider text-slate-500 uppercase">ANALYTICS ENGINE METRICS</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">OPERATIONAL HEALTH</span>
                    <span className={`text-2xl font-bold ${systemHealth < 80 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {systemHealth}%
                    </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">TOTAL DISTINCT LOG SIGNATURES</span>
                    <span className="text-2xl font-bold text-slate-900">
                        {logs.length}
                    </span>
                </div>
            </div>

            <div className="text-[10px] text-slate-400 italic mt-4 border-t border-slate-100 pt-4">
                Derived metrics are calculated live using background Jotai atomic nodes.
            </div>

            <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h3 className="text-xs font-bold text-slate-500 mb-3">INFRASTRUCTURE NODE CONTROLS</h3>
                <div className="space-y-2">
                    {nodes.map(node => (
                        <div key={node.nodeId} className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <span className="text-slate-900 font-bold">{node.nodeId}</span>
                            <button
                                onClick={() => toggleNodeStatus(node.nodeId)}
                                className={`px-3 py-1 text-[10px] font-bold rounded border transition-colors ${node.isOnline
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                                    }`}
                            >
                                {node.isOnline ? 'ONLINE // ACTIVE' : 'OFFLINE // DISCONNECTED'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function AppRoutes() {
    return (
        <BrowserRouter>
            <div className="max-w-4xl mx-auto mb-6 flex space-x-4 font-mono text-xs">
                <Link to="/" className="px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:border-slate-400 transition-colors shadow-sm font-bold">
                    LIVE STREAM
                </Link>
                <Link to="/analytics" className="px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:border-slate-400 transition-colors shadow-sm font-bold">
                    ANALYTICS ENGINE
                </Link>
            </div>

            <Routes>
                <Route path="/" element={<LogStreamTerminal />} />
                <Route path="/analytics" element={<AnalyticsPanel />} />
            </Routes>
        </BrowserRouter>
    );
}
