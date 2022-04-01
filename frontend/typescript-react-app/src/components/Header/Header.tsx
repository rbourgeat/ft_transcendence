import React from 'react';
import './Header.scss';

/**
 * @malatini petit composant Header plus utilise, probablement a supprimer
 */
//TODO: a déplacer dans welcome
export default function Header() {
    return (
        <div id="header">
            <nav id="header--nav">
                <div className="container-fluid">
                    FT_TRANSCENDENCE
                </div>
            </nav>
        </div>
    )
}
