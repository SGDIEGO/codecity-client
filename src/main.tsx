import { createRoot } from 'react-dom/client'

import AppRouterProvider from "./router"

import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppRouterProvider />
  </QueryClientProvider>
)
