import React from 'react';
import './faculty-card.css';

const FacultyCard = (props) => {
    return <div className = "col-sm-6 col-md-4 col-xl-2 faculty-card">
        <div className = "text-center facultyCardBody">
            <div style = {{padding: '0'}}>
                <div className = "faculty-img-div">
                    <img className = "faculty-img" src = {props.img}/>
                </div>
                <h5 className = "faculty-name">{props.facultyName}</h5>
                <p className = "faculty-pos"><small >{props.facultyPos}</small></p>
            </div>
        </div>
    </div>
}

export default FacultyCard;
