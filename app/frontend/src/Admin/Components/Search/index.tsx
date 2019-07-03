import React, { Component } from 'react'
import { IProps , IState} from './types'
import arrowRight from '../../../Common/Utils/Media/arrowRight.svg'
import './styles.scss'
import { ICity } from 'src/Admin/Utils/adminTypes';

class Search extends Component<IProps,IState> {
    state = {
        inputValue: '' ,
        filteredData: []
    }

    UpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        this.setState({ inputValue: e.target.value })
    }

    Input = () => {
        const {inputValue} = this.state
        const {placeholder} = this.props
        return (
            <div className="search-input">
              <input type="text" placeholder={placeholder} value={inputValue} onChange={this.UpdateInput} />
            </div>
        )
    }

    onClick = () => {
        const {data,handleUpdateCities} = this.props
        const {inputValue} = this.state

        const tableau: ICity[] = data.filter((city: ICity) => {
            const name = city.name.toLowerCase()
            const country = (city.country as string).toLowerCase()
            if (name.includes(inputValue) || country.includes(inputValue))
                {
                    return city
                }
                return
            })
        
        handleUpdateCities(tableau)
        
    }

    Button = () => {
        return (
          <button className="search-button" onClick={this.onClick}>
            <div>
              <img src={arrowRight} alt="arrow" className="button-arrow" />
            </div>
          </button>
        )
    }

    render() {
        return (
            <div className="search">
                <this.Input/>
                <this.Button/>
            </div>
        )
    }
}

export default Search



