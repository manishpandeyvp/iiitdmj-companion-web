import React from 'react';
import './faculty.css';
import firebase from '../../services/firebase';
import Navbar from '../../components/navbar/navbar';
import SettingIcon from '../../components/setting-icon/setting-icon'
import FacultyCard from '../../components/faculty-card/faculty-card'


export default class Faculty extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            facultyList : []
        }

        this.faculty = []
    }

    componentDidMount(){
        this.getFacultyList()
    }

    getFacultyList = async () => {
        const result = await firebase.firestore().collection('faculty').get();
        if(result.docs.length > 0){
            result.docs.forEach((item, i) => {
                firebase.firestore().collection('faculty').doc(item.id).get()
                .then((doc) => {
                    this.faculty.push(
                        {
                            img : doc.data().image,
                            facultyName : doc.data().name,
                            facultyPos : doc.data().designation
                        }
                    )
                    this.renderFacultyList()
                })
            });

        }
    }

    renderFacultyList(){
        if(this.faculty.length > 0){
            let viewFacultyList = []
            this.faculty.map((item) => {
                viewFacultyList.push(
                    <FacultyCard
                        facultyName = {item.facultyName}
                        img = {item.img}
                        facultyPos = {item.facultyPos}
                    />
                )
            })
            this.setState({
                facultyList : viewFacultyList
            })
        }
    }

    render(){
        return (
            <div style ={{width: '95vw', marginLeft: 'auto', marginRight: 'auto'}}>
            <Navbar/>
            <div className = "container">
                <div className = "row">
                    {this.state.facultyList}
                </div>
            </div>
            <SettingIcon/>
            </div>
        )
    }
}
