# TheCakeTime - Start Frontend & Backend
# This script runs both the Next.js frontend and Express backend concurrently

Write-Host "🎂 Starting TheCakeTime Bakery..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Change to the bakery-website directory
Set-Location $PSScriptRoot

# Function to start the backend
$backendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    Write-Host "🔧 Starting Backend Server..." -ForegroundColor Yellow
    npm run server
} -ArgumentList $PSScriptRoot

# Function to start the frontend
$frontendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    Write-Host "⚛️  Starting Frontend (Next.js)..." -ForegroundColor Green
    npm run dev
} -ArgumentList $PSScriptRoot

Write-Host "✅ Backend server starting on port 5000..." -ForegroundColor Yellow
Write-Host "✅ Frontend starting on http://localhost:3000..." -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Red
Write-Host ""

# Monitor both jobs and display output
try {
    while ($true) {
        # Get output from both jobs
        $backendOutput = Receive-Job -Job $backendJob -ErrorAction SilentlyContinue
        $frontendOutput = Receive-Job -Job $frontendJob -ErrorAction SilentlyContinue
        
        if ($backendOutput) {
            Write-Host "[BACKEND] " -ForegroundColor Yellow -NoNewline
            Write-Host $backendOutput
        }
        
        if ($frontendOutput) {
            Write-Host "[FRONTEND] " -ForegroundColor Green -NoNewline
            Write-Host $frontendOutput
        }
        
        # Check if jobs are still running
        if ($backendJob.State -eq 'Failed' -or $frontendJob.State -eq 'Failed') {
            Write-Host "❌ One of the servers failed to start. Check the logs above." -ForegroundColor Red
            break
        }
        
        Start-Sleep -Milliseconds 100
    }
}
finally {
    # Cleanup: Stop both jobs when script is interrupted
    Write-Host ""
    Write-Host "🛑 Stopping servers..." -ForegroundColor Red
    Stop-Job -Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
    Remove-Job -Job $backendJob, $frontendJob -Force -ErrorAction SilentlyContinue
    Write-Host "✅ All servers stopped." -ForegroundColor Green
}
