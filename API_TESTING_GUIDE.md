# API Endpoint Testing Guide

## Server Status
✅ Backend server running on: http://localhost:5000

## Quick API Tests

### 1. Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
```

### 2. Test Products Endpoint
```powershell
# Get all products
Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method GET

# Get single product
Invoke-RestMethod -Uri "http://localhost:5000/api/products/PRODUCT_ID" -Method GET
```

### 3. Test Payment Endpoint
```powershell
# Create payment intent
$paymentData = @{
    amount = 1000
    currency = "inr"
    orderData = @{
        customer = @{
            name = "Test User"
            email = "test@example.com"
            phone = "1234567890"
        }
        items = @(
            @{
                product = "test-product-id"
                name = "Test Cake"
                price = 1000
                quantity = 1
                weight = "1kg"
            }
        )
        delivery = @{
            address = "Test Address"
            city = "Test City"
            pincode = "123456"
            date = "2025-12-10"
            time = "14:00"
        }
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5000/api/payment/create-payment-intent" `
    -Method POST `
    -ContentType "application/json" `
    -Body $paymentData
```

### 4. Test Customer Authentication
```powershell
# Register new customer
$registerData = @{
    name = "Test Customer"
    email = "customer@test.com"
    password = "TestPass123"
    phone = "9876543210"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $registerData

# Login
$loginData = @{
    email = "customer@test.com"
    password = "TestPass123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $loginData

# Save token for authenticated requests
$token = $loginResponse.token
```

### 5. Test Orders Endpoint (with authentication)
```powershell
# Get all orders (requires authentication)
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/orders" `
    -Method GET `
    -Headers $headers

# Create order
$orderData = @{
    customer = @{
        name = "Test Customer"
        email = "customer@test.com"
        phone = "9876543210"
    }
    items = @(
        @{
            product = "product-id-here"
            name = "Chocolate Cake"
            price = 899
            quantity = 1
            weight = "1kg"
        }
    )
    delivery = @{
        address = "123 Test Street"
        city = "Mumbai"
        pincode = "400001"
        date = "2025-12-10"
        time = "15:00"
    }
    payment = @{
        method = "card"
        status = "paid"
        amount = 899
        currency = "INR"
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5000/api/orders" `
    -Method POST `
    -ContentType "application/json" `
    -Headers $headers `
    -Body $orderData
```

### 6. Test Reviews Endpoint
```powershell
# Get reviews for a product
Invoke-RestMethod -Uri "http://localhost:5000/api/reviews/product/PRODUCT_ID" -Method GET

# Create review (requires authentication)
$reviewData = @{
    product = "product-id-here"
    rating = 5
    comment = "Delicious cake!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/reviews" `
    -Method POST `
    -ContentType "application/json" `
    -Headers $headers `
    -Body $reviewData
```

### 7. Test Custom Orders
```powershell
# Create custom order inquiry
$customOrderData = @{
    customer = @{
        name = "Test Customer"
        email = "customer@test.com"
        phone = "9876543210"
    }
    cakeDetails = @{
        type = "Birthday Cake"
        flavor = "Chocolate"
        weight = "2kg"
        layers = 2
        shape = "Round"
        message = "Happy Birthday"
        specialInstructions = "Add extra chocolate ganache"
    }
    designPreferences = @{
        theme = "Superhero"
        colors = @("Blue", "Red")
    }
    delivery = @{
        address = "123 Test Street"
        city = "Mumbai"
        pincode = "400001"
        date = "2025-12-15"
        time = "18:00"
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:5000/api/custom-orders" `
    -Method POST `
    -ContentType "application/json" `
    -Body $customOrderData
```

## Test Stripe Payment Flow (End-to-End)

### Using Stripe Test Cards:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

### Steps:
1. Start backend server (already running)
2. Start frontend: `npm run dev` in the main directory
3. Visit: http://localhost:3000/products
4. Add item to cart
5. Go to checkout: http://localhost:3000/checkout
6. Fill in details and use test card
7. Complete payment
8. Verify order created in database

## MongoDB Verification

```powershell
# If you have MongoDB Compass or mongosh installed:
mongosh "mongodb://localhost:27017/bakery"

# Then run these queries:
db.orders.find().pretty()
db.users.find().pretty()
db.products.find().pretty()
db.reviews.find().pretty()
```

## Common Test Scenarios

### Scenario 1: Complete Purchase Flow
1. Register customer → Login → Browse products → Add to cart → Checkout → Pay → Verify order

### Scenario 2: Custom Order Flow
1. Submit custom order inquiry → Admin logs in → Admin sends quotation → Customer approves

### Scenario 3: Review Flow
1. Customer places order → Order delivered → Customer logs in → Submits review → Admin approves

## Expected Results

✅ All endpoints should return proper JSON responses  
✅ Authentication should work for customer and admin  
✅ Payment intent creation should return clientSecret  
✅ Orders should be created after payment verification  
✅ All database models should save correctly  

## Troubleshooting

If you encounter errors:

1. **Port already in use**: Stop existing Node process or change PORT in .env
2. **MongoDB connection error**: Ensure MongoDB is running: `mongod`
3. **Stripe error**: Verify STRIPE_SECRET_KEY in .env is set
4. **CORS error**: Check FRONTEND_URL matches your frontend port
5. **Authentication error**: Ensure JWT_SECRET is set in .env

## Production Checklist

Before deploying:

- [ ] Change all secret keys in .env
- [ ] Use production Stripe keys
- [ ] Set up proper MongoDB Atlas cluster
- [ ] Configure proper CORS origins
- [ ] Set up Stripe webhooks
- [ ] Add proper error logging
- [ ] Set up SSL/HTTPS
- [ ] Configure rate limiting appropriately
- [ ] Set up environment-specific configs
- [ ] Test all flows with real data
