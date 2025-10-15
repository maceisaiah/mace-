import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendOrderNotification } from '@/lib/email'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentSuccess(paymentIntent)
        break
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailure(paymentIntent)
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { userId, items } = paymentIntent.metadata

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: `KS-${Date.now()}`,
        status: 'CONFIRMED',
        subtotal: paymentIntent.amount - 899 - Math.round((paymentIntent.amount - 899) * 0.08), // Remove shipping and tax
        tax: Math.round((paymentIntent.amount - 899) * 0.08),
        shipping: 899,
        total: paymentIntent.amount,
        userId: userId !== 'guest' ? userId : null,
        items: {
          create: JSON.parse(items).map((item: { id: string; variantId?: string; quantity: number; price: number }) => ({
            productId: item.id,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          }))
        },
        payments: {
          create: {
            amount: paymentIntent.amount,
            status: 'COMPLETED',
            method: 'stripe',
            transactionId: paymentIntent.id,
          }
        }
      }
    })

    // Update inventory
    for (const item of JSON.parse(items) as { id: string; variantId?: string; quantity: number }[]) {
      if (item.variantId) {
        await prisma.productVariant.update({
          where: { id: item.variantId },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        })
      } else {
        await prisma.product.update({
          where: { id: item.id },
          data: {
            quantity: {
              decrement: item.quantity
            }
          }
        })
      }
    }

    // Send email notifications
    try {
      const orderData = {
        orderId: order.orderNumber,
        customerEmail: paymentIntent.receipt_email || 'unknown@example.com',
        customerName: `${paymentIntent.metadata.firstName || ''} ${paymentIntent.metadata.lastName || ''}`.trim() || 'Unknown Customer',
        items: JSON.parse(items).map((item: any) => ({
          name: item.name || 'Unknown Item',
          price: item.price / 100, // Convert from cents
          quantity: item.quantity,
          size: item.size || 'Unknown'
        })),
        subtotal: order.subtotal / 100, // Convert from cents
        shipping: order.shipping / 100, // Convert from cents
        tax: order.tax / 100, // Convert from cents
        total: order.total / 100, // Convert from cents
        shippingAddress: {
          firstName: paymentIntent.metadata.firstName || '',
          lastName: paymentIntent.metadata.lastName || '',
          address: paymentIntent.metadata.address || '',
          city: paymentIntent.metadata.city || '',
          state: paymentIntent.metadata.state || '',
          zip: paymentIntent.metadata.zip || '',
          country: paymentIntent.metadata.country || 'US'
        }
      }

      await sendOrderNotification(orderData)
      console.log('Order notification sent successfully')
    } catch (emailError) {
      console.error('Error sending order notification:', emailError)
    }

    console.log(`Order ${order.orderNumber} created successfully`)
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment failed for intent ${paymentIntent.id}`)
  // Handle payment failure logic here
}
