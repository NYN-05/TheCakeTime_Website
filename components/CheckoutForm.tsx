import { useState } from 'react'
import { useRouter } from 'next/router'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Lock } from 'lucide-react'
import type { OrderCustomer, OrderDelivery, OrderItem } from '../types'
import { ButtonLoading } from './Loading'

interface CheckoutFormProps {
  amount: number
  orderData: {
    customer: OrderCustomer
    items: OrderItem[]
    delivery: OrderDelivery
  }
}

export default function CheckoutForm({ amount, orderData }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Confirm payment
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
        redirect: 'if_required',
      })

      if (submitError) {
        setError(submitError.message || 'Payment failed')
        setLoading(false)
        return
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Verify payment and create order
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            orderData: {
              ...orderData,
              payment: {
                method: 'card',
                status: 'paid',
                amount: amount,
                currency: 'inr',
              },
            },
          }),
        })

        const data = await response.json()

        if (data.success) {
          // Clear cart
          localStorage.removeItem('cart')
          
          // Redirect to success page
          router.push(`/order-success?order_id=${data.order.id}&order_number=${data.order.orderNumber}`)
        } else {
          throw new Error('Order creation failed')
        }
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'Payment processing failed')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center mb-4">
          <CreditCard className="mr-2 text-primary-600" size={24} />
          <h3 className="text-lg font-semibold">Card Details</h3>
        </div>
        
        <PaymentElement />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <ButtonLoading
          type="submit"
          loading={loading}
          disabled={!stripe}
          className="btn-primary w-full py-3 text-lg"
        >
          {`Pay ₹${amount}`}
        </ButtonLoading>

        <div className="flex items-center justify-center text-sm text-gray-600">
          <Lock size={16} className="mr-1" />
          <span>Secure payment powered by Stripe</span>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Your payment information is encrypted and secure. We never store your card details.
        </p>
      </div>
    </form>
  )
}
