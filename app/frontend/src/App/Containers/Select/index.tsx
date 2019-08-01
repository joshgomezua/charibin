import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import MainBlock from '../../Components/MainBlock'
import Search from '../../Components/Search'
import Steps from '../../Components/Steps'
import Filters from '../../Components/Filters'
import Destination from '../../Components/Destination'
import SelectPanel from '../../Components/SelectPanel'

import {
  addSelected,
  removeSelected,
  selectIsMaxSelected,
  selectSelected,
  selectQuantity,
  setQuantity,
  updateSelected,
  clearSelected,
  selectDeparture,
  setDeparture
} from '../../../Common/Redux/Services/trips'
import withToast from '../../../Common/HOC/withToast'
import { saveToLS, getOwnerToken } from '../../../Common/Utils/helpers'
import * as API from '../../Utils/api'
import { IBookedData } from '../../Utils/apiTypes'
import { IStore } from '../../../Common/Redux/types'
import { STEP_IDS } from '../../Utils/constants'
import { RouteComponentProps } from 'react-router-dom'
import { ISelectedData, ITrip } from '../../Utils/appTypes'
import { IState, IProps, IFiltersChange, IBookedType } from './types'
import './styles.scss'
import Title from 'src/App/Components/Title'

const MAX = 5

class SelectContainer extends Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  readonly state: IState = {
    trips: [],
    filters: {
      start: undefined,
      end: undefined,
      min: 0,
      max: 300
    },
    page: 0,
    isLoading: true,
    isCalendarOpen: false,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const { quantity,departure } = this.props
    this.handleFetchTrips(this.state.page, 10, 0, 0, 0, 0, quantity,departure).then(
      () => {
        this.setState({ isLoading: false })
        if(this.state.trips.length >= 10){
          this.attachScrollEvent()
        } 
      }
    )
  }

  componentWillUnmount() {
    this.detachScrollEvent()
  }

  handleFetchTrips = (
    page: number,
    limit: number,
    priceStart: number,
    priceEnd: number,
    dateStart: number,
    dateEnd: number,
    qunatity: number,
    departure: string
  ) => {
    return API.getTrips(
      page,
      limit,
      priceStart,
      priceEnd,
      dateStart,
      dateEnd,
      qunatity,
      departure
    )
      .then(({ data }) => {
        console.log('data', data)
        this.setState((state: IState) => ({
          isLoading: false,
          trips: [...data],
        }))

        return data.length
      })
      .catch(err => console.log(err.response))
  }

  handleFetchInitialTripsWithFilter = () => {
    this.setState(
      {
        page: 0,
        isLoading: true,
        trips: []
      },
      () => {
        const {
          page,
          filters: { min, max, start, end }
        } = this.state
        const { quantity,departure } = this.props

        this.handleFetchTrips(
          page,
          1000,
          min,
          max,
          start !== undefined ? +moment(start).format('x') : 0,
          end !== undefined ? +moment(end).format('x') : 0,
          quantity,
          departure
        )
      }
    )
  }

  handleBookTrips = () => {
    const { selected, quantity, departure } = this.props
    const token = getOwnerToken()
    const bookedTrips = selected.map((selectedItem: ISelectedData) => {
      if (selectedItem.arrivalTicket && selectedItem.departureTicket) {
        return {
          arrivalTicket: selectedItem.arrivalTicket,
          departureTicket: selectedItem.departureTicket
        }
      } else {
        return {
          id: selectedItem.tripId,
          departure: selectedItem.departure.name,
          destination: selectedItem.destination.name,
          dateStart: selectedItem.dateStart,
          dateEnd: selectedItem.dateEnd
        }
      }
    })

    const data: IBookedData = {
      departure,
      quantity,
      trips: bookedTrips
    }

    if (token) {
      data.ownerHash = token
    }

    API.bookTrips(data)
      .then(res => {
        const bookedTrips = res.data.trips
        const selectedTrips = this.props.selected.map((item: ISelectedData) => {
          const filteredTrip: IBookedType = bookedTrips.find(
            (trip: IBookedType) => item.tripId === trip.trip
          )
          if (filteredTrip) {
            item.adultPrice = filteredTrip.cost
          }
          return item
        })

        saveToLS('owner', {
          billing: res.data.billing,
          createdAt: res.data.createdAt,
          token: res.data.owner,
          data: {
            departure,
            quantity,
            selected: selectedTrips
          }
        })

        this.props.updateSelected(selectedTrips)
        this.props.history.push('/destinations/deselect')
      })
      .catch(err => this.props.showError(err))
  }

  onSelect = (data: ISelectedData) => {
    if (!this.props.isMax) {
      this.props.addSelected(data)
    }
  }

  onDeselect = (tripId: string) => {
    this.props.removeSelected(tripId)
  }

  attachScrollEvent = () => {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  detachScrollEvent = () => {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  handleScroll = (e: MouseEvent) => {
    const {
      filters: { min, max, start, end }
    } = this.state
    const { quantity, departure } = this.props
    const treshold = 500
    const totalHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight
    const scrollTop = window.pageYOffset

    const offset = totalHeight - (scrollTop + windowHeight)
    if (offset < treshold) {
      this.detachScrollEvent()
      this.setState(
        (state: IState) => ({ page: state.page + 1 }),
        () => {
          this.handleFetchTrips(
            this.state.page,
            10,
            min,
            max,
            start !== undefined ? +moment(start).format('x') : 0,
            end !== undefined ? +moment(end).format('x') : 0,
            quantity,
            departure
          ).then((dataLength: number) => {
            if (dataLength > 0) {
              this.attachScrollEvent()
            }
          })
        }
      )
    }
  }

  handleFilterChange = (filters: IFiltersChange, callback?: () => void) => {
    const start = filters.start ? new Date(filters.start.getTime() - (filters.start.getTimezoneOffset() * 60000)) : undefined
    const end = filters.end ? new Date(filters.end.getTime() - (filters.end.getTimezoneOffset() * 60000)) : undefined

    filters.start = start
    filters.end = end

    this.setState(
      (state: IState) => ({
        filters: {
          ...state.filters,
          ...filters
        }
      })
      ,
      () => callback && callback()
    )
    
  }

  handleClearFilterDates = () => {
    const {
      filters: { start, end }
    } = this.state

    if (start && end) {
      this.setState(
        (state: IState) => ({
          filters: {
            ...state.filters,
            start: undefined,
            end: undefined
          }
        }),
        () => this.handleFetchInitialTripsWithFilter()
      )
    }
  }

  handleClearFilterPrice = () => {
    const {
      filters: { min, max }
    } = this.state

    if (min !== 0 || max !== 2000) {
      this.setState(
        (state: IState) => ({
          filters: {
            ...state.filters,
            min: 0,
            max: 2000
          }
        }),
        () => this.handleFetchInitialTripsWithFilter()
      )
    }
  }

  calendarOpened = () => this.setState({ isCalendarOpen: true })

  calendarClosed = () => this.setState({ isCalendarOpen: false })

  render() {
    const { isCalendarOpen, isLoading, trips, filters } = this.state
    const { isMax, quantity, selected,departure } = this.props
    

    return (
      <section className={`select-cnt ${isCalendarOpen ? 'calendar' : ''}`}>
        <MainBlock className="select-cnt-block">
          <Search
            departure={departure}
            setDeparture={this.props.setDeparture}
            setQuantity={this.props.setQuantity}
            quantity={quantity}
            onSubmit={()=>{ console.log("on submit")
               this.handleFetchTrips(this.state.page, 10, 0, 0, 0, 0, quantity,departure).then(
              () => {
                this.setState({ isLoading: false })
                if(this.state.trips.length >= 10){
                  this.attachScrollEvent()
                }
              }
            )}}
            initialValue={departure}
          />
          <Steps />
        </MainBlock>
        <section className="select-cnt-inner">
          <section className="select-cnt-inner-filters">
            <Filters
              onChange={this.handleFilterChange}
              fetchTrips={this.handleFetchInitialTripsWithFilter}
              clearDates={this.handleClearFilterDates}
              clearPrice={this.handleClearFilterPrice}
              filters={filters}
            />
          </section>
          <section className="select-cnt-inner-destinations">
            <Title
              className="select-cnt-inner-title"
              text={`We found ${trips.length} destinations for you`}
              selected={[`${trips.length} destinations`]}
            />
            <div className="select-cnt-inner-destination-list">
              {isLoading ? <div>Loading..</div> : null}
              {!isLoading && trips.length === 0 ? (
                <div>No ticket found</div>
              ) : null}

              {!isLoading &&
                trips.length > 0 &&
                trips.map((trip: ITrip, index) => {
                  trip.type = 'trip'
                  trip.adultPrice += trip.adultPrice 
                  const filtered = this.props.selected.filter(
                    (item: ISelectedData) => {
                      if (item.tripId === trip._id) {
                        ;(trip.dateStart = item.dateStart),
                          (trip.dateEnd = item.dateEnd)

                        return true
                      }

                      return false
                    }
                  )
                  const isSelected = filtered.length > 0
                  return (
                  
                    <Destination
                      key={index}
                      index={trip._id}
                      data={trip}
                      quantity={quantity}
                      selected={isSelected}
                      onSelect={this.onSelect}
                      onDeselect={this.onDeselect}
                      isMax={isMax}
                      onCalendarOpen={this.calendarOpened}
                      onCalendarClose={this.calendarClosed}
                    />)
                })}
            </div>
          </section>
        </section>
        <SelectPanel
          step={STEP_IDS.SELECT}
          selected={selected}
          isMax={isMax}
          max={MAX}
          onNext={this.handleBookTrips}
        />
      </section>
    )
  }
}

const mapStateToProps = (state: IStore) => ({
  isMax: selectIsMaxSelected(state),
  quantity: selectQuantity(state),
  selected: selectSelected(state),
  departure: selectDeparture(state)
})

export default connect(
  mapStateToProps,
  { addSelected, removeSelected, updateSelected, clearSelected, setQuantity,
    setDeparture}
)(withToast(SelectContainer))
