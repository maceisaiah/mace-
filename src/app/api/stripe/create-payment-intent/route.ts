import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { items, userId } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    // Calculate total amount
    let totalAmount = 0
    const lineItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
        include: { variants: true }
      })

      if (!product) {
        return NextResponse.json({ error: `Product ${item.id} not found` }, { status: 404 })
      }

      const price = product.variants.find(v => v.id === item.variantId)?.price || product.price
      const itemTotal = price * item.quantity
      totalAmount += itemTotal

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.images[0]?.url || ''],
          },
          unit_amount: price,
        },
        quantity: item.quantity,
      })
    }

    // Add shipping (free over $50)
    const shipping = totalAmount < 5000 ? 899 : 0 // $8.99 in cents
    totalAmount += shipping

    // Add tax (8%)
    const tax = Math.round(totalAmount * 0.08)
    totalAmount += tax

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      metadata: {
        userId: userId || 'guest',
        items: JSON.stringify(items),
        // Add customer information for notifications
        firstName: 'John', // You'll want to pass this from the frontend
        lastName: 'Doe',   // You'll want to pass this from the frontend
        address: '123 Main St', // You'll want to pass this from the frontend
        city: 'Los Angeles', // You'll want to pass this from the frontend
        state: 'CA', // You'll want to pass this from the frontend
        zip: '90210', // You'll want to pass this from the frontend
        country: 'US', // You'll want to pass this from the frontend
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
