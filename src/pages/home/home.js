import React from 'react'
import LoginString from '../login/loginStrings';


export default class Home extends React.Component {
    componentDidMount(){
        if(localStorage.getItem(LoginString.Branch) && localStorage.getItem(LoginString.Year)){
            this.setState(()=> {
                this.props.history.push('./timetable')
            })
        } else {
            this.setState(() => {
                this.props.history.push('./details')
            })
        }
    }

    render(){
        return(
            <div>
                <p> IIITDMJ Companion </p>
            </div>
        )
    }
}
