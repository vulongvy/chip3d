@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Cập Nhật Voice Audio - Chip English Adventure

echo ====================================================================
echo   🎙️ CẬP NHẬT VOICE CHO CHIP ENGLISH ADVENTURE
echo ====================================================================
echo.

:: 1. Tìm Python thực thi
set "PY_EXE="

:: Thử Python Launcher 'py -3' trước
py -3 -c "import sys" >nul 2>&1
if !errorlevel! equ 0 set "PY_EXE=py -3"

:: Quét các thư mục cài đặt Python cục bộ
if not defined PY_EXE (
    for /d %%D in ("%LOCALAPPDATA%\Programs\Python\Python3*") do (
        if exist "%%D\python.exe" (
            "%%D\python.exe" -c "import sys" >nul 2>&1
            if !errorlevel! equ 0 set "PY_EXE="%%D\python.exe""
        )
    )
)

if not defined PY_EXE (
    for /d %%D in ("%ProgramFiles%\Python3*") do (
        if exist "%%D\python.exe" (
            "%%D\python.exe" -c "import sys" >nul 2>&1
            if !errorlevel! equ 0 set "PY_EXE="%%D\python.exe""
        )
    )
)

if not defined PY_EXE (
    python -c "import sys" >nul 2>&1
    if !errorlevel! equ 0 set "PY_EXE=python"
)

if not defined PY_EXE (
    echo [LỖI] Không tìm thấy Python trên máy tính này!
    echo Vui lòng chạy file start_tool.bat trước để kiểm tra môi trường.
    pause
    exit /b 1
)

:: 2. Kiểm tra xem có môi trường Voice Clone RTX 3060 nội bộ không
set "VC_DIR=H:\toollong\13- Voice Clone\VoiceClone_SRT_Studio_3.1.0_PORTABLE\VoiceClone_SRT_Studio_3.1.0_Beginner_Edition"
set "VC_PYTHON=%VC_DIR%\runtime\venv\Scripts\python.exe"

if exist "%VC_PYTHON%" (
    echo [PHÁT HIỆN] Máy trạm có GPU RTX 3060 và bộ mô hình Voice Clone Quang Minh cục bộ.
    echo Đang quét dữ liệu sách giáo khoa mới và sinh voice Quang Minh bằng GPU...
    echo.
    "%VC_PYTHON%" "%~dp0tools\generate_quang_minh_audio.py" --batch-size 8
) else (
    echo [THÔNG TIN] Bộ mô hình Voice Clone RTX 3060 cục bộ không có trên máy này.
    echo Chuyển sang chế độ Neural TTS di động qua Microsoft Edge (Miễn phí - Không cần GPU).
    echo.
    echo Đang kiểm tra thư viện edge-tts...
    !PY_EXE! -m pip install edge-tts >nul 2>&1
    echo.
    echo Đang tạo giọng đọc chuẩn cho bài học mới...
    !PY_EXE! "%~dp0tools\generate_audio_edge.py"
)

echo.
echo ====================================================================
echo  ✅ ĐÃ CẬP NHẬT XONG TOÀN BỘ VOICE VÀ FILE AUDIO_MANIFEST.JS!
echo ====================================================================
pause
