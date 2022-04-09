import './ChatPage.scss';
import Nav from '../../Nav/Nav';
import MyAxios from '../../Utils/Axios/Axios';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer, toast } from 'react-toastify';

interface ChatProps {
    username?: string
}

//TODO: a reprendre
export default function Chat(props: ChatProps) {
    function createChat()
    {
        let ax = new MyAxios(null);
        let res = ax.post_api_chat("channel1", true, "password");
    }

    function listChats()
    {
        let ax = new MyAxios(null);
        let res = ax.get_api_chat();
    }

        return (
            <div id="channels">
                <Nav />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="container" id="chat--container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-7">
                            <h1 id="channels--tile">Chat</h1>
                            <button className="chat-buttons" onClick={createChat}>Create chat</button>
                    </div>
                </div>
            </div>
		</div>
        );
}
