# TheCakeTime Bakery Website

A complete, production-ready bakery website built with Next.js, React, Express, and MongoDB.

## Features

### Customer-Facing Features
- 🏠 Beautiful landing page with hero section and featured products
- 🎂 Product catalog with advanced filtering and sorting
- 🔍 Search functionality with real-time results
- 📦 Individual product detail pages with reviews
- 🎨 Custom cake order form with image upload
- 🖼️ Gallery with masonry layout and lightbox
- 📱 Fully responsive mobile-first design
- ⭐ Customer reviews and ratings
- 📞 Contact page with map integration
- ❓ Comprehensive FAQ section
- ℹ️ About page with company history and team

### Admin Features
- 🔐 Secure authentication with JWT
- 📊 Dashboard with analytics and insights
- 📝 Product management (CRUD operations)
- 🛒 Order management
- 💬 Custom order tracking
- ⭐ Review moderation
- 👥 User management
- ⚙️ Settings panel

## Tech Stack

### Frontend
- **Framework:** Next.js 14
- **UI Library:** React 18
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **State Management:** React Query
- **Image Optimization:** Next/Image

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **Security:** Helmet, CORS, Rate Limiting
- **File Upload:** Multer + Cloudinary

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
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   
   # Cloudinary (optional)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Frontend
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

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
├── pages/                  # Next.js pages
│   ├── index.tsx          # Landing page
│   ├── products/          # Product pages
│   ├── custom-order.tsx   # Custom order form
│   ├── gallery.tsx        # Gallery page
│   ├── about.tsx          # About page
│   ├── contact.tsx        # Contact page
│   ├── faq.tsx           # FAQ page
│   └── admin/            # Admin pages
├── components/            # Reusable components
│   ├── Header.tsx
│   └── Footer.tsx
├── styles/               # Global styles
│   └── globals.css
├── backend/              # Express backend
│   ├── server.js         # Main server file
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── middleware/       # Auth middleware
├── public/               # Static assets
└── package.json          # Dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Custom Orders
- `POST /api/custom-orders` - Submit custom order
- `GET /api/custom-orders` - Get all orders (admin)
- `GET /api/custom-orders/:id` - Get single order
- `PATCH /api/custom-orders/:id` - Update order status (admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Submit review
- `PATCH /api/reviews/:id/approve` - Approve review (admin)
- `GET /api/reviews` - Get all reviews (admin)
- `DELETE /api/reviews/:id` - Delete review (admin)

## Features Implementation

### Product Filtering
Products can be filtered by:
- Category (birthday, wedding, anniversary, etc.)
- Flavor (chocolate, vanilla, red velvet, etc.)
- Weight (500g, 1kg, 2kg, etc.)
- Occasion (birthday, anniversary, celebration)
- Type (eggless, with egg)

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

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Role-based access control
- Input validation
- Rate limiting
- CORS protection
- Helmet security headers
- MongoDB injection prevention

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
| JWT_SECRET | Secret key for JWT tokens | Yes |
| PORT | Backend server port | No (default: 5000) |
| NODE_ENV | Environment (development/production) | No |
| NEXT_PUBLIC_API_URL | Backend API URL | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Optional |
| CLOUDINARY_API_KEY | Cloudinary API key | Optional |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Optional |

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js for production
- `npm start` - Start Next.js production server
- `npm run server` - Start Express backend server
- `npm run lint` - Run ESLint

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] Payment gateway integration
- [ ] Order tracking for customers
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Blog/Articles section
- [ ] Loyalty program
- [ ] Coupon system
- [ ] Social media integration
- [ ] Live chat support
- [ ] Mobile app

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
