import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import Navigation from './shared/Navigation.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <App />
      </div>
    </Provider>
  </StrictMode>,
)
