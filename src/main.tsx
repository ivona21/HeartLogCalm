import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { startBackendWarmup } from './lib/backendWarmup';

startBackendWarmup();

createRoot(document.getElementById('root')!).render(<App />);
