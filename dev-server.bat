@echo off
setlocal enabledelayedexpansion
REM SecretGen - Local dev server (Windows)
REM Usage: dev-server.bat [port] [--lan]
REM   port    default: 3000 (vercel dev's own default)
REM   --lan   listen on all interfaces so phones/tablets on your network can
REM           connect (prints the addresses to open); default is 127.0.0.1 only
REM
REM Unlike most other projects in this org, SecretGen has no config.json or
REM hardcoded domain to force into a "dev mode" - vercel.json's routing is
REM identical locally and in production, since `vercel dev` reads it directly.
REM This script just makes sure dependencies are installed before launching it.

set "DIR=%~dp0"
cd /d "%DIR%"

set "PORT=3000"
set "HOST=127.0.0.1"

:args
if "%~1"=="" goto run
if "%~1"=="--lan" (
    set "HOST=0.0.0.0"
    shift
    goto args
)
echo %~1| findstr /r "^[0-9][0-9]*$" >nul
if errorlevel 1 (
    echo Unknown option: %~1
    echo Usage: dev-server.bat [port] [--lan]
    exit /b 1
)
set "PORT=%~1"
shift
goto args

:run
if not exist "%DIR%node_modules" (
    echo Installing Node dependencies...
    call npm install
)

if "%HOST%"=="0.0.0.0" (
    echo On your local network ^(--lan^), open one of these on the other device:
    for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
        for /f "tokens=* delims= " %%b in ("%%a") do echo     http://%%b:%PORT%
    )
    echo   ^(usually the 192.168.x.x one; allow Node through the firewall if asked^)
)
call npx vercel dev --listen "tcp://%HOST%:%PORT%"
