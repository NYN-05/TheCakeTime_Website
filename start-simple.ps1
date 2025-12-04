# TheCakeTime - Simple Start Script
# Runs both frontend and backend using Start-Process

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "🎂 Starting TheCakeTime Bakery..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend in new PowerShell window
Write-Host "🔧 Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; npm run server"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 2

# Start Frontend in new PowerShell window
Write-Host "⚛️  Starting Frontend (Port 3000)..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting in separate windows!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "📍 Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Close the individual PowerShell windows to stop the servers." -ForegroundColor Red
