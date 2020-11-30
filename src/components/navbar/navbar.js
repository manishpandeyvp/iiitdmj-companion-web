import React from 'react';
import './navbar.css'

export default class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            close: true,
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick = () => {
        this.setState({
            close: !this.state.close,
        });
    };

    render(){
        return(
            <div className = {this.state.close ? "navBar" : "navBar open"}>
                <div className="logo">
                    <p className = "iiitdmj-nav">
                        IIITDMJ<br/>COMPANION
                    </p>
                </div>
                <div className="links">
                    <a className="link1">Timetable</a>
                    <a className="link2">Bus Schedule</a>
                    <a className="link3">Mess Menu</a>
                    <a className="link4">Faculty</a>
                </div>
                <div>
                    <p className = "hey-ya">
                        HEY<br/>
                        <span>YA !</span>
                    </p>
                </div>
                <div className="nav-bar-times" onClick = {this.handleOnClick}>
                    <a><i class="fas fa-bars"></i></a>
                    <a><i class="fas fa-times"></i></a>
                </div>
            </div>
        )
    }
}
