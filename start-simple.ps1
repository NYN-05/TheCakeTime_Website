# TheCakeTime - Simple Start Script
# Runs both frontend and backend in separate terminal windows

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "  🎂 TheCakeTime Bakery - Starting Servers" -ForegroundColor Magenta
Write-Host "  =========================================" -ForegroundColor Magenta
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "$scriptPath\node_modules")) {
    Write-Host "  📦 Installing dependencies first..." -ForegroundColor Yellow
    Set-Location $scriptPath
    npm install
    Write-Host ""
}

# Start Backend in new PowerShell window
Write-Host "  🔧 Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "
    `$Host.UI.RawUI.WindowTitle = '🔧 TheCakeTime Backend - Port 5000'
    Write-Host '🔧 TheCakeTime Backend Server' -ForegroundColor Yellow
    Write-Host '=============================' -ForegroundColor Yellow
    Write-Host ''
    cd '$scriptPath'
    node backend/server.js
"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start Frontend in new PowerShell window
Write-Host "  ⚛️  Starting Frontend (Port 3000)..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "
    `$Host.UI.RawUI.WindowTitle = '⚛️ TheCakeTime Frontend - Port 3000'
    Write-Host '⚛️  TheCakeTime Frontend (Next.js)' -ForegroundColor Green
    Write-Host '==================================' -ForegroundColor Green
    Write-Host ''
    cd '$scriptPath'
    npm run dev
"

Write-Host ""
Write-Host "  ✅ Both servers are starting in separate windows!" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ─────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  📍 Frontend:     http://localhost:3000" -ForegroundColor Green
Write-Host "  📍 Backend API:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "  📍 Health Check: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ─────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  API Endpoints Available:" -ForegroundColor White
Write-Host "    • GET  /api/health        - Server health status" -ForegroundColor DarkGray
Write-Host "    • GET  /api/products      - List all products" -ForegroundColor DarkGray
Write-Host "    • GET  /api/orders        - List orders" -ForegroundColor DarkGray
Write-Host "    • POST /api/auth/login    - Customer login" -ForegroundColor DarkGray
Write-Host "    • GET  /api/search?q=...  - Search products" -ForegroundColor DarkGray
Write-Host "    • GET  /api/admin/stats   - Admin dashboard" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Close the PowerShell windows to stop the servers." -ForegroundColor Red
Write-Host ""
