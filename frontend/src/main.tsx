import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import { csrfFetch, restoreCSRF } from './store/csrf.ts'
import * as sessionActions from './store/session.ts';

declare global {
    interface Window {
      csrfFetch: any,
      store: any,
      sessionActions:any
    }
}

// if(/Android|webOS|iPhone/i.test(navigator.userAgent)){
//   console.log("mobile")
// } else {
//   console.log("not mobile");
// }

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


function Root() {




  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
