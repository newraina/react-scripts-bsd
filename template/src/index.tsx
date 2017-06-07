
import './index.css'

import ReactDOM from 'react-dom'
import React from 'react'

import App from './container/app'
import registerServiceWorker from './registerServiceWorker'

window.init = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
  registerServiceWorker()
}
