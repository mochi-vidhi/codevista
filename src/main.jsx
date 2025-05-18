import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen/HomeScreen.jsx'
import { PlaygroundScreen } from './screens/PlaygroundScreen/PlaygroundScreen.jsx'
// import SignInPage from './auth/sign-in/SignInPage.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App/>
  </StrictMode>,
)
