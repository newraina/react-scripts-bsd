
import styles from './app.css'

import React from 'react'
import logo from 'asset/logo.svg'

interface IAppProps {}

class App extends React.Component<IAppProps, {}> {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className={styles.appIntro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
