echo "TEST=$(hostname -I | cut -d ' ' -f 1)" >> .env
export TEST=$(hostname -I | cut -d ' ' -f 1)