import React, { useState, useEffect, useContext, useMemo} from 'react';
import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../App/UserContext";

//Pour l'upload de l'image
import { Image } from 'react-konva';
import useImage from 'use-image';

//const url = 'https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg';

export interface UserProps {
	username?: string,
	email?: string,
	password?: string,
	password_conf?: string,
	avatar?: string,
	totalGames?: number,
	totalWins?: number,
	totalLoss?: number,
	winLoss?: number
  }

User.defaultProps = {
	//avatar: "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg",
	totalWin: 0,
	totalGanes: 0,
	totalLoss: 0,
	winLoss: 0
}

export default function User(props:UserProps)
{

	//Tuto stack overflow
	const [picture, setPicture] = useState(null);
  	const [imgData, setImgData] = useState("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg");

	const ava = useMemo( () =>
		({picture, setPicture}), [picture, setPicture]);

	const avat = useMemo( () =>
		({imgData, setImgData}), [imgData, setImgData]);

	  const onChangePicture = (e: any) => {
		if (e.target.files[0]) {
		  console.log("picture: ", e.target.files);
		  setPicture(e.target.files[0]);
		  const reader = new FileReader();
		  reader.addEventListener("load", () => {
			setImgData(reader.result as string);
		  });
		  reader.readAsDataURL(e.target.files[0]);
		}
	  }

	//let avatar = url;
    return (
      <div id="user--div">
      <Nav />
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-4" id="bonjour--user">
              <h1>Bonjour <span></span></h1>
              <br />
              <div className="user--stats">
              <h2>Information</h2>
              <img
               	src={imgData}
			    height="80"
                alt="avatar"
                id="avatar-id"
                />
                <br/>
                <br/>
                <div className="col-4 mx-auto text-center" id="input-div">
                  <input type="file" name="image-upload" id="input--upload" accept="image/*" onChange={onChangePicture}/>
                    <div className="label">
                    </div>
                  </div>
                <p>Total games : <span className="span--stats">{props.totalGames ? props.totalGames : 0}</span></p>
                <p>Total wins : <span className="span--stats">{props.totalWins ? props.totalWins : 0}</span></p>
                <p>Total loss : <span className="span--stats">{props.totalLoss ? props.totalLoss : 0}</span></p>
                <p>Win/loss ratio : <span className="span--stats">{props.winLoss ? props.winLoss : 0}</span></p>
              </div>
              <br />
              <br />
              <br />
              <br />
              </div>
            </div>
          </div>
      </div>
    );
 };
