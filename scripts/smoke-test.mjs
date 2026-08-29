import { createServer } from 'vite'
import { JSDOM } from 'jsdom'
import React from 'react'
import ReactDOMClient from 'react-dom/client'

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'https://marcchen.net/',
  pretendToBeVisual: true,
})

global.window = dom.window
global.document = dom.window.document
Object.defineProperty(global, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
})
global.HTMLElement = dom.window.HTMLElement
global.HTMLCanvasElement = dom.window.HTMLCanvasElement
global.Element = dom.window.Element
global.Node = dom.window.Node
global.SVGElement = dom.window.SVGElement
global.getComputedStyle = dom.window.getComputedStyle
global.requestAnimationFrame = (cb) => setTimeout(cb, 16)
global.cancelAnimationFrame = (id) => clearTimeout(id)
global.matchMedia =
  global.matchMedia ||
  ((query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
dom.window.matchMedia = global.matchMedia
class MockObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}
global.IntersectionObserver = MockObserver
dom.window.IntersectionObserver = MockObserver
global.ResizeObserver = MockObserver
dom.window.ResizeObserver = MockObserver

// jsdom doesn't implement canvas context; stub it so FlowField doesn't throw
HTMLCanvasElement.prototype.getContext = () => null

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')

  const root = ReactDOMClient.createRoot(document.getElementById('root'))
  root.render(React.createElement(App))

  // Let effects / microtasks flush
  await new Promise((r) => setTimeout(r, 300))

  const rootEl = document.getElementById('root')
  const html = rootEl.innerHTML
  const text = rootEl.textContent
  if (!html || html.length < 500) {
    throw new Error(`Rendered output looks too small (${html.length} chars) — something likely failed silently.`)
  }

  const checks = [
    'Marc Chenard',
    'Work Experience',
    'Education',
    'Selected Projects',
    'Get In Touch',
    'Data Science & Medical Informatics Intern',
    'Pentest MCP',
  ]
  const missing = checks.filter((t) => !text.includes(t))

  console.log('✓ App rendered without throwing.')
  console.log(`✓ Root HTML length: ${html.length} chars`)
  if (missing.length) {
    console.error('✗ Missing expected content:', missing)
    process.exitCode = 1
  } else {
    console.log('✓ All expected content strings found in rendered output.')
  }
} catch (err) {
  console.error('✗ Smoke test failed:', err)
  process.exitCode = 1
} finally {
  await vite.close()
  // Motion's internal frame loop keeps scheduling via our mocked
  // requestAnimationFrame forever; force-exit rather than hang.
  process.exit(process.exitCode ?? 0)
}
