@echo off
echo Welcome to Koteyka's Files
:askQuestion
set /p userInput=Do you have nodeJS (Y/n): 

set "userInput=%userInput:~0,1%"
set "userInput=%userInput: =%"

if /i "%userInput%"=="y" (
    echo _____________________________________________________
    echo Server started, from now all logs are from the server
    echo _____________________________________________________
    node server.js
) else if /i "%userInput%"=="n" (
    echo Download it from nodejs.org and reopen this
    pause
) else (
    echo Invalid input, please enter Y or n.
    goto askQuestion
)