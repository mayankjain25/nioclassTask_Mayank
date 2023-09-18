import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AppProvider} from './context.jsx'
// import { MathJaxContext } from 'better-react-mathjax'
import Landing from './components/Landing.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import FinishPage from './components/FinishPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestPage from './components/TestPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: '/test',
    element: <TestPage />
  },
  {
    path: "/finish",
    element: <FinishPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <MathJaxContext>

    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
 // </MathJaxContext> 

)
