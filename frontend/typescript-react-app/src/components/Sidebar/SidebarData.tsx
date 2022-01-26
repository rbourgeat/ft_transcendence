import React from 'react';
import ReactDOM from 'react-dom';
import './Sidebar.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Channels',
        path: '/channels',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    }
    //Admin
    //Settings
    
    // },
    // {
    //     title: 'Support',
    //     path: '/support',
    //     icon: <IoIcons.IoMdHelpCircle />,
    //     cName: 'nav-text'
    // }

];