const nodemailer = require('nodemailer')

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

// Email templates
const emailTemplates = {
  orderConfirmation: (order) => ({
    subject: `🎂 Order Confirmed - TheCakeTime #${order._id.toString().slice(-8).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #eee; }
          .order-details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-size: 1.2em; font-weight: bold; color: #ec4899; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
          .btn { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎂 TheCakeTime</h1>
            <p>Your order has been confirmed!</p>
          </div>
          <div class="content">
            <h2>Hello ${order.customer.name}!</h2>
            <p>Thank you for your order. We're excited to create something delicious for you!</p>
            
            <div class="order-details">
              <h3>Order #${order._id.toString().slice(-8).toUpperCase()}</h3>
              ${order.items.map(item => `
                <div class="item">
                  <span>${item.product.name} x ${item.quantity}</span>
                  <span>₹${item.price * item.quantity}</span>
                </div>
              `).join('')}
              <div class="item total">
                <span>Total</span>
                <span>₹${order.payment.amount}</span>
              </div>
            </div>
            
            <h3>📦 Delivery Details</h3>
            <p>
              <strong>Address:</strong> ${order.delivery.address}, ${order.delivery.city} - ${order.delivery.pincode}<br>
              <strong>Date:</strong> ${new Date(order.delivery.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
              <strong>Time:</strong> ${order.delivery.time}
            </p>
            
            <a href="${process.env.FRONTEND_URL}/track-order?id=${order._id}" class="btn">Track Your Order</a>
          </div>
          <div class="footer">
            <p>Questions? Contact us at support@thecaketime.com or call +91 1234567890</p>
            <p>© ${new Date().getFullYear()} TheCakeTime. Made with ❤️ in India</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  orderStatusUpdate: (order, newStatus) => ({
    subject: `📦 Order Update - ${getStatusEmoji(newStatus)} ${getStatusText(newStatus)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #eee; }
          .status-badge { display: inline-block; background: ${getStatusColor(newStatus)}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎂 TheCakeTime</h1>
            <p>Order Status Update</p>
          </div>
          <div class="content">
            <h2>Hello ${order.customer.name}!</h2>
            <p>Your order #${order._id.toString().slice(-8).toUpperCase()} has been updated.</p>
            
            <p style="text-align: center; margin: 30px 0;">
              <span class="status-badge">${getStatusEmoji(newStatus)} ${getStatusText(newStatus)}</span>
            </p>
            
            <p>${getStatusMessage(newStatus)}</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} TheCakeTime. Made with ❤️</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  customOrderReceived: (order) => ({
    subject: `🎨 Custom Order Received - TheCakeTime`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #eee; }
          .details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎂 TheCakeTime</h1>
            <p>Custom Order Received!</p>
          </div>
          <div class="content">
            <h2>Hello ${order.customer.name}!</h2>
            <p>We've received your custom cake order! Our team is reviewing your request and will get back to you within 24 hours with a quote.</p>
            
            <div class="details">
              <h3>Your Custom Cake Details</h3>
              <p>
                <strong>Type:</strong> ${order.cakeDetails.type}<br>
                <strong>Flavor:</strong> ${order.cakeDetails.flavor}<br>
                <strong>Weight:</strong> ${order.cakeDetails.weight}<br>
                <strong>Shape:</strong> ${order.cakeDetails.shape}<br>
                ${order.cakeDetails.theme ? `<strong>Theme:</strong> ${order.cakeDetails.theme}<br>` : ''}
                ${order.cakeDetails.message ? `<strong>Message on Cake:</strong> "${order.cakeDetails.message}"<br>` : ''}
              </p>
              <p>
                <strong>Delivery Date:</strong> ${new Date(order.delivery.date).toLocaleDateString('en-IN')}<br>
                <strong>Time:</strong> ${order.delivery.time}
              </p>
            </div>
            
            <p>We'll contact you at ${order.customer.phone} or ${order.customer.email} to confirm the details and pricing.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} TheCakeTime. Made with ❤️</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  adminNewOrder: (order) => ({
    subject: `🔔 New Order Received! #${order._id.toString().slice(-8).toUpperCase()}`,
    html: `
      <h2>New Order Alert!</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Customer:</strong> ${order.customer.name} (${order.customer.phone})</p>
      <p><strong>Amount:</strong> ₹${order.payment.amount}</p>
      <p><strong>Delivery:</strong> ${new Date(order.delivery.date).toLocaleDateString()} at ${order.delivery.time}</p>
      <p><a href="${process.env.FRONTEND_URL}/admin/orders/${order._id}">View Order</a></p>
    `
  })
}

// Helper functions
const getStatusEmoji = (status) => {
  const emojis = {
    pending: '⏳',
    confirmed: '✅',
    preparing: '👨‍🍳',
    out_for_delivery: '🚚',
    delivered: '🎉',
    cancelled: '❌'
  }
  return emojis[status] || '📦'
}

const getStatusText = (status) => {
  const texts = {
    pending: 'Order Pending',
    confirmed: 'Order Confirmed',
    preparing: 'Being Prepared',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return texts[status] || status
}

const getStatusColor = (status) => {
  const colors = {
    pending: '#f59e0b',
    confirmed: '#10b981',
    preparing: '#8b5cf6',
    out_for_delivery: '#3b82f6',
    delivered: '#22c55e',
    cancelled: '#ef4444'
  }
  return colors[status] || '#6b7280'
}

const getStatusMessage = (status) => {
  const messages = {
    pending: 'Your order is being processed. We\'ll confirm it shortly!',
    confirmed: 'Great news! Your order has been confirmed and will be prepared soon.',
    preparing: 'Our expert bakers are now crafting your delicious cake! 👨‍🍳',
    out_for_delivery: 'Your cake is on its way! Get ready for something delicious! 🚚',
    delivered: 'Your order has been delivered! We hope you enjoy it! Please leave us a review. 🎉',
    cancelled: 'Your order has been cancelled. If you have any questions, please contact us.'
  }
  return messages[status] || ''
}

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    // Skip if SMTP not configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('📧 Email skipped (SMTP not configured):', template)
      return { success: false, reason: 'SMTP not configured' }
    }

    const transporter = createTransporter()
    const emailContent = emailTemplates[template](data)

    const info = await transporter.sendMail({
      from: `"TheCakeTime" <${process.env.SMTP_USER}>`,
      to,
      subject: emailContent.subject,
      html: emailContent.html
    })

    console.log('📧 Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('📧 Email error:', error.message)
    return { success: false, error: error.message }
  }
}

module.exports = {
  sendEmail,
  emailTemplates
}
