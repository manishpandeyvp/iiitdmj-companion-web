import React from 'react';
import firebase from '../../services/firebase';
import LoginString from '../login/loginStrings';
import './login.css';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handlechange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount(){
        if(localStorage.getItem(LoginString.ID) && localStorage.getItem(LoginString.Branch) && localStorage.getItem(LoginString.Year)){
            this.setState(()=> {
                this.props.history.push('./timetable')
            })
        } else {
        }
    }

    async handleSubmit(event){
        event.preventDefault();
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(async result => {
            let user = result.user;
            if(user){
                await firebase.firestore().collection('users')
                .where('id', "==", user.uid)
                .get()
                .then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        const currentdata = doc.data();
                        localStorage.setItem(LoginString.FirebaseDocumentId, doc.id);
                        localStorage.setItem(LoginString.ID, currentdata.id);
                        localStorage.setItem(LoginString.Name, currentdata.name);
                        localStorage.setItem(LoginString.Email, currentdata.email);
                        localStorage.setItem(LoginString.Branch, currentdata.branch);
                        localStorage.setItem(LoginString.Year, currentdata.year);
                    })
                })
            }
            this.props.history.push('/timetable');
        }) .catch((error) => {
            this.props.history.push('/login')
        })
    }

    render(){
        return(
            <div class="text-center"  style = {{width:'100vw', margin: 'auto'}}>
                <form class="form-signin" noValidate onSubmit={this.handleSubmit}>
                    <h1 class="h3 mb-3 font-weight-normal">Welcome!!</h1>
                    <label
                        for="inputEmail"
                        class="sr-only">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        class="form-control"
                        placeholder="Email address"
                        required
                        onChange={this.handlechange}
                        value={this.state.email}
                        autofocus />
                    <label
                        for="inputPassword"
                        class="sr-only">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        placeholder="Password"
                        onChange={this.handlechange}
                        value={this.state.password}
                        required />
                    <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember" /> Remember me
                        </label>
                    </div>
                    {this.state.error ? (
                        <p class="mt-5 mb-3" style={{color: "red"}}>{this.state.error}</p>
                    ) : null}
                    <button
                        class="btn btn-lg btn-primary btn-block"
                        type="submit"
                        style={{color:"white"}}>
                        Sign In
                    </button>
                    <p class="mt-5 mb-3 text-muted">Don't have an account?</p>
                    <a href="/signup" class="btn btn-lg btn-light">Sign Up</a>
                    <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
                </form>
            </div>
        )
    }
}
