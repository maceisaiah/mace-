import nodemailer from 'nodemailer';

interface OrderData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    size: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export async function sendOrderNotification(orderData: OrderData) {
  try {
    // Check if email is configured
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Email not configured. Skipping notification.');
      return { success: false, error: 'Email not configured' };
    }

    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const businessEmail = process.env.BUSINESS_EMAIL || process.env.EMAIL_USER;

    // Email to business owner
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; color: #fff; padding: 20px; text-align: center;">
          <h1 style="color: #ef4444; margin: 0;">🔥 NEW ORDER ALERT 🔥</h1>
          <p style="margin: 10px 0 0 0;">Kryptic Studios</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px;">
          <h2 style="color: #333; margin-top: 0;">Order Details</h2>
          
          <div style="background: #fff; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Order ID: ${orderData.orderId}</h3>
            <p style="margin: 5px 0;"><strong>Customer:</strong> ${orderData.customerName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${orderData.customerEmail}</p>
          </div>

          <div style="background: #fff; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Items Ordered</h3>
            ${orderData.items.map(item => `
              <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee;">
                <span>${item.name} (${item.size}) x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>

          <div style="background: #fff; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Order Summary</h3>
            <div style="display: flex; justify-content: space-between; padding: 3px 0;">
              <span>Subtotal:</span>
              <span>$${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 3px 0;">
              <span>Shipping:</span>
              <span>$${orderData.shipping.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 3px 0;">
              <span>Tax:</span>
              <span>$${orderData.tax.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 3px 0; border-top: 2px solid #ef4444; margin-top: 10px; font-weight: bold;">
              <span>Total:</span>
              <span>$${orderData.total.toFixed(2)}</span>
            </div>
          </div>

          <div style="background: #fff; padding: 15px; border-radius: 5px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Shipping Address</h3>
            <p style="margin: 5px 0;">${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress.address}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zip}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress.country}</p>
          </div>
        </div>

        <div style="background: #1a1a1a; color: #fff; padding: 20px; text-align: center;">
          <p style="margin: 0;">Time to fulfill this order! 🚀</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: businessEmail,
      subject: `🔥 New Order #${orderData.orderId} - $${orderData.total.toFixed(2)}`,
      html: businessEmailHtml,
    });

    // Email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a1a; color: #fff; padding: 20px; text-align: center;">
          <h1 style="color: #ef4444; margin: 0;">KRYPTIC STUDIOS</h1>
          <p style="margin: 10px 0 0 0;">Order Confirmation</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px;">
          <h2 style="color: #333; margin-top: 0;">Thank you for your order!</h2>
          
          <div style="background: #fff; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Order ID: ${orderData.orderId}</h3>
            <p style="margin: 5px 0;">We've received your order and will process it shortly.</p>
          </div>

          <div style="background: #fff; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Items Ordered</h3>
            ${orderData.items.map(item => `
              <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee;">
                <span>${item.name} (${item.size}) x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>

          <div style="background: #fff; padding: 15px; border-radius: 5px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Order Total</h3>
            <div style="text-align: center; font-size: 24px; font-weight: bold; color: #ef4444;">
              $${orderData.total.toFixed(2)}
            </div>
          </div>
        </div>

        <div style="background: #1a1a1a; color: #fff; padding: 20px; text-align: center;">
          <p style="margin: 0;">We'll send you tracking info once your order ships! 🚀</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: orderData.customerEmail,
      subject: `Order Confirmation #${orderData.orderId} - Kryptic Studios`,
      html: customerEmailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}