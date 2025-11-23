@echo off
echo Démarrage du serveur Flask...

REM Active un environnement virtuel si tu en as un
if exist venv (
    call venv\Scripts\activate
)

python app.py

pause
