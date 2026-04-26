Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AutoCare - Complete Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Backend setup
Write-Host "Step 1: Setting up backend..." -ForegroundColor Yellow
Set-Location backend

if (Test-Path "database.sqlite") {
    Remove-Item "database.sqlite" -Force
    Write-Host "✓ Old database deleted" -ForegroundColor Green
}

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
npm install | Out-Null
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

Write-Host "Creating database tables..." -ForegroundColor Yellow
$serverProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; node server.js" -PassThru
Start-Sleep -Seconds 8
Stop-Process -Id $serverProcess.Id -Force
Write-Host "✓ Database tables created" -ForegroundColor Green

Write-Host "Seeding 55 services..." -ForegroundColor Yellow
node seed.js
Write-Host "✓ Services seeded" -ForegroundColor Green

if (Test-Path "adminSeed.js") {
    node adminSeed.js
    Write-Host "✓ Admin user created" -ForegroundColor Green
}

Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; node server.js"
Start-Sleep -Seconds 3

Set-Location ..

# Step 2: Frontend setup
Write-Host ""
Write-Host "Step 2: Setting up frontend..." -ForegroundColor Yellow
Set-Location frontend

Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install | Out-Null
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

Write-Host "Starting frontend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening browser in 5 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Start-Process "http://localhost:5173"
