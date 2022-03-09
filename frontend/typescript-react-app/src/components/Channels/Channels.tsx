import './Channels.scss';
import Nav from '../Nav/Nav';
import TypingMessage from "./TypingMessage/TypingMessage";
import ListDiscussions from "./ListDiscussions/ListDiscussions";

/**
 * @malatini ou @macrespo
 * Page principale pour afficher les channels, voir les sous composants
 */
export default function Channels() {
    return (
        <div id="channels">
            <Nav />
            <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-7">
                        <h1 id="channels--tile">Channels</h1>
                        <h2 id="websocket--tile">Websocket chat</h2>
                        <ListDiscussions />
                        <TypingMessage />
                    </div>
                {/* Components mes channels */}
                {/* Component discussion */}
                {/* Component participants */}
                {/* Component taper un message */}
                </div>
            </div>
        </div>
    );
}
