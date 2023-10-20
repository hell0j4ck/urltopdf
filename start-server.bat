@echo off
cd
start chrome --incognito http://localhost:3000/
npx nodemon index.js
