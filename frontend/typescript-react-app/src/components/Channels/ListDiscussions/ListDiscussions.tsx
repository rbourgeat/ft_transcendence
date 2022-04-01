import './ListDiscussions.scss';
import SingleMessage from "./SingleMessage/SingleMessage";
import React, {Component, useState, useEffect} from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";

export default function ListDiscussions() {
    return (
        <div id="ListDiscussions">
            <p id="discussions--title">List of messages</p>
            <div className="overflow-auto" id="sub--div">
                <ul id="messages">
                </ul>
            </div>
        </div>
    );
}
