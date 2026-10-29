@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Tạo Project Mới Siêu Tốc - Chip English Adventure

echo ====================================================================
echo   ✨ CÔNG CỤ TẠO PROJECT MỚI SIÊU TỐC TỪ CHIP 3D ADVENTURE
echo ====================================================================
echo.
echo Công cụ này sẽ tự động nhân bản bộ mã nguồn sạch (~39MB) thành
echo một project mới hoàn toàn độc lập, loại bỏ toàn bộ dữ liệu nặng (>1GB).
echo.

set "DEFAULT_NAME=chip_project_moi"
set /p NEW_NAME="👉 Nhập tên thư mục Project mới muốn tạo (Mặc định: %DEFAULT_NAME%): "
if not defined NEW_NAME set "NEW_NAME=%DEFAULT_NAME%"

set "SRC_DIR=%~dp0"
set "DEST_DIR=%SRC_DIR%..\%NEW_NAME%"

echo.
echo Đang tạo thư mục mới tại:
echo   %DEST_DIR%
echo.

if exist "%DEST_DIR%" (
    echo [CẢNH BÁO] Thư mục "%NEW_NAME%" đã tồn tại!
    set /p OVERWRITE="Bạn có muốn tiếp tục sao chép đè vào thư mục này không? [Y/N]: "
    if /i not "!OVERWRITE!"=="Y" (
        echo Đã hủy thao tác.
        pause
        exit /b 0
    )
) else (
    mkdir "%DEST_DIR%"
)

echo Đang sao chép các tệp mã nguồn sạch (bỏ qua streetview_hd, audio, git)...
robocopy "%SRC_DIR%\" "%DEST_DIR%\" /E /XD streetview_hd audio .git __pycache__ dist .gemini .system_generated /XF sample_map.png test_2k.jpg *.pyc *.log *.tmp /NFL /NDL /NJH /NJS /nc /ns /np

echo.
echo ====================================================================
echo   🎉 ĐÃ TẠO PROJECT MỚI THÀNH CÔNG!
echo ====================================================================
echo   📍 Đường dẫn: %DEST_DIR%
echo   👉 Bạn chỉ cần vào thư mục này và nhấp đúp: start_tool.bat
echo   📖 Xem tài liệu: LICH_TRINH_CHINH_SUA_VA_IMPLEMENTATION_PLAN.md
echo ====================================================================
echo.

set /p OPEN_NOW="👉 Bạn có muốn mở thư mục project mới ngay bây giờ không? [Y/N]: "
if /i "!OPEN_NOW!"=="Y" (
    explorer "%DEST_DIR%"
)

pause
