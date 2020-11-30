import React from 'react';
import LoginString from '../login/loginStrings';
import firebase from '../../services/firebase';
import Navbar from '../../components/navbar/navbar'

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
        localStorage.clear()
        this.props.history.push('/')
    }

    render(){
        return(
            <div style ={{width: '100vw'}}>
                <Navbar/>
            </div>
        )
    }
}
