import { createServer } from 'vite';

// Create a custom Vite server that bypasses the locked vite.config.ts
// for the server.allowedHosts setting only
async function startVite() {
  const viteConfig = await import('../vite.config.js');
  
  const server = await createServer({
    ...viteConfig.default,
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
