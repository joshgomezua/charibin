import React, { Component } from 'react'
import './index.css'

export class index extends Component {
    state = {
        cities: [
            {
                name:'London',
                country:'England',
                picture:'Lala',
                tags:'city',
                isEnable:false,
                modify:false,
            },

            {
                name:'Berlin',
                country:'Germany',
                picture:'L',
                tags:'city',
                isEnable:false,
                modify:false,
            },

            {
                name:'Paris',
                country:'France',
                picture:'La',
                tags:'city',
                isEnable:false,
                modify:false,
            },
        ]
    }

    render() {
        return (
            <React.Fragment>
               <div>
                    <div className = 'grid-container-header'>
                            <div className= 'gridItemHeader'>Destination&depature database</div>
                            <div className = 'gridItemHeader'>Sponteous</div>
                    </div>
                    <div className="search-box">
                        <input className ="search-txt" type ="text" placeholder = "Type to search"/>
                        {/* <button className="search-btn">search</button> */}
                    </div>
                    <div className ="grid-container" >
                        <div className ="grid-item" >City</div>
                        <div className ="grid-item" >Country</div>
                        <div className ="grid-item" >Photo</div>
                        <div className ="grid-item" >Key Words</div>
                        <div className ="grid-item" >Modify</div> 
                        <div className ="grid-item" >Enable</div>
                        {this.state.cities.map(cities => 
                            <React.Fragment>
                                <div className ="grid-item"> {cities.name} </div>
                                <div className ="grid-item"> {cities.country} </div> 
                                <div className ="grid-item"> {cities.picture} </div>
                                <div className ="grid-item"> {cities.tags} </div>
                                <div className ="grid-item">
                                    <button disabled = {!cities.modify}> Modify </button>
                                </div>
                                <div className ="grid-item"> {cities.isEnable}
                                    <button disabled = {!cities.isEnable}> Enable </button>
                                </div>
                            </React.Fragment>
                        )}                           
                    </div>
               </div> 
            </React.Fragment>
        )
    }
}

export default index

