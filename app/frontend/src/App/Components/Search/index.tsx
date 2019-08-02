import React, { Component } from 'react'
import { IProps, IState } from './types'
import people from '../../Utils/Media/people.svg'
import arrow from '../../../Common/Utils/Media/arrow.svg'
import arrowRight from '../../../Common/Utils/Media/arrowRight.svg'
import './styles.scss'
import { getTripsDepartureNames } from 'src/App/Utils/api';
import { getToken } from 'src/Common/Utils/helpers';
import classnames from 'classnames'

export default class Search extends Component<IProps, IState> {
  state = {
    inputValue: this.props.initialValue || '',
    buttons: false,
    passengers: {
      Adult: 1,
      Youth: 0
    },
    departures: [],
    searchResults: [],
    isListVisible: false
  }

  changeInput =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setDeparture } = this.props
    e.preventDefault()
    this.setState({ inputValue: e.target.value })
    this.setState({isListVisible: true})
    setDeparture!(e.target.value)

    this.handleSearch(e.target.value)
  }

  toggleButtons = () => {
    const { setQuantity } = this.props

    if (setQuantity) {
      this.setState((state: IState) => ({ buttons: !state.buttons }))
    }
  }

  handleSearch = (departure: string) => {
    const { departures } = this.state
    const tableau = departures.filter((name: string) => name.toLowerCase().includes(departure.toLowerCase()))
    
    this.setState({searchResults: tableau})
  }

  toggleListVisibility = (): void => {
    this.setState(prevState => ({ isListVisible: !prevState.isListVisible }))
  }

  handleSelectOption = (el: string): void => {
    const { setDeparture} = this.props
    this.setState({ isListVisible: false })
    this.setState({ inputValue: el })
    setDeparture!(el)
  }

  renderOptions = (optionsArr: string[]): JSX.Element[] => {
    return optionsArr.map(
      (el: string): JSX.Element => {
        return (
          <div
            key={el}
            onClick={() => this.handleSelectOption(el)}
            className="search__list-item">
            <p>{el}</p>
          </div>
        )
      }
    )
  }

  handleFetchTripsNames = () => {

    const token = getToken()

   getTripsDepartureNames(token)
      .then(({ data }) => {
        this.setState({departures: data.sort((a: string,b: string) => a > b ? 1:-1)})
      })
      .catch(err => console.log(err.response))
  }

  componentDidMount() {
    this.handleFetchTripsNames()
  }

  selectDecrement = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    if (this.props.quantity > 0 && id === 'Adult' && this.state.passengers.Adult > 0) {
      this.props.setQuantity!(this.props.quantity - 1) 
      this.setState({passengers:{Adult: --this.state.passengers.Adult,
        Youth: this.state.passengers.Youth
      }})
    } else if (this.props.quantity > 0 && id === 'Youth' && this.state.passengers.Youth > 0) {
      this.props.setQuantity!(this.props.quantity - 1) 
      this.setState({passengers:{Adult: this.state.passengers.Adult,
        Youth: --this.state.passengers.Youth
      }})
    }
  }

  selectIncrement = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    if (this.props.quantity < 6 && id === 'Adult') {
      this.props.setQuantity!(this.props.quantity + 1)
      this.setState({passengers:{Adult: ++this.state.passengers.Adult,
        Youth: this.state.passengers.Youth
      }})
    } else if (this.props.quantity < 6 && id === 'Youth') {
      this.props.setQuantity!(this.props.quantity + 1)
      this.setState({passengers:{Adult: this.state.passengers.Adult,
        Youth: ++this.state.passengers.Youth
      }})
    }
  }

  Input = () => {
    const { inputValue } = this.state
    return (
      <div className="search-input">
        <input type="text" value={inputValue} placeholder="What is your departure city?" onClick={this.toggleListVisibility} onChange={this.changeInput} />
        <label className={inputValue.length > 0 ? 'dirty' : ''}> 
          DEPARTURE CITY
        </label>
      </div>
    )
  }

  DropDown = () => {
    const { searchResults, departures, isListVisible } = this.state 
    const dropdownList = classnames('search__list', {
      'search__list--active': isListVisible
    })
    return (
      <div className={dropdownList}>{!this.state.searchResults.length ? 
        this.renderOptions(departures) : this.renderOptions(searchResults)}
      </div>
    )
  }

  Button = () => {
    return (
      <button className="search-button" onClick={this.props.onSubmit}>
        <div>
          <img src={arrowRight} alt="arrow" className="button-arrow" />
        </div>
      </button>
    )
  }

  Select = () => {
    const { buttons, passengers } = this.state
    const { quantity } = this.props

    return (
      <div className={`search-select ${buttons ? 'buttons' : ''}`}>
        <img src={people} alt="people" />
        <span>{`${quantity} passenger${quantity > 1 ? 's' : ''}`}</span>
        <button onClick={this.toggleButtons}>
          <img src={arrow} alt="change passanger quantity" />
        </button>
        {buttons && (
          <div>
            <li>
              <label>{`Adult${passengers.Adult > 1 ? 's' : ''}`}</label>
              <button onClick={(e) => this.selectDecrement(e, "Adult")}>-</button>
              <>{passengers.Adult}</>
              <button onClick={(e) => this.selectIncrement(e, "Adult")}>+</button>
            </li>
            
            <li>
              <label>{`Youth${passengers.Youth > 1 ? 's' : ''}`}</label>
              <button onClick={(e) => this.selectDecrement(e, "Youth")}>-</button>
              <>{passengers.Youth}</>
              <button onClick={(e) => this.selectIncrement(e, "Youth")}>+</button>
            </li>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="search">
        <this.Input />
        <this.DropDown/>
        <this.Select />
        <this.Button />
      </div>
    )
  }
}
