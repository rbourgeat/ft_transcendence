#Check en fonction de si c'est un mac ou un linux
if [[ "$OSTYPE" == "darwin"* ]]; then
	echo "TEST=$(ipconfig getifaddr en0 | cut -d ' ' -f 1)" >> .env
	echo "TEST=$(ipconfig getifaddr en0 | cut -d ' ' -f 1)" >> ./frontend/typescript-react-app/.env
	export TEST=$(ipconfig getifaddr en0 | cut -d ' ' -f 1)
	echo "REACT_APP_IP=$(ipconfig getifaddr en0 | cut -d ' ' -f 1)" >> .env
	echo "REACT_APP_IP=$(ipconfig getifaddr en0 | cut -d ' ' -f 1)" >> ./frontend/typescript-react-app/.env
	export REACT_APP_IP=$(ipconfig getifaddr en0 | cut -d ' ' -f 1)
else 
	echo "TEST=$(hostname -I | cut -d ' ' -f 1)" >> .env
	echo "TEST=$(hostname -I | cut -d ' ' -f 1)" >> ./frontend/typescript-react-app/.env
	export TEST=$(hostname -I | cut -d ' ' -f 1)
	echo "REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)" >> .env
	echo "REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)" >> ./frontend/typescript-react-app/.env
	export REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)
fi

#echo "REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)" >> .env
#export REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)
#echo "REACT_APP_IP=localhost" >> .env
#echo "TEST=localhost" >> .env
#export REACT_APP_IP=localhost
#export TEST=localhost
