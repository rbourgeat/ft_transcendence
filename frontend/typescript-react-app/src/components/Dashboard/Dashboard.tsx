import './Dashboard.scss';
import Nav from '../Nav/Nav'
import MatchHistory from '../MatchHistory/MatchHistory';
import Badge from './Badge/Badge';
import Footer from "../Footer/Footer"

export default function Dashboard() {
    return (
        <div id="dashboard">
            <div className="container">
                <div
                    className="row d-flex justify-content-center text-center"
                    id="dashboard-buttons"
                >
                    <h1 className="titles">Dashboard / Personnal stats</h1>
                    <h2 className="titles">to do @malatini</h2>
                    <Badge />
                    <MatchHistory />
                    <Footer />
            </div>
            </div>
        </div>
    )
}
