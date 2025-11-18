@echo off
echo ========================================
echo    OOP Concepts Application Launcher
echo ========================================
echo.

echo Installing dependencies...
echo.

echo [1/4] Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies!
    pause
    exit /b 1
)

echo [2/4] Installing client dependencies...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies!
    pause
    exit /b 1
)

echo [3/4] Building React application...
call npm run build
if %errorlevel% neq 0 (
    echo Error building React application!
    pause
    exit /b 1
)

echo [4/4] Starting the server...
cd ..\server
echo.
echo ========================================
echo   Application starting on port 5000
echo   Open: http://localhost:5000
echo ========================================
echo.
call npm start