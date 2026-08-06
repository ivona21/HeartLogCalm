import { RouterProvider } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { router } from '@/routes';
import { I18nProvider } from '@/lib/i18n';
import { AuthBootstrap } from '@/features/auth';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <AuthBootstrap />
          <RouterProvider router={router} />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
