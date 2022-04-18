import './NotFound.scss';
import Nav from '../Nav/Nav';
import Footer from "../Footer/Footer";

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
            </div>
        </div>
    );
}
