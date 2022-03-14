import './Dashboard.scss';
import Nav from '../Nav/Nav'
import MatchHistory from '../MatchHistory/MatchHistory';
import Badge from './Badge/Badge';
import Footer from "../Footer/Footer"
//import { PieChart } from 'react-minimal-pie-chart';
//import Media from 'react-media'

/**
 * @malatini page de Dashboard a améliorer
 */
export default function Dashboard() {
    return (
        <div id="dashboard">
            <Nav />
            <Badge />
            <br />
            <div className="container">
                <div className="row">
                </div>
            </div>
            <div className="container">

                <div
                  className="row d-flex justify-content-center text-center"
                  id="dashboard-buttons"
                  >

                    <div className="col-4">
                    <br />
                        <button
                          id="match-history-button"
                        >
                          Match history
                        </button>
                        <br />
                    </div>
                    <div className="col-4">
                      <br />
                        <button id="friends-button">Friends</button>
                        <br />
                    </div>
                    {/*<Media query="(min-width: 1200px)">
                        <MatchHistory />
                    </Media>*/}
                    <Footer />
            </div>
            </div>
        </div>
    )
}
