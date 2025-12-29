import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

const loadCss = () => import('./index.css')

// Load CSS on the first microtask to minimize render-blocking delay.
// Promise resolves before rAF, reducing time to paint.
Promise.resolve().then(() => loadCss())

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
