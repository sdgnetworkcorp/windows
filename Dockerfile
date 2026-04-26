# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/windows/servercore:ltsc2022

RUN powershell -Command \
    Invoke-WebRequest -Uri https://aka.ms/wsl.wslu -OutFile C:\wsl.exe; \
    Start-Process -FilePath C:\wsl.exe -Wait -NoNewWindow

RUN powershell -Command \
    Rename-Computer -NewName 'WindowsServer' -Restart