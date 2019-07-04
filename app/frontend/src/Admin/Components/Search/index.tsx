import React, { Component } from 'react'
import { IProps , IState} from './types'
import arrowRight from '../../../Common/Utils/Media/arrowRight.svg'
import './styles.scss'

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

    Search = () => {
        const {handleSearchCity} = this.props
        const {inputValue} = this.state
        handleSearchCity(inputValue)
    }

    Button = () => {
        return (
          <button className="search-button" onClick={this.Search}>
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



