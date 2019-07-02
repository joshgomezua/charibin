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
  updateSelected,
  clearSelected
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
    isCalendarOpen: false
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const { quantity } = this.props
    console.log('quantity', quantity)
    this.handleFetchTrips(this.state.page, 10, 0, 0, 0, 0, quantity).then(
      () => {
        this.setState({ isLoading: false })
        this.attachScrollEvent()
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
    qunatity: number
  ) => {
    console.log('handleFetchTrips')
    return API.getTrips(
      page,
      limit,
      priceStart,
      priceEnd,
      dateStart,
      dateEnd,
      qunatity
    )
      .then(({ data }) => {
        this.setState((state: IState) => ({
          isLoading: false,
          trips: [...state.trips, ...data]
        }))

        return data.length
      })
      .catch(err => console.log(err.response))
  }

  handleFetchInitialTripsWithFilter = () => {
    console.log("handleFetchInitialTripsWithFilter")
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
        const { quantity } = this.props

        this.handleFetchTrips(
          page,
          1000,
          min,
          max,
          start !== undefined ? +moment(start).format('x') : 0,
          end !== undefined ? +moment(end).format('x') : 0,
          quantity
        )
      }
    )
  }

  handleBookTrips = () => {
    console.log('handleBookTrips')
    const { selected, quantity } = this.props
    console.log('selected', selected)
    console.log('quantity', quantity)
    const token = getOwnerToken()
    const bookedTrips = selected.map((selectedItem: ISelectedData) => {
      if (selectedItem.departureTicket && selectedItem.arrivalTicket) {
        return {
          departure: selectedItem.departure,
          destination: selectedItem.departureTicket
        }
      } else {
        return {
          id: selectedItem.tripId,
          departure: selectedItem.departure,
          destination: selectedItem.destination,
          dateStart: selectedItem.dateStart,
          dateEnd: selectedItem.dateEnd
        }
      }
    })
    console.log('bookedTrips', bookedTrips)

    const data: IBookedData = {
      quantity,
      trips: bookedTrips
    }

    if (token) {
      data.ownerHash = token
    }

    API.bookTrips(data)
      .then(res => {
        const bookedTrips = res.data.trips
        console.log('bookedTrips in API call of Select', bookedTrips)
        const selectedTrips = this.props.selected.map((item: ISelectedData) => {
          const filteredTrip: IBookedType = bookedTrips.find(
            (trip: IBookedType) => item.tripId === trip.trip
          )
          console.log('filteredTrip', filteredTrip)
          if (filteredTrip) {
            item.price = filteredTrip.cost
          }
          return item
        })
        console.log('selectedTrips', selectedTrips)

        saveToLS('owner', {
          billing: res.data.billing,
          createdAt: res.data.createdAt,
          token: res.data.owner,
          data: {
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
    const { quantity } = this.props
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
            quantity
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
    console.log("handleFilterChange")
    console.log("filters", filters)
    console.log("state before", this.state)
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
    console.log("handleClearFilterDates")
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
    const { isMax, quantity, selected } = this.props

    return (
      <section className={`select-cnt ${isCalendarOpen ? 'calendar' : ''}`}>
        <MainBlock className="select-cnt-block">
          <Search
            quantity={quantity}
            onSubmit={() => {}}
            initialValue="London"
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
                <div>No ticket find</div>
              ) : null}

              {!isLoading &&
                trips.length > 0 &&
                trips.map((trip: ITrip, index) => {
                  console.log('Itrip', trip)
                  trip.type = 'trip'
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
                  console.log('destination data', trip)
                  return trip.tickets.length > 0 ? (
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
                    />
                  ) : null
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
  selected: selectSelected(state)
})

export default connect(
  mapStateToProps,
  { addSelected, removeSelected, updateSelected, clearSelected }
)(withToast(SelectContainer))
