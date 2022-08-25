REM rmdir /s /q zz_tsOut
for /d %%G in ("C:\ws\ts2\WebUIx\*") do rd /s /q "%%~G"
del C:\ws\ts2\build\tsconfig.tsbuildinfo
sass --source-map WebUI:build & tsc -w

