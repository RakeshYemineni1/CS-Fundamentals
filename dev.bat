@echo off
echo ========================================
echo    OOP Concepts Development Mode
echo ========================================
echo.

echo Installing dependencies if needed...
cd server
if not exist node_modules (
    echo Installing server dependencies...
    call npm install
)

cd ..\client
if not exist node_modules (
    echo Installing client dependencies...
    call npm install
)

echo.
echo Starting development servers...
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.

start "Backend Server" cmd /k "cd /d %~dp0server && npm run dev"
start "Frontend Server" cmd /k "cd /d %~dp0client && npm start"

echo Both servers are starting in separate windows...
echo Close this window when done developing.
pause