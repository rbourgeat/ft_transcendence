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
            <div className="container">
                <div
                  className="row d-flex justify-content-center text-center"
                  id="dashboard-buttons"
                  >
                    <Badge />
                    {/*<div className="col-4">
                        <button
                          id="match-history-button"
                        >
                          Match history
                        </button>
                    </div>*/}
                    {/*<div className="col-4">
                        <button id="friends-button">Friends</button>
                    </div>*/}
                    <MatchHistory />
                    <Footer />
            </div>
            </div>
        </div>
    )
}
