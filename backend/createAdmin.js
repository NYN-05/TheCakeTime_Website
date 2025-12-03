require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/User')

// Admin creation script
async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bakery')
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@thecaketime.com' })
    if (existingAdmin) {
      console.log('Admin user already exists!')
      console.log('Email:', existingAdmin.email)
      console.log('Role:', existingAdmin.role)
      await mongoose.connection.close()
      return
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = new User({
      name: 'Admin User',
      email: 'admin@thecaketime.com',
      password: hashedPassword,
      role: 'admin',
      phone: '1234567890'
    })

    await admin.save()
    console.log('✅ Admin user created successfully!')
    console.log('Email: admin@thecaketime.com')
    console.log('Password: admin123')
    console.log('Role: admin')
    console.log('\n⚠️  IMPORTANT: Change the password after first login!')

    await mongoose.connection.close()
  } catch (error) {
    console.error('Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()
