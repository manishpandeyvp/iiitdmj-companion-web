import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './details.css';
import LoginString from '../login/loginStrings';

export default class Details extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            rollno: "",
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

    handleSubmit = async (event) => {

        const {name, rollno, year, branch} = this.state;
        event.preventDefault();
        if(year !== "" && branch !== ""){

            try{
                localStorage.setItem('name', name);
                localStorage.setItem('rollno', rollno);
                localStorage.setItem('year', year);
                localStorage.setItem('branch', branch);

                console.log(localStorage.getItem('name'));
                console.log(localStorage.getItem('rollno'));
                console.log(localStorage.getItem('year'));
                console.log(localStorage.getItem('branch'));

                this.setState({
                    name: '',
                });

                this.props.history.push("/timetable");
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
                <div>
                    <p class = "iiitdmj">
                        IIITDMJ<br/>COMPANION
                    </p>
                </div>
                <form class="form-signin" noValidate onSubmit={this.handleSubmit}>
                    <h1 class="h3 mb-3 create-your-profile">create your<br/>profile</h1>
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
                        for="inputRollno"
                        class="sr-only">
                        ROLL NUMBER
                    </label>
                    <input
                        id="rollno"
                        type="text"
                        class="form-control"
                        name="rollno"
                        placeholder="ROLL NUMBER"
                        onChange={this.handlechange}
                        value={this.state.rollno}
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
                            <option value="sm">DESIGN</option>
                        </select>
                    <button
                        className = "btn btn-block signup-button"
                        type="submit"
                        style={{color:"white"}}>
                        <i class="fas fa-angle-right"></i>
                    </button>
                    <p class="mt-5 mb-3 already-have-acc">Already have an account ?</p>
                    <a href="/login" class="btn btn-lg login-btn">Login</a>
                </form>
            </div>
        )
    }
}
