import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

export function TerminalPanelWrapper({ title, children }: PanelProps) {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-[550px] font-sans text-slate-800">
      <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase pl-2">
            EDGE-PLUS // {title}
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-white text-slate-700">
        {children}
      </div>
    </div>
  );
}
