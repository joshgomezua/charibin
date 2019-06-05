import React from 'react'
import './style.scss'
import {ICities} from './types'
import Button from '../../../Common/Components/Button'
import Switch from 'src/Admin/Components/Switch'

export class Index extends React.Component<ICities> {
         cities: ICities[] =  [
            {
                _id:'1',
                name:'London',
                country:'England',
                picture:'Lala',
                tags:'city',
                isEnable:false,
                isModify:false,
            },

            {
                _id:'2',
                name:'Berlin',
                country:'Germany',
                picture:'L',
                tags:'city',
                isEnable:false,
                isModify:false,
            },

            {
                _id:'3',
                name:'Paris',
                country:'France',
                picture:'La',
                tags:'city',
                isEnable:false,
                isModify:false,
            },
        ]

    render() {
        return (
            <React.Fragment>
               <div>
                    <div className = 'grid-container-header'>
                            <div className= 'gridItemHeader'>Destination&depature database</div>
                            <div className = 'gridItemHeader'>Sponteous</div>
                    </div>
                    <div >
                        <input className="search-box" type ="text" placeholder = "Type to search"/>
                    </div>
                    <button className = "addCity">Add City</button> 
                    <div className ="grid-container" >
                        <div className ="grid-item" >City</div>
                        <div className ="grid-item" >Country</div>
                        <div className ="grid-item" >Photo</div>
                        <div className ="grid-item" >Key Words</div>
                        <div className ="grid-item" >Modify</div> 
                        <div className ="grid-item" >Enable</div>
                        {this.cities.map(cities => 
                            <React.Fragment key = {cities._id}>
                                <div className ="grid-item" > {cities.name} </div>
                                <div className ="grid-item"> {cities.country} </div> 
                                <div className ="grid-item"> {cities.picture} </div>
                                <div className ="grid-item"> {cities.tags} </div>
                                <div className ="grid-item">
                                    <Button
                                        className = "modify-Btn"
                                        variant ="white"
                                        text = "Modify"
                                    />
                                </div>
                                <div className ="grid-item"> 
                                    <Switch
                                        checked = {!cities.isEnable}
                                        onChange={ () =>
                                                console.log("allo")
                                        }
                                    />
                                </div>
                            </React.Fragment>
                        )}                           
                    </div>
               </div> 
            </React.Fragment>
        )
    }
}

export default Index

