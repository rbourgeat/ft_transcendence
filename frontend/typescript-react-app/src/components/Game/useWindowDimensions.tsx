import {useState,  useEffect, useLayoutEffect } from 'react';
import './Game.scss';
import ReactDOM from 'react-dom';

/**
 * @malatini
 * Suivi tutoriel : va permettre d'avant un canva proportionnel à la taille de l'écran quelle qu'elle soit
 */
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }
