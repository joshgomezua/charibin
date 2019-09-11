import React, { Component } from 'react'
import { IProps, IState } from './types'
import people from '../../Utils/Media/people.svg'
import arrow from '../../../Common/Utils/Media/arrow.svg'
import arrowRight from '../../../Common/Utils/Media/arrowRight.svg'
import './styles.scss'
import { getTripsDepartureNames } from '../../../App/Utils/api';
// import { getTripsDepartureNames } from 'src/';
import { getToken } from '../../../Common/Utils/helpers';
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
    // debugger
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
    // debugger
    const tableau = departures.filter((name: string) => name.toLowerCase().includes(departure.toLowerCase()))
    tableau.length !== 0 ? this.setState({searchResults: tableau}) : this.setState({searchResults:["No trips found"]})
  
  }

  toggleListVisibility = (): void => {
    this.setState(prevState => ({ isListVisible: !prevState.isListVisible }))
  }

  handleSelectOption = (el: string): void => {
    const { setDeparture} = this.props
    this.setState({ isListVisible: false })
    if (el !== "No trips found " && el !== "No trips available") {
        this.setState({ inputValue: el })
        setDeparture!(el)
       
      }
     
  }

  renderOptions = (optionsArr: string[]): JSX.Element[] => {
    if (optionsArr.length === 0) {
        optionsArr.push("No trips available")
    }
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
selectedLngth=(departure: string[],inputValue:string)=>{
  let index=departure.indexOf(inputValue)
  if (index===-1) {
    return true;
}
else 
{   
  return false}
}

  handleFetchTripsNames = () => {
    const token = getToken()

   getTripsDepartureNames(token)
      .then(({ data }) => {
        // debugger
        this.setState({departures: data.sort((a: string,b: string) => a > b ? 1:-1)})
      })
      .catch(err => console.log(err.response))
  }

  // componentWillMount() {
  //   this.handleFetchTripsNames()
  // }

  componentDidMount() {
    this.handleFetchTripsNames()
  }

  selectDecrement = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    if (this.props.quantity.Adult > 0 && id === 'Adult' && this.state.passengers.Adult > 0) {
      this.props.setQuantity!({Adult:this.props.quantity.Adult - 1, Youth:this.props.quantity.Youth}) 
      this.setState({passengers:{Adult: --this.state.passengers.Adult,
        Youth: this.state.passengers.Youth
      }})
    } else if (this.props.quantity.Youth > 0 && id === 'Youth' && this.state.passengers.Youth > 0) {
      this.props.setQuantity!({Adult: this.props.quantity.Adult, Youth:this.props.quantity.Youth - 1}) 
      this.setState({passengers:{Adult: this.state.passengers.Adult,
        Youth: --this.state.passengers.Youth
      }})
    }
  }

  selectIncrement = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {

    e.preventDefault()
    if (this.props.quantity.Youth + this.props.quantity.Adult < 6 && id === 'Adult') {
      this.props.setQuantity!({Adult:this.props.quantity.Adult + 1, Youth:this.props.quantity.Youth})
      this.setState({passengers:{Adult: ++this.state.passengers.Adult,
        Youth: this.state.passengers.Youth
      }})
    } else if (this.props.quantity.Youth + this.props.quantity.Adult < 6 && id === 'Youth') {
      this.props.setQuantity!({Adult:this.props.quantity.Adult, Youth:this.props.quantity.Youth + 1})
      this.setState({passengers:{Adult: this.state.passengers.Adult,
        Youth: ++this.state.passengers.Youth
      }})
    }
  }

  Input = () => {
    const { inputValue, isListVisible, passengers} = this.state
    if ( inputValue !== this.props.initialValue as string ) {
      this.setState({inputValue: this.props.initialValue as string})
    }

    if (passengers !== this.props.quantity) {
      this.setState({passengers: this.props.quantity})
    }
    const dropdownElementClass = classnames('search-dropdown__element', {
      'search-dropdown__element--active': isListVisible
    })
    return (
      <div className="search-dropdown">
          <div className="search-input">
            <input type="text" value={inputValue} placeholder="What is your departure city?" onClick={this.toggleListVisibility} onChange={this.changeInput} />
            <label className={inputValue.length > 0 ? 'dirty' : ''}> 
              DEPARTURE CITY
            </label>
          </div>
          <div className={dropdownElementClass}>
            <this.DropDown/>
          </div>
      </div>
    )
  }

  DropDown = () => {
    const { searchResults, departures, isListVisible } = this.state 
    const dropdownList = classnames('search-dropdown__list', {
      'search-dropdown__list--active': isListVisible
    })
  
    return (
      <div className={dropdownList}>{!this.state.searchResults.length ? 
        this.renderOptions(departures) : this.renderOptions(searchResults)}
      </div>
    )
  }

  Button = () => {
    const {  departures,inputValue } = this.state 
    return (
      <button className="search-button" onClick={this.props.onSubmit} disabled={this.selectedLngth(departures,inputValue)}>
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
        <span>{`${quantity.Adult + quantity.Youth} passenger${quantity.Adult > 1 || quantity.Youth > 1 ? 's' : ''}`}</span>
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
        <this.Select />
        <this.Button />
      </div>
    )
  }
}
