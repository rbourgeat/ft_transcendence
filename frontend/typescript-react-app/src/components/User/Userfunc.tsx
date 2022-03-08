import React, { useState, useEffect} from 'react';

//a voir
import { createStore, combineReducers } from 'redux';

import qs from "qs";
import { createBrowserHistory } from "history";

import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../App/UserContext";

//Pour l'upload de l'image
import { Image } from 'react-konva';
import useImage from 'use-image';
import { Prev } from 'react-bootstrap/esm/PageItem';

//var fileupload = require("express-fileupload");

import fs from "fs"

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
  	const [imgData, setImgData] = useState("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg");

	  const getImage = () => {
		let username = this.state.username;
		let url = "http://localhost:3000/api/user/".concat(username);
		console.log(url);
		let ax = new MyAxios({});
		//let avatar: string = ax.get_avatar(url).
		let result = axios.get(url).then(res => {
				console.log(res.statusText);
                if (res.statusText == "OK")
                {
                    const { data } = res;
                    let test: any = JSON.parse(res.data.avatar);
                    let avatar: string = ((data.avatar) as string);
                    //return (this.state.avatar);
					setImgData(avatar);
                }
				else
				{
					console.log("Error when getting avatar img");
					setImgData("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" as string)
				}
	}).catch((error) => {
		console.log("Error catched when getting avatar");
		setImgData("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" as string)
	})
	}

	//const [imgData, setImgData] = useState(getImage);

	  const onChangePicture = (e: any) => {
		e.preventDefault();
		if (e.target.files[0]) {
		  //console.log("picture: ", e.target.files);
		  //setPicture(e.target.files[0]);
		  const reader = new FileReader();
		  reader.addEventListener("load", () => {
			setImgData(reader.result as string);
		  });
		  reader.readAsDataURL(e.target.files[0]);
		  //let file: string = reader.result as string;

		  console.log(e.target.files[0]);
		  const file_name = e.target.files[0].name;
		  //console.log(file_name);
		  console.log("coucou");

		  const file = e.target.files[0];
		  //console.log("file is " + file);

		  	let username = props.username;
			let url = "http://localhost:3000/api/user/".concat(username).concat("/avatar/");
			console.log("url is " + url);

			axios.defaults.baseURL = 'http://localhost:3000/api/';
			axios.defaults.headers.post['Content-Type'] ='multipart/form-data';
			axios.defaults.headers.post['Accept'] ='*/*';
			axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

			const headers = {
				'Content-Type': 'multipart/form-data'
			};

			const formData = new FormData();
			formData.append('avatar', file);
			formData.append('type', 'file');

			let res = axios.post(url, formData, {headers}).then(res=>{
				console.log(res.data);
				console.log(res.status)
				if (res.status == 201)
				{
					console.log("Yay ! Avatar updated");
				}
				else
				{
					console.log("Oops! Avatar not updated");
				}
			}).catch((error) => {
				console.log("Catched error !");
				console.log(error);
				return (null);
			})
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
				width="80"
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
