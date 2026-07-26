import { defineConfig } from 'orval';

export default defineConfig({
  heartlog: {
    input: {
      target: './docs/integrations/backend-api.openapi.json',
    },
    output: {
      mode: 'single',
      target: './src/shared/api/heartlog.generated.ts',
      client: 'fetch',
      schemas: false,
      mock: false,
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        mutator: {
          path: './src/shared/api/heartlog-mutator.ts',
          name: 'heartlogFetch',
        },
      },
    },
  },
});
