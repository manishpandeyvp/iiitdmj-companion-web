import React from 'react';
import './timetable-card.css';

const TimetableCard = (props) => {
    return <div className = "col-sm-6 col-md-4 col-xl-3 timetable-card">
        <div className = "card text-center WeatherBody">
            <div className = "card-body" style = {{padding: '0'}}>
                <h5 className = "card-title">{props.courseCode}</h5>
                <p class="card-text"><small class="class-time">{props.time}</small></p>
            </div>
        </div>
    </div>
}

export default TimetableCard;
