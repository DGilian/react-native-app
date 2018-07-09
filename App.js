
import React from 'react'
import Navigation from './navigation/navigation'
import { Provider } from 'react-redux'
import Store from './store/configureStore'

export default class App extends React.Component {
  render() {
    return (
      //provider permet d'acceder au store dans toute l'application
      <Provider store={Store}>
        <Navigation />
      </Provider>
    )
  }
}

