#!/bin/bash

echo "========================================"
echo "   OOP Concepts Application Launcher"
echo "========================================"
echo

echo "Installing dependencies..."
echo

echo "[1/4] Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "Error installing server dependencies!"
    exit 1
fi

echo "[2/4] Installing client dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "Error installing client dependencies!"
    exit 1
fi

echo "[3/4] Building React application..."
npm run build
if [ $? -ne 0 ]; then
    echo "Error building React application!"
    exit 1
fi

echo "[4/4] Starting the server..."
cd ../server
echo
echo "========================================"
echo "  Application starting on port 5000"
echo "  Open: http://localhost:5000"
echo "========================================"
echo
npm start