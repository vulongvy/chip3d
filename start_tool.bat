@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Chip English Adventure ^& 3D City Commute - Launcher

echo ====================================================================
echo   🏫 CHIP ENGLISH ADVENTURE ^& 3D CITY COMMUTE - 1-CLICK LAUNCHER
echo ====================================================================
echo.

:: 1. Tìm kiếm Python thực thi trên máy tính
set "PYTHON_CMD="

:: Ưu tiên 1: Thử Python Launcher chính thức của Windows 'py -3' (khắc phục lỗi Microsoft Store stub)
py -3 -c "import sys" >nul 2>&1
if !errorlevel! equ 0 (
    set "PYTHON_CMD=py -3"
    goto :python_found
)

:: Ưu tiên 2: Quét trực tiếp thư mục cài đặt Python trong AppData của người dùng
for /d %%D in ("%LOCALAPPDATA%\Programs\Python\Python3*") do (
    if exist "%%D\python.exe" (
        "%%D\python.exe" -c "import sys" >nul 2>&1
        if !errorlevel! equ 0 (
            set "PYTHON_CMD="%%D\python.exe""
            goto :python_found
        )
    )
)

:: Ưu tiên 3: Quét trong Program Files
for /d %%D in ("%ProgramFiles%\Python3*") do (
    if exist "%%D\python.exe" (
        "%%D\python.exe" -c "import sys" >nul 2>&1
        if !errorlevel! equ 0 (
            set "PYTHON_CMD="%%D\python.exe""
            goto :python_found
        )
    )
)
for /d %%D in ("C:\Python3*") do (
    if exist "%%D\python.exe" (
        "%%D\python.exe" -c "import sys" >nul 2>&1
        if !errorlevel! equ 0 (
            set "PYTHON_CMD="%%D\python.exe""
            goto :python_found
        )
    )
)

:: Ưu tiên 4: Thử lệnh 'python' trong PATH (chỉ nhận nếu thực sự chạy được python)
python -c "import sys" >nul 2>&1
if !errorlevel! equ 0 (
    set "PYTHON_CMD=python"
    goto :python_found
)

:: Ưu tiên 5: Thử lệnh 'python3' trong PATH
python3 -c "import sys" >nul 2>&1
if !errorlevel! equ 0 (
    set "PYTHON_CMD=python3"
    goto :python_found
)

:: 2. Không tìm thấy Python - Hướng dẫn tự động cài đặt
echo [CẢNH BÁO] Không tìm thấy Python trên máy tính của bạn!
echo.
echo Bạn cần cài đặt Python 3.10 trở lên để chạy máy chủ nội bộ.
echo Bạn có muốn tự động cài đặt Python qua công cụ Windows winget không?
echo.
set /p AUTO_INSTALL="👉 Nhập Y để cài đặt Python tự động (hoặc N để tự tải từ python.org): "
if /i "!AUTO_INSTALL!"=="Y" (
    echo.
    echo Đang gọi winget để cài đặt Python 3.12...
    winget install Python.Python.3.12 --source winget
    echo.
    echo Sau khi cài đặt hoàn tất, vui lòng đóng cửa sổ này và chạy lại start_tool.bat!
    pause
    exit /b 0
) else (
    echo.
    echo Đang mở trang tải Python chính thức trên trình duyệt...
    start https://www.python.org/downloads/
    echo Vui lòng tải bản Python cho Windows, nhớ tích chọn:
    echo   [x] Add python.exe to PATH khi cài đặt!
    pause
    exit /b 1
)

:python_found
echo [OK] Đã tìm thấy Python: !PYTHON_CMD!
echo.
echo Đang kiểm tra môi trường và khởi chạy bảng điều khiển start_tool.py...
echo.

cd /d "%~dp0"
!PYTHON_CMD! start_tool.py %*

if !errorlevel! neq 0 (
    echo.
    echo [THÔNG BÁO] Công cụ đã dừng hoặc gặp lỗi (Mã lỗi: !errorlevel!).
    pause
)
