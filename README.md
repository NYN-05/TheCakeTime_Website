# TheCakeTime Bakery Website

A complete, production-ready bakery website built with Next.js, React, Express, MongoDB, and Stripe payment integration.

## Features

### Customer-Facing Features
- 🏠 Beautiful landing page with parallax effects and animated hero section
- 🎂 Product catalog with advanced filtering and sorting
- 🔍 Search functionality with real-time results
- 📦 Individual product detail pages with reviews
- 🛒 Shopping cart with persistent storage
- 💳 Stripe payment integration for secure checkout
- 🎨 Custom cake order form with image upload
- 🖼️ Gallery with masonry layout and lightbox
- 📱 Fully responsive mobile-first design
- ⭐ Customer reviews and ratings
- 📞 Contact page with interactive form
- ❓ Comprehensive FAQ section
- ℹ️ About page with company history and team
- 📄 Legal pages (Terms, Privacy, Refund, Delivery policies)
- ✨ Unique UI elements (custom cursor, scroll animations, gradient designs)
- 🎯 Floating cart widget

### Admin Features
- 🔐 Secure authentication with JWT (separate admin system)
- 📊 Dashboard with analytics and insights
- 📝 Product management (CRUD operations)
- 🛒 Order management and tracking
- 💬 Custom order tracking
- ⭐ Review moderation
- 👥 User management
- ⚙️ Settings panel

### Design & UX Features
- 🎨 **Consistent Gradient Design** - Pink-to-purple gradients across all pages
- ✨ **Scroll Animations** - Elements fade in as you scroll with staggered delays
- 🎭 **Custom Cursor** - Pink gradient cursor with trailing follower effect
- 🎪 **Parallax Effects** - Smooth parallax scrolling on hero sections
- 🌊 **Animated Backgrounds** - Floating blobs and gradient overlays
- 💫 **3D Card Effects** - Hover transformations with scale and rotate
- 🎯 **Floating Cart** - Persistent cart preview in bottom-right corner
- 🌟 **Sparkle Icons** - Decorative sparkles on headings
- 🎬 **Page Transitions** - Smooth animations between sections
- 📱 **Mobile Optimized** - Full responsive design for all devices

## Tech Stack

### Frontend
- **Framework:** Next.js 14.0.4
- **UI Library:** React 18
- **Language:** TypeScript
- **Styling:** TailwindCSS with custom animations
- **Icons:** Lucide React
- **State Management:** React Context API (CartContext)
- **Image Optimization:** Next/Image
- **Payments:** Stripe (@stripe/stripe-js, @stripe/react-stripe-js)
- **Animations:** Custom CSS keyframes + Intersection Observer

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Authentication:** Dual JWT system (Customer + Admin) with bcrypt
- **Payments:** Stripe API for payment processing
- **Security:** Helmet, CORS, Rate Limiting
- **File Upload:** Multer + Cloudinary (optional)
- **Environment:** dotenv for configuration

## 🔐 Authentication System

TheCakeTime uses a **dual authentication system** with complete separation between customer and admin accounts:

- **Customer Authentication**: `/api/auth` - For regular customers (7-day tokens)
- **Admin Authentication**: `/api/admin/auth` - For administrators (8-hour tokens)

See [AUTHENTICATION.md](./AUTHENTICATION.md) for complete documentation.

### Key Security Features
- ✅ Separate JWT secrets for customers and admins
- ✅ Role-based access control
- ✅ No role leakage between systems
- ✅ Protected admin creation endpoint
- ✅ Different token expiry times for different user types

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   cd TheCakeTime/bakery-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/bakery
   
   # JWT Secrets (use different secrets for customer and admin)
   JWT_SECRET=your-customer-jwt-secret-key-here
   ADMIN_JWT_SECRET=your-admin-jwt-secret-key-here
   
   # Stripe Payment Gateway
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   
   # Cloudinary (optional - for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Frontend
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   
   **Security Note:** 
   - Use strong, unique secrets for JWT_SECRET and ADMIN_JWT_SECRET
   - Never commit `.env` file to version control
   - Use `.env.example` as a template (already included)

4. **Run the development servers**

   Terminal 1 - Backend:
   ```bash
   npm run server
   ```

   Terminal 2 - Frontend:
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
bakery-website/
├── pages/                    # Next.js pages (TypeScript)
│   ├── _app.tsx             # App wrapper with ErrorBoundary
│   ├── _document.tsx        # Document customization
│   ├── index.tsx            # Landing page with parallax & animations
│   ├── products/
│   │   ├── index.tsx        # Product listing with filters
│   │   └── [id].tsx         # Product detail page
│   ├── checkout.tsx         # Multi-step checkout with Stripe
│   ├── order-success.tsx    # Order confirmation page
│   ├── custom-order.tsx     # Custom cake order form
│   ├── gallery.tsx          # Gallery with lightbox
│   ├── about.tsx            # About page with team
│   ├── contact.tsx          # Contact form
│   ├── faq.tsx              # FAQ page
│   ├── terms.tsx            # Terms & Conditions
│   ├── privacy.tsx          # Privacy Policy
│   ├── refund-policy.tsx    # Refund Policy
│   ├── delivery-policy.tsx  # Delivery Policy
│   └── admin/               # Admin pages
│       ├── index.tsx        # Admin login
│       └── dashboard.tsx    # Admin dashboard
├── components/              # Reusable components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer with legal links
│   ├── UniqueEffects.tsx    # Custom hooks & FloatingCart
│   ├── ReviewSection.tsx    # Advanced review display
│   ├── Loading.tsx          # Loading states & skeletons
│   ├── ErrorBoundary.tsx    # Error handling
│   ├── CheckoutForm.tsx     # Stripe checkout form
│   └── ProductImage.tsx     # Optimized image component
├── contexts/                # React Context
│   └── CartContext.tsx      # Shopping cart state management
├── types/                   # TypeScript types
│   └── index.ts             # Shared type definitions
├── styles/                  # Global styles
│   └── globals.css          # TailwindCSS + custom animations
├── backend/                 # Express backend
│   ├── server.js            # Main server with Stripe webhook
│   ├── models/              # MongoDB models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── CustomOrder.js
│   │   └── Review.js
│   ├── routes/              # API routes
│   │   ├── auth.js          # Customer authentication
│   │   ├── adminAuth.js     # Admin authentication
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── payment.js       # Stripe payment endpoints
│   │   ├── customOrders.js
│   │   └── reviews.js
│   ├── middleware/          # Middleware
│   │   ├── auth.js          # Customer auth middleware
│   │   └── authNew.js       # Admin auth middleware
│   └── createAdmin.js       # Admin account creation script
├── public/                  # Static assets
│   └── images/              # Product images
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment template
├── .gitignore               # Git ignore file
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## API Endpoints

### Customer Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new customer
- `POST /api/auth/login` - Customer login (7-day token)
- `GET /api/auth/me` - Get current customer profile

### Admin Authentication (`/api/admin/auth`)
- `POST /api/admin/auth/register` - Register admin (protected)
- `POST /api/admin/auth/login` - Admin login (8-hour token)
- `GET /api/admin/auth/me` - Get current admin profile

### Payment (`/api/payment`)
- `POST /api/payment/create-payment-intent` - Create Stripe payment intent
- `POST /api/payment/webhook` - Stripe webhook for payment confirmation
- `GET /api/payment/config` - Get Stripe publishable key

### Products
- `GET /api/products` - Get all products (with filters, search, pagination)
- `GET /api/products/:id` - Get single product with reviews
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders (`/api/orders`)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/customer` - Get customer's orders (auth required)
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update order status (admin only)

### Custom Orders (`/api/custom-orders`)
- `POST /api/custom-orders` - Submit custom cake order
- `GET /api/custom-orders` - Get all custom orders (admin)
- `GET /api/custom-orders/:id` - Get single custom order
- `PATCH /api/custom-orders/:id` - Update order status (admin)

### Reviews (`/api/reviews`)
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Submit review (auth required)
- `PATCH /api/reviews/:id/approve` - Approve review (admin)
- `GET /api/reviews` - Get all reviews (admin)
- `DELETE /api/reviews/:id` - Delete review (admin)

## Features Implementation

### Shopping Cart & Checkout
- **Persistent Cart** - Cart state saved to localStorage
- **Multi-step Checkout** - Cart → Details → Payment
- **Stripe Integration** - Secure payment processing
- **Order Management** - Complete order tracking system
- **Real-time Updates** - Cart count and total display
- **Floating Cart Widget** - Always visible cart preview

### Product Filtering
Products can be filtered by:
- Category (birthday, wedding, anniversary, etc.)
- Flavor (chocolate, vanilla, red velvet, etc.)
- Weight (500g, 1kg, 2kg, etc.)
- Occasion (birthday, anniversary, celebration)
- Type (eggless, with egg)
- Search by name or description

### Sorting Options
- Most Popular
- Price: Low to High
- Price: High to Low
- Highest Rated
- Newest First

### Custom Orders
Custom order form includes:
- Customer contact details
- Cake specifications (type, flavor, weight, shape)
- Theme and message customization
- Reference image upload
- Delivery date and time selection
- Additional notes

### Admin Dashboard
- Overview with key metrics
- Recent orders tracking
- Popular products analytics
- Product management
- Order management
- Custom order tracking
- Review moderation
- User management

## Security Features

- **Dual JWT Authentication** - Separate systems for customers and admins
- **Password Hashing** - bcrypt with salt rounds
- **Protected Routes** - Middleware-based access control
- **Role-based Access** - Customer vs Admin permissions
- **Secure Payment** - Stripe PCI compliance
- **Environment Variables** - Sensitive data protection
- **Input Validation** - Mongoose schema validation
- **Rate Limiting** - API request throttling
- **CORS Protection** - Cross-origin resource sharing
- **Helmet Security** - HTTP headers protection
- **MongoDB Injection Prevention** - Query sanitization
- **Token Expiry** - Different expiry times (7 days customer, 8 hours admin)

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

### Backend (Render/Railway/AWS)
1. Create new web service
2. Connect repository
3. Set environment variables
4. Configure build command: `npm install`
5. Configure start command: `npm run server`
6. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Set up database user
3. Whitelist IP addresses
4. Get connection string
5. Update MONGODB_URI in environment variables

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for customer JWT tokens | Yes |
| ADMIN_JWT_SECRET | Secret key for admin JWT tokens | Yes |
| STRIPE_SECRET_KEY | Stripe secret API key | Yes |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe publishable key (public) | Yes |
| PORT | Backend server port | No (default: 5000) |
| NODE_ENV | Environment (development/production) | No |
| NEXT_PUBLIC_API_URL | Backend API URL | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Optional |
| CLOUDINARY_API_KEY | Cloudinary API key | Optional |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Optional |

## Available Scripts

- `npm run dev` - Start Next.js development server (http://localhost:3000)
- `npm run build` - Build Next.js for production
- `npm start` - Start Next.js production server
- `npm run server` - Start Express backend server (http://localhost:5000)
- `npm run lint` - Run ESLint
- `node backend/createAdmin.js` - Create admin account

## Quick Links to Documentation

- [Authentication Guide](./AUTHENTICATION.md) - Complete authentication system documentation
- [Stripe Payment Guide](./STRIPE_PAYMENT_GUIDE.md) - Payment integration setup
- [Unique UI Features](./UNIQUE_UI_FEATURES.md) - Custom animations and effects
- [API Testing Guide](./API_TESTING_GUIDE.md) - How to test the API endpoints
- [Quickstart Guide](./QUICKSTART.md) - Get started quickly

## Completed Features

- ✅ Shopping cart with persistent storage
- ✅ Stripe payment gateway integration
- ✅ Complete order management system
- ✅ Customer and admin authentication
- ✅ Unique UI with animations and effects
- ✅ Legal pages (Terms, Privacy, Refund, Delivery)
- ✅ Product filtering and search
- ✅ Custom cake order form
- ✅ Review and rating system
- ✅ Responsive mobile design

## Future Enhancements

- [ ] Email notifications for orders
- [ ] SMS alerts for delivery updates
- [ ] Order tracking for customers (real-time)
- [ ] Blog/Articles section
- [ ] Loyalty program with points
- [ ] Coupon and discount system
- [ ] Social media feed integration
- [ ] Live chat support
- [ ] Wishlist functionality
- [ ] Gift card system
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is private and proprietary.

## Support

For support, email info@thecaketime.com or call +91 123 456 7890.

## Credits

Built with ❤️ by TheCakeTime Team
