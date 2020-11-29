import React, { Component } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import Home from './pages/home/home';
import Timetable from './pages/timetable/timetable';
// import BusSchedule from './pages/bus-schedule/bus-schedule';
// import Mess from './pages/mess/mess';
// import Faculty from './pages/faculty/faculty';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                    exact
                    path = "/"
                    render = { props => <Home {...props}/>}/>

                    <Route
                    exact
                    path = "/timetable"
                    render = { props => <Timetable {...props}/>}/>

                    <Route
                    exact
                    path = "/signup"
                    render = { props => <Signup {...props}/>}/>

                    <Route
                    exact
                    path = "/login"
                    render = { props => <Login {...props}/>}/>
                </Switch>
            </Router>
        )
    }
}

export default App



                    // <Route
                    // exact
                    // path = "/bus"
                    // render = { props => <BusSchedule {...props}/>}/>



                                        // <Route
                                        // exact
                                        // path = "/faculty"
                                        // render = { props => <Faculty {...props}/>}/>
                                        //
                                        // <Route
                                        // exact
                                        // path = "/mess"
                                        // render = { props => <Mess {...props}/>}/>
