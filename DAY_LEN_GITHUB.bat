@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Đẩy Code Lên GitHub Tự Động Build .IPA - Chip 3D

echo ====================================================================
echo   🚀 ĐẨY MÃ NGUỒN LÊN GITHUB ĐỂ BUILD FILE .IPA TỰ ĐỘNG
echo ====================================================================
echo.
echo Đang đẩy mã nguồn lên https://github.com/vulongvy/chip3d.git...
echo.

".\tools\git\cmd\git.exe" push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ====================================================================
    echo   🎉 ĐÃ ĐẨY LÊN GITHUB THÀNH CÔNG!
    echo   🌐 GitHub Actions đang tự động biên dịch file .ipa...
    echo   👉 Đang mở trang theo dõi tiến trình build trên trình duyệt:
    echo      https://github.com/vulongvy/chip3d/actions
    echo ====================================================================
    start https://github.com/vulongvy/chip3d/actions
) else (
    echo.
    echo [LỖI] Chưa đẩy được lên GitHub.
    echo Bạn nhớ bấm nút màu xanh "Create repository" trên trình duyệt trước nhé!
)

pause
