#Check en fonction de si c'est un mac ou un linux
if [[ "$OSTYPE" == "darwin"* ]]; then
	echo "TEST=$(ipconfig getifaddr en0 | cut -d ' ' -f 1)" >> .env
else 
	echo "TEST=$(hostname -I | cut -d ' ' -f 1)" >> .env
fi
export TEST=$(hostname -I | cut -d ' ' -f 1)
echo "REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)" >> .env
export REACT_APP_IP=$(hostname -I | cut -d ' ' -f 1)

#echo "REACT_APP_IP=localhost" >> .env
#echo "TEST=localhost" >> .env
#export REACT_APP_IP=localhost
#export TEST=localhost
