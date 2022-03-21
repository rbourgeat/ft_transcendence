import './CreateChan.scss';
import React from "react";
import Nav from "../../Nav/Nav"

export default class CreateChan extends React.Component
{

    //constructor()
    //{
    //    super();
    //    this.state = {
    //    }
    //}

    componentDidMount() {
    }

    render()
    {
        return (
            <div id="channels">
                <Nav />
                <div className="container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-7">
                        </div>
                        <div className="col-4" id="list--participants">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
