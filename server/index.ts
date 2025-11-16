import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a custom Vite server that bypasses the locked vite.config.ts
// Overrides: root directory, resolve aliases, and server settings
async function startVite() {
  const viteConfig = await import('../vite.config.js');
  
  const server = await createServer({
    ...viteConfig.default,
    // Override root to current directory instead of "client"
    root: path.resolve(__dirname, '..'),
    // Override resolve aliases to point to new locations
    resolve: {
      ...viteConfig.default.resolve,
      alias: {
        '@': path.resolve(__dirname, '..', 'src'),
        '@shared': path.resolve(__dirname, '..', 'src', 'types'),
        '@assets': path.resolve(__dirname, '..', 'attached_assets'),
      },
    },
    // Override build output directory
    build: {
      ...viteConfig.default.build,
      outDir: path.resolve(__dirname, '..', 'dist/public'),
    },
    server: {
      ...viteConfig.default.server,
      port: 5000,
      host: true,
      // Allow all hosts for testing and development (bypasses DNS rebinding check)
      allowedHosts: true,
      hmr: {
        clientPort: 5000,
      },
    },
  });

  await server.listen();
  server.printUrls();
  
  // Handle shutdown gracefully
  process.on('SIGTERM', async () => {
    await server.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    await server.close();
    process.exit(0);
  });
}

startVite().catch((error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});
