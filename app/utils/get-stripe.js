import { loadStripe } from '@stripe/stripe-js'

let stripePromise

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51PpdUQEPWqvBi3h2tniqGjS9qAYqWYvkmDCwAMzP1TCDUmQzUKJglqV1IGiOZWKz4N3uKzIiWnSz7DUqWo4DXDyO00vSbWEfi7")
  }
  return stripePromise
}

export default getStripe