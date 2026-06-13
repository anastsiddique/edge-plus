import { useLogBuffer } from '../hooks/useLogBuffer';
import { TerminalPanelWrapper } from '../../../components/TerminalPanelWrapper';
import { ClusterSummaryHeader } from './ClusterSummaryHeader';

export function LogStreamTerminal() {
  const logs = useLogBuffer();

  return (
    <div className="max-w-4xl mx-auto p-2">
      <ClusterSummaryHeader />
      <TerminalPanelWrapper title="LIVE OPERATIONAL CONTROL MESH">
        <div className="space-y-1 font-mono text-xs">
          {logs && logs.length === 0 ? (
            <div className="text-slate-500 text-center py-12 italic">
              Connecting to edge mesh telemetry nodes...
            </div>
          ) : (
            logs?.map(log => (
              <div key={log.id} className="flex justify-between items-center py-2 border-b border-slate-200 hover:bg-slate-50 px-2 rounded transition-colors">
                <div className="flex items-center space-x-3 min-w-0">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide border ${log.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse' :
                      log.severity === 'WARNING' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                        'bg-slate-100 text-slate-900 border-slate-300'
                    }`}>
                    {log.severity}
                  </span>

                  <span className="text-slate-900 font-bold shrink-0">{log.serverNodeId}</span>
                  <span className="text-blue-800 font-bold shrink-0">[{log.metrics.geo.datacenter}]</span>
                  <p className="text-slate-900 font-medium truncate">{log.message}</p>
                </div>

                <div className="flex items-center space-x-3 shrink-0 pl-4 text-slate-900 text-[10px]">
                  <span className="bg-slate-200 text-slate-900 border border-slate-300 px-1.5 py-0.5 rounded font-bold">
                    ×{log.occurrenceCount}
                  </span>
                  <span className="text-slate-600 font-medium">{new Date(log.lastSeenTimestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </TerminalPanelWrapper>
    </div>
  );
}
