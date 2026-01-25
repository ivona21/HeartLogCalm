import { RouterProvider } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/Toaster';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { router } from '@/routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
