# TheCakeTime - Start Frontend & Backend
# This script runs both the Next.js frontend and Express backend concurrently

Write-Host ""
Write-Host "  🎂 TheCakeTime Bakery - Development Server" -ForegroundColor Magenta
Write-Host "  ===========================================" -ForegroundColor Magenta
Write-Host ""

# Change to the bakery-website directory
Set-Location $PSScriptRoot

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Function to start the backend
$backendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    # Run the backend server directly
    node backend/server.js 2>&1
} -ArgumentList $PSScriptRoot

# Give backend a moment to start
Start-Sleep -Seconds 2

# Function to start the frontend
$frontendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    # Run the Next.js dev server
    npx next dev -H 0.0.0.0 2>&1
} -ArgumentList $PSScriptRoot

Write-Host "  🔧 Backend API:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "  ⚛️  Frontend:     http://localhost:3000" -ForegroundColor Green
Write-Host "  💾 Health Check: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Press Ctrl+C to stop both servers" -ForegroundColor Red
Write-Host ""
Write-Host "  ─────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# Monitor both jobs and display output
try {
    while ($true) {
        # Get output from both jobs
        $backendOutput = Receive-Job -Job $backendJob -ErrorAction SilentlyContinue
        $frontendOutput = Receive-Job -Job $frontendJob -ErrorAction SilentlyContinue
        
        if ($backendOutput) {
            foreach ($line in $backendOutput) {
                Write-Host "[BACKEND]  " -ForegroundColor Yellow -NoNewline
                Write-Host $line
            }
        }
        
        if ($frontendOutput) {
            foreach ($line in $frontendOutput) {
                Write-Host "[FRONTEND] " -ForegroundColor Green -NoNewline
                Write-Host $line
            }
        }
        
        # Check if jobs are still running
        if ($backendJob.State -eq 'Failed') {
            Write-Host "❌ Backend server failed to start!" -ForegroundColor Red
            $backendError = Receive-Job -Job $backendJob -ErrorAction SilentlyContinue
            Write-Host $backendError -ForegroundColor Red
        }
        
        if ($frontendJob.State -eq 'Failed') {
            Write-Host "❌ Frontend server failed to start!" -ForegroundColor Red
            $frontendError = Receive-Job -Job $frontendJob -ErrorAction SilentlyContinue
            Write-Host $frontendError -ForegroundColor Red
        }
        
        Start-Sleep -Milliseconds 200
    }
}
finally {
    # Cleanup: Stop both jobs when script is interrupted
    Write-Host ""
    Write-Host "🛑 Stopping servers..." -ForegroundColor Red
    Stop-Job -Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
    Remove-Job -Job $backendJob, $frontendJob -Force -ErrorAction SilentlyContinue
    
    # Also kill any orphaned node processes for this project
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
        $_.Path -like "*TheCakeTime*"
    } | Stop-Process -Force -ErrorAction SilentlyContinue
    
    Write-Host "✅ All servers stopped." -ForegroundColor Green
}
