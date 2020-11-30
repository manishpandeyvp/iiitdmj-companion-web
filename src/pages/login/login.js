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
                <div>
                    <p class = "iiitdmj">
                        IIITDMJ<br/>COMPANION
                    </p>
                </div>
                <form class="form-signin" noValidate onSubmit={this.handleSubmit}>
                    <h1 class="h3 mb-3 hey-buddy">hey buddy !!</h1>
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
                        placeholder="EMAIL ADDRESS"
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
                        placeholder="PASSWORD"
                        onChange={this.handlechange}
                        value={this.state.password}
                        required />
                    {this.state.error ? (
                        <p class="mt-5 mb-3" style={{color: "red"}}>{this.state.error}</p>
                    ) : null}
                    <button
                        class="btn btn-lg login-button"
                        type="submit"
                        style={{color:"white"}}>
                        <i class="fas fa-angle-right"></i>
                    </button>
                    <p class="mt-5 mb-3 dont-have-acc">Don't have an account?</p>
                    <a href="/signup" class="btn btn-lg signup-btn" style={{color: "#fff"}}>Sign Up</a>
                </form>
            </div>
        )
    }
}
