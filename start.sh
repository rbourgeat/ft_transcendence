echo "TEST=$(hostname -I | cut -d ' ' -f 1)" >> .env
export TEST=$(hostname -I | cut -d ' ' -f 1)
echo "REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)" >> .env
export REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)