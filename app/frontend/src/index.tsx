import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './Common/Redux/store'
import { BrowserRouter } from 'react-router-dom'
import Main from './Common/Containers/Main'
import intl from 'intl'
import 'intl/locale-data/jsonp/en'

if (!(window as any).Intl) { (window as any).Intl = intl }

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
