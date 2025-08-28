import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {} from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51RzWVSRCPjYBVdCb47F8jNNqwiCxyUBYy9ZlWxSucXSrLUBs53GIwgIo7QABuwY9M5tNdxQi0SwAm1WeLvoVc3MN00VCAMOF3B");


createRoot(document.getElementById('root')).render(

  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>     
  </Elements>
)
