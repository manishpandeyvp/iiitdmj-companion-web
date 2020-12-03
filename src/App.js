import React, { Component } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import Home from './pages/home/home';
import Timetable from './pages/timetable/timetable';
import Details from './pages/details/details';
import Faculty from './pages/faculty/faculty';

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
                    path = "/details"
                    render = { props => <Details {...props}/>}/>

                    <Route
                    exact
                    path = "/timetable"
                    render = { props => <Timetable {...props}/>}/>

                    <Route
                    exact
                    path = "/faculty"
                    render = { props => <Faculty {...props}/>}/>
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
