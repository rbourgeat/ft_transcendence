import './NotFound.scss';
//Mahaut pb de dépendences
//import TypeAnimation from 'react-type-animation'
import Nav from '../Nav/Nav';

/**
 * @malatini
 */
export default function NotFound() {
    return (
        <div id="NotFound">
            <Nav />
            <div className="container">
                <div className="d-flex justify-content-center" id="oops--notfound">
					<h1><span id="oops">Oops...</span></h1>
			    	<h2><span id="page-not-found">Page not found</span></h2>
                </div>
                {/*<div className="d-flex justify-content-center" id="title--code">
					<TypeAnimation className="title" cursor={false} sequence={["404!", 2500, '']} wrapper="h1" repeat={Infinity} />
                </div>*/}
            </div>
        </div>
    );
}
