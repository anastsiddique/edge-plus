import React from 'react';
import { useLogBuffer } from '../hooks/useLogBuffer';
import { TerminalPanelWrapper } from '../../../components/TerminalPanelWrapper';

export const LogStreamTerminal: React.FC = () => {
  const logs = useLogBuffer();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-950 min-h-screen text-slate-100">
      <TerminalPanelWrapper title="Live Operational Control Mesh">
        <div className="space-y-1.5 font-mono text-xs">
          {logs && logs.length === 0 ? (
            <div className="text-slate-500 text-center py-12 animate-pulse italic">
              Connecting to edge mesh telemetry nodes...
            </div>
          ) : (
            logs?.map(log => (
              <div key={log.id} className="flex justify-between items-center py-1 border-b border-slate-900/60 hover:bg-slate-900/40 px-2 rounded transition-colors">
                <div className="flex items-center space-x-3 min-w-0">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide border ${
                    log.severity === 'CRITICAL' ? 'bg-rose-950/60 text-rose-400 border-rose-900/40 animate-pulse' :
                    log.severity === 'WARNING' ? 'bg-amber-950/60 text-amber-400 border-amber-900/40' :
                    'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    {log.severity}
                  </span>
                  <span className="text-emerald-400 font-bold shrink-0">{log.serverNodeId}</span>
                  <span className="text-blue-400 shrink-0">[{log.metrics.geo.datacenter}]</span>
                  <p className="text-slate-300 truncate">{log.message}</p>
                </div>
                <div className="flex items-center space-x-3 shrink-0 pl-4 text-slate-500 text-[10px]">
                  <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 px-1 rounded font-bold">
                    ×{log.occurrenceCount}
                  </span>
                  <span>{new Date(log.lastSeenTimestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </TerminalPanelWrapper>
    </div>
  );
};
