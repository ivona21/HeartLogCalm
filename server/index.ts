import { spawn } from 'child_process';

// Simple wrapper to run Vite dev server on port 5000
// This allows the locked workflow configuration to work without modification

const vite = spawn('vite', ['--port', '5000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true,
});

vite.on('error', (error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});

vite.on('exit', (code) => {
  process.exit(code || 0);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  vite.kill('SIGTERM');
});

process.on('SIGINT', () => {
  vite.kill('SIGINT');
});
