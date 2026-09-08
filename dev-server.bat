@echo off
setlocal enabledelayedexpansion
REM SecretGen - Local dev server (Windows)
REM Usage: dev-server.bat [port]
REM   port   default: 3000 (vercel dev's own default)
REM
REM Unlike most other projects in this org, SecretGen has no config.json or
REM hardcoded domain to force into a "dev mode" - vercel.json's routing is
REM identical locally and in production, since `vercel dev` reads it directly.
REM This script just makes sure dependencies are installed before launching it.

set "DIR=%~dp0"
cd /d "%DIR%"

set "PORT=%~1"
if "%PORT%"=="" set "PORT=3000"

if not exist "%DIR%node_modules" (
    echo Installing Node dependencies...
    call npm install
)

call npx vercel dev --listen "%PORT%"
