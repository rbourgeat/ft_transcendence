import './TypingMessage.scss';

/**
 * @malatini ou @macrespo
 * Composant qui permettra à l'user de "preparer" / ecrire le message qu'il va envoyer sur le channel ou le dm.
 */
export default function ListParticipant() {
    return (
        <div id="typing--div">
            <p id="typing--title">Typing message section</p>
            <input
                placeholder="Type something..."
                /*className="typing--input"*/
                className="form-control"
                />
        </div>
    );
}
