# 🍰 TheCakeTime Bakery Website [https://the-cake-time-website.vercel.app/]

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38B2AC)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0.3-green)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-20.0.0-635BFF)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-Private-red)](#license)

> A complete, production-ready bakery e-commerce website built with modern web technologies. Features beautiful UI, secure payments, and comprehensive admin dashboard.

![TheCakeTime Banner](https://img.shields.io/badge/TheCakeTime-Bakery-orange?style=for-the-badge&logo=cake&logoColor=white)

## ✨ Features

### 🛒 Customer-Facing Features
- **🏠 Landing Page** - Stunning parallax effects with animated hero section
- **🎂 Product Catalog** - Advanced filtering, sorting, and search functionality
- **📦 Product Details** - Individual pages with reviews and ratings
- **🛒 Shopping Cart** - Persistent cart with localStorage integration
- **💳 Secure Payments** - Stripe integration for seamless checkout
- **🎨 Custom Orders** - Interactive form with image upload capabilities
- **🖼️ Gallery** - Masonry layout with lightbox functionality
- **📱 Mobile-First** - Fully responsive design for all devices
- **⭐ Reviews System** - Customer ratings and feedback
- **📞 Contact Forms** - Interactive communication channels
- **❓ FAQ Section** - Comprehensive help and support
- **ℹ️ Company Pages** - About, terms, privacy, and policies
- **✨ Unique UX** - Custom cursor, scroll animations, gradient designs
- **🎯 Floating Cart** - Persistent cart preview widget

### 🔧 Admin Features
- **🔐 Secure Authentication** - Dual JWT system for customers and admins
- **📊 Analytics Dashboard** - Insights and key metrics
- **📝 Product Management** - Full CRUD operations
- **🛒 Order Management** - Complete order lifecycle tracking
- **💬 Custom Order Handling** - Specialized order processing
- **⭐ Review Moderation** - Content management system
- **👥 User Management** - Customer and admin account control
- **⚙️ Settings Panel** - Configuration and preferences

### 🎨 Design & UX Highlights
- **🌈 Gradient Design** - Consistent pink-to-purple theme
- **📜 Scroll Animations** - Smooth fade-in effects with delays
- **🖱️ Custom Cursor** - Interactive cursor with trailing effects
- **🎪 Parallax Effects** - Dynamic background movements
- **🌊 Animated Backgrounds** - Floating elements and overlays
- **💫 3D Card Effects** - Hover transformations and rotations
- **🎯 Floating Widgets** - Persistent UI elements
- **✨ Decorative Elements** - Sparkles and visual enhancements
- **🎬 Page Transitions** - Smooth section animations
- **📱 Mobile Optimized** - Perfect on all screen sizes

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js) | 14.0.4 | React Framework |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react) | 18.2.0 | UI Library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript) | 5.0+ | Type Safety |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css) | 3.3.6 | Styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer) | 12.23.25 | Animations |

### Backend & Database
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js) | 18+ | Runtime |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express) | 4.18.2 | Web Framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb) | 8.0.3 | Database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose) | 8.0.3 | ODM |

### Payments & Security
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat&logo=stripe) | 20.0.0 | Payment Processing |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens) | 9.0.2 | Authentication |
| ![bcrypt](https://img.shields.io/badge/bcrypt-000000?style=flat&logo=lock) | 2.4.3 | Password Hashing |

## 🔐 Authentication System

TheCakeTime implements a **dual authentication system** with complete separation:

### Customer Authentication (`/api/auth`)
- 7-day JWT tokens for regular users
- Registration and login endpoints
- Profile management

### Admin Authentication (`/api/admin/auth`)
- 8-hour JWT tokens for administrators
- Separate secret keys and endpoints
- Role-based access control

> 📖 **Detailed Documentation**: See [AUTHENTICATION.md](./AUTHENTICATION.md)

## 📋 Prerequisites

- **Node.js** 18+ installed
- **MongoDB** instance (local or Atlas)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/NYN-05/TheCakeTime_Website.git
cd TheCakeTime_Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/thecaketime

# JWT Secrets (use strong, unique secrets)
JWT_SECRET=your-customer-jwt-secret-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> ⚠️ **Security Note**: Never commit `.env` files to version control!

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
TheCakeTime_Website/
├── 📄 pages/                    # Next.js pages (TypeScript)
│   ├── _app.tsx                # App wrapper with providers
│   ├── _document.tsx           # Document customization
│   ├── index.tsx               # Landing page
│   ├── products/               # Product pages
│   ├── checkout.tsx            # Payment flow
│   ├── admin/                  # Admin dashboard
│   └── [other pages]           # Static pages
├── 🧩 components/              # Reusable components
│   ├── Header.tsx              # Navigation
│   ├── Footer.tsx              # Site footer
│   ├── CheckoutForm.tsx        # Stripe integration
│   └── [UI components]         # Custom components
├── 🔄 contexts/                # React Context
│   └── CartContext.tsx         # Shopping cart state
├── 📝 types/                   # TypeScript definitions
├── 🎨 styles/                  # Global styles
├── ⚙️ backend/                 # Express server
│   ├── server.js               # Main server file
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Auth & security
│   └── utils/                  # Helper functions
├── 🖼️ public/                  # Static assets
└── 📦 package.json             # Dependencies
```

## 🔗 API Endpoints

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Customer registration |
| `/api/auth/login` | POST | Customer login |
| `/api/auth/me` | GET | Get customer profile |
| `/api/admin/auth/login` | POST | Admin login |
| `/api/admin/auth/me` | GET | Get admin profile |

### Products & Orders
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET/POST | Get products / Create product |
| `/api/products/:id` | GET/PUT/DELETE | Product CRUD |
| `/api/orders` | POST | Create order |
| `/api/orders/customer` | GET | Get customer orders |
| `/api/payment/create-payment-intent` | POST | Stripe payment |

### Admin Operations
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/orders` | GET | Get all orders |
| `/api/custom-orders` | GET | Get custom orders |
| `/api/reviews` | GET | Get all reviews |

## 🎯 Key Features Implementation

### 🛒 Shopping Cart System
- **Persistent Storage** - Cart survives browser sessions
- **Real-time Updates** - Live cart count and totals
- **Floating Widget** - Always-visible cart preview
- **Multi-step Checkout** - Cart → Details → Payment flow

### 💳 Payment Integration
- **Stripe Elements** - Secure payment forms
- **Webhook Handling** - Automatic payment confirmation
- **Order Tracking** - Complete transaction lifecycle
- **Error Handling** - Comprehensive payment error management

### 🔍 Advanced Filtering
Products can be filtered by:
- 🎂 **Category**: Birthday, Wedding, Anniversary
- 🍫 **Flavor**: Chocolate, Vanilla, Red Velvet
- ⚖️ **Weight**: 500g, 1kg, 2kg
- 🎉 **Occasion**: Birthday, Anniversary, Celebration
- 🥚 **Type**: Eggless, With Egg

### 📊 Admin Dashboard
- **📈 Analytics** - Key metrics and insights
- **📦 Order Management** - Complete order lifecycle
- **🎨 Product CRUD** - Full product management
- **⭐ Review Moderation** - Content approval system
- **👥 User Management** - Customer account control

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
vercel --prod
```

### Backend (Railway/Render)
```bash
# Build command
npm install

# Start command
npm run server
```

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Set up database user and IP whitelist
3. Update `MONGODB_URI` in environment variables

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run server` | Start Express backend |
| `npm run lint` | Run ESLint |
| `npm run perf` | Performance testing |

## 🔒 Security Features

- ✅ **Dual JWT System** - Separate customer/admin authentication
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **Protected Routes** - Middleware-based access control
- ✅ **Role-based Access** - Customer vs Admin permissions
- ✅ **Secure Payments** - Stripe PCI compliance
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Input Validation** - Schema-based validation
- ✅ **Rate Limiting** - API request throttling
- ✅ **CORS Protection** - Cross-origin security
- ✅ **Helmet Security** - HTTP headers protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is **private and proprietary**. All rights reserved.

## 📞 Support

- **Email**: info@thecaketime.com
- **Phone**: +91 123 456 7890
- **Website**: [TheCakeTime](https://thecaketime.com)

## 🙏 Credits

Built with ❤️ by the **TheCakeTime Team**

---

<div align="center">

**🍰 Made with love for cake lovers everywhere! 🍰**

[![GitHub](https://img.shields.io/badge/GitHub-NYN--05-181717?style=for-the-badge&logo=github)](https://github.com/NYN-05)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-TheCakeTime-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/company/thecaketime)

</div>
