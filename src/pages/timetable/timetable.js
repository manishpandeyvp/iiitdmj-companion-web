import React from 'react';
import LoginString from '../login/loginStrings';
import firebase from '../../services/firebase';
import Navbar from '../../components/navbar/navbar';
import TimetableCard from '../../components/timetable-card/timetable-card';
import '../../components/timetable-card/timetable-card.css'
import './timetable.css'

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            monClasses : [],
            tueClasses : [],
            wedClasses : [],
            thuClasses : [],
            friClasses : []
        }

        this.monday = []
        this.tuesday = []
        this.wednesday = []
        this.thursday = []
        this.friday = []
    }

    componentDidMount(){
        if(localStorage.getItem('branch') && localStorage.getItem('year')){
            this.getClasses('mon', this.renderMonClasses, this.monday);
            this.getClasses('tue', this.renderTueClasses, this.tuesday);
            this.getClasses('wed', this.renderWedClasses, this.wednesday);
            this.getClasses('thu', this.renderThuClasses, this.thursday);
            this.getClasses('fri', this.renderFriClasses, this.friday);
        } else {
            this.setState(() => {
                this.props.history.push('./details')
            })
        }
    }

    getClasses = async(day, dayArrayFunc, dayArray) => {
        const result = await firebase.firestore().collection('classes').doc(localStorage.getItem('year')).collection(localStorage.getItem('branch')).doc(day).collection('tt').get();
        if(result.docs.length > 0){
            result.docs.forEach((item, index) => {
                firebase.firestore().collection('classes').doc(localStorage.getItem('year')).collection(localStorage.getItem('branch')).doc(day).collection('tt').doc(item.id).get()
                .then((doc) => {
                    dayArray.push(
                        {
                            courseCode : doc.data().courseCode,
                            time : doc.data().time
                        }
                    )
                    dayArrayFunc()
                    console.log(day);
                    console.log(dayArray);
                })
            });

        }
    }

    // Monday Classes ****************************************************

    renderMonClasses = () => {
        if(this.monday.length > 0){
            let viewListUser = []
            this.monday.map((item) => {
                viewListUser.push(
                    <TimetableCard
                        courseCode = {item.courseCode}
                        time = {item.time}
                    />
                )
            })
            this.setState({
                monClasses : viewListUser
            })
        }
    }

    // Tuesday Classes ***************************************************

    renderTueClasses = () => {
        if(this.tuesday.length > 0){
            let viewListUser = []
            this.tuesday.map((item) => {
                viewListUser.push(
                    <TimetableCard
                        courseCode = {item.courseCode}
                        time = {item.time}
                    />
                )
            })
            this.setState({
                tueClasses : viewListUser
            })
        }
    }

    // Wednesday Classes ***************************************************

    renderWedClasses = () => {
        if(this.wednesday.length > 0){
            let viewListUser = []
            this.wednesday.map((item) => {
                viewListUser.push(
                    <TimetableCard
                        courseCode = {item.courseCode}
                        time = {item.time}
                    />
                )
            })
            this.setState({
                wedClasses : viewListUser
            })
        }
    }

    // Thursday Classes *******************************************************

    renderThuClasses = () => {
        if(this.thursday.length > 0){
            let viewListUser = []
            this.thursday.map((item) => {
                viewListUser.push(
                    <TimetableCard
                        courseCode = {item.courseCode}
                        time = {item.time}
                    />
                )
            })
            this.setState({
                thuClasses : viewListUser
            })
        }
    }

    // Friday Classes **********************************************************

    renderFriClasses = () => {
        if(this.friday.length > 0){
            let viewListUser = []
            this.friday.map((item) => {
                viewListUser.push(
                    <TimetableCard
                        courseCode = {item.courseCode}
                        time = {item.time}
                    />
                )
            })
            this.setState({
                friClasses : viewListUser
            })
        }
    }

    // Classes Ends ********************************************************

    logout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    render(){
        return(
            <div style ={{width: '95vw', marginLeft: 'auto', marginRight: 'auto'}}>
                <Navbar/>
                <div className = "tt-day-heading">
                    <span>MON</span>
                </div>
                <div className = "container">
                    <div className = "row">
                        {this.state.monClasses}
                    </div>
                </div>

                <div className = "tt-day-heading">
                    <span>TUE</span>
                </div>
                <div className = "container">
                    <div className = "row">
                        {this.state.tueClasses}
                    </div>
                </div>

                <div className = "tt-day-heading">
                    <span>WED</span>
                </div>
                <div className = "container">
                    <div className = "row">
                        {this.state.wedClasses}
                    </div>
                </div>

                <div className = "tt-day-heading">
                    <span>THU</span>
                </div>
                <div className = "container">
                    <div className = "row">
                        {this.state.thuClasses}
                    </div>
                </div>

                <div className = "tt-day-heading">
                    <span>FRI</span>
                </div>
                <div className = "container">
                    <div className = "row">
                        {this.state.friClasses}
                    </div>
                </div>
                <div style = {{marginBottom: '30px'}}></div>
            </div>
        )
    }
}
