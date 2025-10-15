import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    // const session = await getServerSession(authOptions)
    const session = null // Temporarily disabled
    
    if (!session?.user || !('id' in session.user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: (session.user as any).id
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true
              }
            },
            variant: true
          }
        },
        payments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { items, shippingAddress, billingAddress } = await request.json()
    // const session = await getServerSession(authOptions)
    const session = null // Temporarily disabled

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    // Calculate totals
    let subtotal = 0
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true }
      })
      
      if (!product) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 })
      }

      const price = product.variants.find(v => v.id === item.variantId)?.price || product.price
      subtotal += price * item.quantity
    }

    const shipping = subtotal < 5000 ? 899 : 0 // $8.99 in cents
    const tax = Math.round(subtotal * 0.08)
    const total = subtotal + shipping + tax

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: `KS-${Date.now()}`,
        status: 'PENDING',
        subtotal,
        tax,
        shipping,
        total,
        userId: session?.user && 'id' in session.user ? (session.user as any).id : null,
        shippingAddress: shippingAddress || null,
        billingAddress: billingAddress || null,
        items: {
          create: items.map((item: { productId: string; variantId?: string; quantity: number; price: number }) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true
              }
            },
            variant: true
          }
        }
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
