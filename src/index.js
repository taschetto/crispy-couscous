import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { AppProviders } from 'contexts/AppProviders'

const startWorker = async () => {
  const { worker } = require('mocks/browser')
  await worker.start()
}

startWorker()

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)
