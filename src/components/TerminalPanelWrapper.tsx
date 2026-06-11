import React from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

export const TerminalPanelWrapper: React.FC<PanelProps> = ({ title, children }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[550px] font-sans text-slate-100">
      <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase pl-2">
            EDGE-PLUS // {title}
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-slate-950/40 text-slate-300">
        {children}
      </div>
    </div>
  );
};
