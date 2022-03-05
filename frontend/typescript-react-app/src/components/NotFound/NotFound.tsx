import './NotFound.scss';
// import Nav from '../Nav/Nav';

/**
 * @malatini
 * Jolie page not found, a continuer
 */
export default function NotFound() {
    return (
        <div id="NotFound">
            {/* <Nav /> */}
            <div className="container">
                <div className="d-flex justify-content-center" id="oops--notfound">
                    <h1><span id="oops">Oops !</span></h1>
                    <h2><span id="page-not-found">Page not found</span></h2>
                </div>
                <div className="d-flex justify-content-center" id="img--notfound">
                    <img src="https://www.pngkit.com/png/full/930-9306501_404-graphic-design.png"></img>
                </div>
            </div>
        </div>
    );
}
