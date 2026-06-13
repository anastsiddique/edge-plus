import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LogStreamTerminal } from '../features/telemetry/components/LogStreamTerminal';

export function AnalyticsPanel() {
    return (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg font-mono text-center text-slate-400">
            ANALYTICS ENGINE DISPATCHED // Node telemetry visual analytics loading...
        </div>
    );
}

export function AppRoutes() {
    return (
        <BrowserRouter>
            <div className="max-w-4xl mx-auto mb-6 flex space-x-4 font-mono text-xs">
                <Link to="/" className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:border-emerald-500 transition-colors">
          // LIVE_STREAM
                </Link>
                <Link to="/analytics" className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:border-blue-500 transition-colors">
          // ANALYTICS_ENGINE
                </Link>
            </div>

            <Routes>
                <Route path="/" element={<LogStreamTerminal />} />
                <Route path="/analytics" element={<AnalyticsPanel />} />
            </Routes>
        </BrowserRouter>
    );
}
