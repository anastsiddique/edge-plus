import { Provider } from 'jotai';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <Provider>
      <div className="w-full min-h-screen bg-slate-50 antialiased p-4">
        <AppRoutes />
      </div>
    </Provider>
  );
}
