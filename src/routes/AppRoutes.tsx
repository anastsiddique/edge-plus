import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LogStreamTerminal } from '../features/telemetry/components/LogStreamTerminal';

export function AnalyticsPanel() {
    return (
        <div className="max-w-4xl mx-auto p-12 bg-white border border-slate-200 rounded-lg font-mono text-center text-slate-600 shadow-sm font-medium">
            ANALYTICS ENGINE DISPATCHED // Node telemetry visual analytics loading...
        </div>
    );
}


export function AppRoutes() {
    return (
        <BrowserRouter>
            <div className="max-w-4xl mx-auto mb-6 flex space-x-4 font-mono text-xs">
                <Link to="/" className="px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:border-slate-400 transition-colors shadow-sm font-bold">
          // LIVE_STREAM
                </Link>
                <Link to="/analytics" className="px-3 py-1.5 bg-white border border-slate-200 rounded text-slate-700 hover:border-slate-400 transition-colors shadow-sm font-bold">
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
