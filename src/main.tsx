import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import lightBg from './assets/light.jpg'
import darkBg from './assets/dark.jpg'

const loadCss = () => import('./index.css')

// Kick CSS loading as soon as the first frame can be scheduled to avoid idle delays.
if (typeof requestAnimationFrame === 'function') {
  requestAnimationFrame(() => loadCss())
} else {
  setTimeout(loadCss, 0)
}

// Swap in real background images ASAP without blocking first paint.
const rootEl = document.documentElement
const preloadBg = new Image()
preloadBg.src = lightBg
preloadBg.onload = () => rootEl.style.setProperty('--page-bg', `url(${lightBg})`)
const preloadBgDark = new Image()
preloadBgDark.src = darkBg
preloadBgDark.onload = () => {
  if (rootEl.classList.contains('dark')) {
    rootEl.style.setProperty('--page-bg', `url(${darkBg})`)
  }
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
