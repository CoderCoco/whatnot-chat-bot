@ECHO OFF

SET FORCE_COLOR = 1

echo "Executing bundle build"
cmd.exe /C npx.cmd nx run bundle:build:production

echo "Starting up the application"
.\out\whatnot-chatbot-win32-x64\whatnot-chatbot.exe --clear-old-logs --log-directory .\logs --trace-warnings
