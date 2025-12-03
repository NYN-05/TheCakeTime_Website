# Quick Start Guide - TheCakeTime Bakery Website

## Prerequisites
- Node.js 18 or higher
- MongoDB (local installation or MongoDB Atlas account)

## Installation Steps

### 1. Install Dependencies
```powershell
cd bakery-website
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
```powershell
# Download and install MongoDB Community Server from mongodb.com
# Start MongoDB service
net start MongoDB
```

**Option B: MongoDB Atlas (Recommended)**
1. Sign up at mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Get your connection string

### 3. Configure Environment Variables

Create a `.env` file in the bakery-website folder:

```env
MONGODB_URI=mongodb://localhost:27017/bakery
# Or use Atlas: mongodb+srv://username:password@cluster.mongodb.net/bakery

JWT_SECRET=change-this-to-a-random-secret-key
PORT=5000
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Start the Application

Open TWO PowerShell terminals:

**Terminal 1 - Start Backend Server:**
```powershell
cd bakery-website
npm run server
```

**Terminal 2 - Start Frontend:**
```powershell
cd bakery-website
npm run dev
```

### 5. Access the Website

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

### 6. Admin Login

Use these demo credentials to access the admin panel:
- Email: admin@thecaketime.com
- Password: admin123

(First register with these credentials)

## Testing the Website

1. **Browse Products**: Go to http://localhost:3000/products
2. **View Product Details**: Click any product
3. **Custom Order**: Visit http://localhost:3000/custom-order
4. **Gallery**: Check out http://localhost:3000/gallery
5. **Admin Dashboard**: Login at http://localhost:3000/admin

## Common Issues

### Port Already in Use
```powershell
# If port 3000 or 5000 is busy, kill the process:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### MongoDB Connection Error
- Make sure MongoDB service is running
- Check your connection string in .env
- Verify network access if using Atlas

### Module Not Found Errors
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## Next Steps

1. Customize the branding (colors, fonts, content)
2. Add your actual product images
3. Set up Cloudinary for image uploads
4. Configure email notifications
5. Set up production deployment

## Need Help?

Check the full README.md for detailed documentation or contact support.
