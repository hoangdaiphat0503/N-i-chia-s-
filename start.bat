@echo off
echo 🚀 Khởi động Landing Page với Mock Supabase Server
echo.

echo 📦 Cài đặt dependencies...
call npm install

echo.
echo 🔥 Khởi động Mock Supabase Server...
start "Mock Supabase Server" cmd /k "npm start"

echo.
echo ⏳ Đợi server khởi động (3 giây)...
timeout /t 3 /nobreak >nul

echo.
echo 🌐 Mở trang web...
start http://localhost:8080/index.html

echo.
echo 📊 Mở admin panel...
start http://localhost:8080/admin.html

echo.
echo ✅ Hoàn thành! Server đang chạy tại http://localhost:3001
echo    Web: http://localhost:8080/index.html
echo    Admin: http://localhost:8080/admin.html
echo.
pause
