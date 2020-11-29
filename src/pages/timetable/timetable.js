import React from 'react';
import LoginString from '../login/loginStrings';
import firebase from '../../services/firebase';


export default class Home extends React.Component {

    componentDidMount(){
        if(localStorage.getItem(LoginString.Branch) && localStorage.getItem(LoginString.Year)){
            this.setState(()=> {
                this.props.history.push('./timetable')
            })
        } else {
            this.setState(() => {
                this.props.history.push('./login')
            })
        }
    }

    logout = () => {
        firebase.auth().signOut()
        this.props.history.push('/')
        localStorage.clear()
    }

    render(){
        return(
            <div>
                <p> IIITDMJ Companion Signed in!</p>
                <button onClick = {this.logout}>Logout</button>
            </div>
        )
    }
}
