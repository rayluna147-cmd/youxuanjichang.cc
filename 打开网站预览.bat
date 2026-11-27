@echo off
chcp 65001 >nul
title 优选机场 (youxuanjichang.cc) — 本地一键预览
cd /d "%~dp0"

echo ==================================================
echo   优选机场 SPECTRUM — 本地预览服务器启动中...
echo ==================================================
if not exist "dist\index.html" (
  echo [1/2] 首次运行，正在构建静态站点与 Pagefind 索引...
  call npm run build
)

echo [2/2] 启动 Astro 预览服务器 (http://localhost:4321/)...
start "" "http://localhost:4321/"
call npm run preview -- --port 4321 --host
pause
