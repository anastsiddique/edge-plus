import { Provider } from 'jotai';
import { AppRoutes } from './routes/AppRoutes';
import { TelemetryBackgroundEngine } from './components/TelemetryBackgroundEngine';

export default function App() {
  return (
    <Provider>
      <TelemetryBackgroundEngine />
      <div className="w-full min-h-screen bg-slate-50 antialiased p-4">
        <AppRoutes />
      </div>
    </Provider>
  );
}
