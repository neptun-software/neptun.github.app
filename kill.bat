for /f "tokens=5" %a in ('netstat -ano ^| findstr :3000') do taskkill /PID %a /F