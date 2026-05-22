import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const preloader = document.getElementById('preloader')
if (preloader) {
  preloader.classList.add('is-hidden')
  window.setTimeout(() => {
    preloader.remove()
  }, 550)
}
