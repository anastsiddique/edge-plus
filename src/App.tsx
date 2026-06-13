import { Provider } from 'jotai';
import { LogStreamTerminal } from './features/telemetry/components/LogStreamTerminal';

export default function App() {
  return (
    <Provider>
      <div className="w-full min-h-screen bg-slate-950 antialiased p-4">
        <LogStreamTerminal />
      </div>
    </Provider>
  );
}
