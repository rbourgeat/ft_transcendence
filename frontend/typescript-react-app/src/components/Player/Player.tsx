import React from 'react'
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import './Player.scss';

//TODO: a revoir

export default function Profile() {
    return (
        <div id="profile-div">
          <div className="container" id="container-profile">
            <div className="row" id='profile-row'>
              <div className="col align-self-start" id="profile-col">
                <div className="row">
                    <div id="card-profile">
                      <img className="item-col-lg"></img>
                      <div className="card-body">
                        <h5 className="card-title">Profile</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </div>
                    </div>
                  </div> 
              </div>
              <div className="col align-self-center">
                <h3>Last played games</h3>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Cras justo odio
                    <span className="badge badge-primary badge-pill">14</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Dapibus ac facilisis in
                    <span className="badge badge-primary badge-pill">2</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Morbi leo risus
                    <span className="badge badge-primary badge-pill">1</span>
                  </li>
                </ul>
              </div>
              <div className="col align-self-end">
                <h2>Leaderboard</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Morbi leo risus</li>
                  <li className="list-group-item">Porta ac consectetur ac</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
}