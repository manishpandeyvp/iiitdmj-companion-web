import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './signup.css';
import firebase from '../../services/firebase';
import LoginString from '../login/loginStrings';

export default class Signup extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            name: "",
            year: "",
            branch: "",
            error: null
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handlechange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event){

        const {name, password, email, year, branch} = this.state;
        event.preventDefault();
        if(year !== "" && branch !== ""){
            try{
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(async result => {
                    firebase.firestore().collection('users')
                    .add({
                        name,
                        id: result.user.uid,
                        email,
                        year,
                        branch
                    }).then((docRef) => {
                        localStorage.setItem(LoginString.ID, result.user.uid);
                        localStorage.setItem(LoginString.Name, name);
                        localStorage.setItem(LoginString.Email, email);
                        localStorage.setItem(LoginString.Year, year);
                        localStorage.setItem(LoginString.Branch, branch);
                        localStorage.setItem(LoginString.UPLOAD_CHANGED, 'state_changed');
                        localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id);

                        this.setState({
                            name: '',
                            password: '',
                        });
                        this.props.history.push("/timetable");
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    })
                })
            } catch(error) {
                console.error("Error in signing up : ", error);
            }
        }
        else{
            alert('Enter suitable values!!');
        }

    }

    render(){
        return(
            <div class="text-center"  style = {{width:'100vw', margin: 'auto'}}>
                <p class = "iiitdmj">
                    IIITDMJ<br/>COMPANION
                </p>
                <form class="form-signin" noValidate onSubmit={this.handleSubmit}>
                    <h1 class="h3 mb-3 create-your-profile">create your<br/>profile</h1>
                    <label
                        for="inputEmail"
                        class="sr-only">
                        EMAIL ADDRESS
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
                        PASSWORD
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
                    <label
                        for="inputName"
                        class="sr-only">
                        NAME
                    </label>
                    <input
                        id="name"
                        type="text"
                        class="form-control"
                        name="name"
                        placeholder="NAME"
                        onChange={this.handlechange}
                        value={this.state.name}
                        required />
                    <label
                        for="inputYear"
                        class="sr-only">
                        YEAR
                    </label>
                    <select name="year" id="year" onChange={this.handlechange}>
                        <option value="">SELECT YOUR YEAR</option>
                        <option value="first">Fresher</option>
                        <option value="second">Sophomore</option>
                        <option value="third">Junior</option>
                        <option value="fourth">Final</option>
                    </select>
                    <label
                        for="inputBranch"
                        class="sr-only">
                        BRANCH
                    </label>
                    <select name="branch" id="branch" onChange={this.handlechange}>
                        <option value="">SELECT YOUR BRANCH</option>
                        <option value="ece">ECE</option>
                        <option value="cse">CSE</option>
                        <option value="me">ME</option>
                        <option value="design">DESIGN</option>
                    </select>

                    <button
                        className = "btn btn-block signup-button"
                        type="submit"
                        style={{color:"white"}}>
                        <i class="fas fa-angle-right"></i>
                    </button>
                    <p class="mt-5 mb-3 text-muted">Already have an account?</p>
                    <a href="/login" class="btn btn-lg btn-light">Login</a>
                </form>
            </div>
        )
    }
}
