import React from 'react'

import TripHeader from '../../Components/TripHeader'
import ExpandableTable from '../../Components/ExpandableTable'
import Modal from '../../Components/Modal'
import TripModal from '../../Components/TripModal'
import DeleteModal from '../../Components/DeleteModal'
import TimeSelectionModal from '../../Components/TimeSelectionModal'
import ScheduleModal from 'src/Admin/Components/ScheduleModal';

import withToast from '../../../Common/HOC/withToast'
import { RouteComponentProps } from 'react-router-dom'
import { MODAL_TYPE, ITrip, ICity } from '../../Utils/adminTypes'
import { getToken } from '../../../Common/Utils/helpers'
import {
  ADMIN_ROUTING,
  ERRORS,
  SUCCESS,
  DEFAULT_TRIP_DATA,
  DEFAULT_TRIP_SCHEDULE,
  DEFAULT_CITY_DATA,
} from '../../Utils/constants'
import {
  getTrips,
  addTrip,
  deleteTrip,
  getSingleTrip,
  updateTrip,
  updateTimeSelection,
  deleteScheduledTrip,
  getSingleScheduledTrip,
  addSchedule,
  updateSchedule,
  getOpposites,
  getCities,
} from '../../Utils/api'
import { IState, IProps, INewData, IEditTimeSchedule, INewSchedule, IBulkChange } from './types'
import { columns } from './columns'
import { rangeColumns } from './rangeColumns';
import { SortingRule, ControlledStateOverrideProps } from 'react-table';
import BulkChangeModal from 'src/Admin/Components/BulkChangeModal';

class TripsContainer extends React.Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  private modal = React.createRef<Modal>()

  readonly state: IState = {
    trips: [], 
    oppositeTrips: [],
    filtersFrom: [],
    filtersTo: [],
    selection: [],
    selectedCheckbox: {},
    results: [],
    availableCities: [],
    total: 0,
    selectAll: 0,
    currentPage: 0,
    isLoading: true,
    isModalLoading: false,
    editData: DEFAULT_TRIP_DATA,
    editSchedule: DEFAULT_TRIP_SCHEDULE,
    modal: {
      id: '',
      type: null,
      heading: ''
    }
  }
  
  handleOpenModal = (type: MODAL_TYPE, heading: string, id: string = '') => {
    this.setState({ modal: { type, heading, id } }, () => {
      this.modal.current!.open()
    })
  }

  handleCloseModal = () => {
    this.setState({ modal: { type: null, heading: '', id: '' } }, () => {
      this.modal.current!.close()
    })
  }

  handleOpenDeleteTripModal = (id: string) => {
    this.handleOpenModal(MODAL_TYPE.DELETE_TRIP, 'Delete trip', id)
  }

  handleOpenTimeSelectionModal = (id: string) => {
    this.handleOpenModal(MODAL_TYPE.EDIT_TIME_SELECTION, 'Edit time selection price settings', id)
    this.handleFetchTripData(id)
  }

  handleOpenEditModal = (id: string) => {
    this.handleOpenModal(MODAL_TYPE.EDIT_TRIP, 'Edit trip', id)
    this.handleFetchTripData(id)
  }

  handleOpenScheduleModal = (id: string) => {
    this.handleFetchTripData(id)
    this.handleOpenModal(MODAL_TYPE.ADD_SCHEDULE, 'Add schedule', id)
  }

  handleOpenEditScheduleModal = (id: string) => {
    this.handleFetchTripSchedule(id)
    this.handleOpenModal(MODAL_TYPE.EDIT_SCHEDULE, 'Edit schedule', id)
  }

  handleOpenTimeSelectionScheduleModal = (id: string) => {
    this.handleFetchTripSchedule(id)
    this.handleOpenModal(MODAL_TYPE.EDIT_TIME_SELECTION_SCHEDULE, 'Edit time selection price settings of schedule', id)
  }

  handleOpenDeleteScheduleModal = (id: string) => {
    this.handleOpenModal(MODAL_TYPE.DELETE_SCHEDULE, 'Delete schedule', id)
  }

  handleFetchTripData = (id: string) => {
    const token = getToken()

    if (token) {
      getSingleTrip(id, token)
        .then(res => {
          this.setState({ editData: res.data })
        })
        .catch(err => {
          this.modal.current!.close()
          this.props.showError(err)
        })
    }
  }

  handleFetchTripSchedule = (id: string) => {
    const token = getToken()
    if (token) {
      getSingleScheduledTrip(id, token)
        .then(res => {
          this.setState({ editSchedule: res.data })
        })
        .catch(err => {
          this.modal.current!.close()
          this.props.showError(err)
        })
    }
  }

  handleFetchItems = (page: number, limit: number, sort?: SortingRule) => {
    const token = getToken()

    if (token) {
      getTrips(page, limit, token, sort)
        .then(res =>{
          this.setState({
            isLoading: false,
            trips: res.data.results,
            total: res.data.status.total
          })
        }
        )
        .catch(err => {
          this.props.showError(err, ERRORS.TRIP_FETCH)
        })

      getTrips(0, 1000000, token, sort).then(res => {
        this.setState({results: res.data.results})
      }).catch(err => {
        this.props.showError(err, ERRORS.TRIP_FETCH)
      }) 

      getCities(0, 10000, token).then(res => {
        this.setState({availableCities: res.data.results})
      }).catch(err => {
        this.props.showError(err, ERRORS.CITY_FETCH)
      })
    }
  }

  handleFetchTableData = ({ page, sorted }: ControlledStateOverrideProps) => {
    this.setState({ currentPage: page! })
    if (sorted) {
      this.handleFetchItems(page!, 10, sorted[0])
    } else {
      this.handleFetchItems(page!, 10)
    }
  }

  handleBidirectionalChange = async (data: IEditTimeSchedule) => {
    const token = getToken();
    console.log(this.state.editData._id)
    if( token ){
      await getOpposites(this.state.editData._id, token)
        .then(res => {
          this.setState({
            oppositeTrips: res.data
          })
          console.log(this.state.oppositeTrips)
          for(let index: number = 0; index < this.state.oppositeTrips.length; index++){
            updateTimeSelection(this.state.oppositeTrips[index]._id, data, token)
          }
        })
        .catch(err => {
          this.props.showError(err, ERRORS.TRIP_FETCH)
        });
    } 
  }

  handleDeleteTrip = () => {
    const {
      modal: { id },
      currentPage
    } = this.state
    const token = getToken()

    if (token) {
      deleteTrip(id, token)
        .then(() => {
          this.handleFetchItems(currentPage, 10)
          this.handleCloseModal()
          this.props.showSuccess(SUCCESS.TRIP_DELETE)
          this.handleRestartModalType()
        })
        .catch(err => {
          this.handleCloseModal()
          this.props.showError(err, ERRORS.TRIP_DELETE)
        });
    }
  }

  handleAddTrip = (data: INewData) => {
    const token = getToken()
    const { currentPage } = this.state

    const destinationCity: ICity = this.state.availableCities.find(city => {return city._id == data.destination._id}) || DEFAULT_CITY_DATA
    const departureCity: ICity = this.state.availableCities.find(city => {return city._id == data.departure._id}) || DEFAULT_CITY_DATA

    const newTrip: INewData = {
      ...data,
      destination: destinationCity,
      departure: departureCity,
      timeSelection: {
        defaultPrice: data.timeSelection.defaultPrice,
        _0to6AM: data.timeSelection.defaultPrice,
        _6to8AM: data.timeSelection.defaultPrice,
        _8to10AM: data.timeSelection.defaultPrice,
        _10to12PM: data.timeSelection.defaultPrice,
        _12to2PM: data.timeSelection.defaultPrice,
        _2to4PM: data.timeSelection.defaultPrice,
        _4to6PM: data.timeSelection.defaultPrice,
        _6to8PM: data.timeSelection.defaultPrice,
        _8to10PM: data.timeSelection.defaultPrice,
        _10to12AM: data.timeSelection.defaultPrice,
      },
      isFromAPI: false,
    }

    this.setState({ isModalLoading: true })
    return addTrip(newTrip, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.TRIP_ADD)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.TRIP_ADD)

        return Promise.reject()
      })
  }

  handleEditTrip = (data: INewData) => {
    const token = getToken()
    const { currentPage } = this.state
    const {
      modal: { id }
    } = this.state
    
    const editedTrip: INewData = {
      ...data,
      timeSelection: {
        defaultPrice: data.timeSelection.defaultPrice,
        _0to6AM: data.timeSelection.defaultPrice,
        _6to8AM: data.timeSelection.defaultPrice,
        _8to10AM: data.timeSelection.defaultPrice,
        _10to12PM: data.timeSelection.defaultPrice,
        _12to2PM: data.timeSelection.defaultPrice,
        _2to4PM: data.timeSelection.defaultPrice,
        _4to6PM: data.timeSelection.defaultPrice,
        _6to8PM: data.timeSelection.defaultPrice,
        _8to10PM: data.timeSelection.defaultPrice,
        _10to12AM: data.timeSelection.defaultPrice,
      }
    }

    this.setState({ isModalLoading: true })
    return updateTrip(id, editedTrip, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.TRIP_EDIT)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.TRIP_EDIT)

        return Promise.reject()
      })
  }

  handleEditTimeSelection = (data: IEditTimeSchedule) => {
    const token = getToken()
    const { currentPage } = this.state
    const {
      modal: { id }
    } = this.state

    const newTimeSelection: IEditTimeSchedule = this.checkNewDefaultTimeSelection(data)

    if(data.bidirectionalChange) {
      this.handleBidirectionalChange(newTimeSelection)
    }
    
    this.setState({ isModalLoading: true })
    return updateTimeSelection(id, newTimeSelection, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.TRIP_EDIT)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.TRIP_EDIT)

        return Promise.reject()
      })
  }

  handleEditScheduleTimeSelection = (data: IEditTimeSchedule) => {
    const token = getToken()
    const { currentPage } = this.state
    const {
      modal: { id }
    } = this.state

    const updatedSchedule: INewSchedule = {
      _id: this.state.editSchedule._id,
      active: this.state.editSchedule.active,
      deselectionPrice: this.state.editSchedule.deselectionPrice,
      timeSelection: {
        defaultPrice: this.state.editSchedule.timeSelection.defaultPrice,
        _0to6AM: data.timeSelection._0to6AM,
        _6to8AM: data.timeSelection._6to8AM,
        _8to10AM: data.timeSelection._8to10AM,
        _10to12PM: data.timeSelection._10to12PM,
        _12to2PM: data.timeSelection._12to2PM,
        _2to4PM: data.timeSelection._2to4PM,
        _4to6PM: data.timeSelection._4to6PM,
        _6to8PM: data.timeSelection._6to8PM,
        _8to10PM: data.timeSelection._8to10PM,
        _10to12AM: data.timeSelection._10to12AM,
      },
      date: {
        start: this.state.editSchedule.date.start,
        end: this.state.editSchedule.date.end
      },
      discount: this.state.editSchedule.discount,
      duration: this.state.editSchedule.duration,
      price: this.state.editSchedule.price,
    }
    
    this.setState({ isModalLoading: true })
    return updateSchedule(id, updatedSchedule, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.TRIP_EDIT)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.TRIP_EDIT)

        return Promise.reject()
      })
  }

  handleAddSchedule = (data: INewSchedule) => {
    const token = getToken()
    const { currentPage } = this.state

    this.handleDuplicateSchedule(data, this.state.editData)

    const newSchedule: INewSchedule = {
      ...data,
      timeSelection: {
        defaultPrice: data.timeSelection.defaultPrice,
        _0to6AM: data.timeSelection.defaultPrice,
        _6to8AM: data.timeSelection.defaultPrice,
        _8to10AM: data.timeSelection.defaultPrice,
        _10to12PM: data.timeSelection.defaultPrice,
        _12to2PM: data.timeSelection.defaultPrice,
        _2to4PM: data.timeSelection.defaultPrice,
        _4to6PM: data.timeSelection.defaultPrice,
        _6to8PM: data.timeSelection.defaultPrice,
        _8to10PM: data.timeSelection.defaultPrice,
        _10to12AM: data.timeSelection.defaultPrice,
      },
      trip: this.state.editData._id,
    }
    this.setState({ isModalLoading: true })
    return addSchedule(newSchedule, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.DEFAULT)
        this.handleRestartModalType()
        
        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.DEFAULT)

        return Promise.reject()
      })
  }

  handleEditSchedule = (data: INewSchedule) => {
    const token = getToken()
    const { currentPage } = this.state
    const {
      modal: { id }
    } = this.state

    const editedSchedule: INewSchedule = {
      ...data,
      timeSelection: {
        defaultPrice: data.timeSelection.defaultPrice,
        _0to6AM: this.state.editSchedule.timeSelection.defaultPrice,
        _6to8AM: this.state.editSchedule.timeSelection.defaultPrice,
        _8to10AM: this.state.editSchedule.timeSelection.defaultPrice,
        _10to12PM: this.state.editSchedule.timeSelection.defaultPrice,
        _12to2PM: this.state.editSchedule.timeSelection.defaultPrice,
        _2to4PM: this.state.editSchedule.timeSelection.defaultPrice,
        _4to6PM: this.state.editSchedule.timeSelection.defaultPrice,
        _6to8PM: this.state.editSchedule.timeSelection.defaultPrice,
        _8to10PM: this.state.editSchedule.timeSelection.defaultPrice,
        _10to12AM: this.state.editSchedule.timeSelection.defaultPrice,
      }
    }

    this.setState({ isModalLoading: true })
    return updateSchedule(id, editedSchedule, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.TRIP_EDIT)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.TRIP_EDIT)

        return Promise.reject()
      })
  }

  handleDeleteSchedule = () => {
    const {
      modal: { id },
      currentPage
    } = this.state
    const token = getToken()

    if (token) {
      deleteScheduledTrip(id, token)
        .then(() => {
          this.handleFetchItems(currentPage, 10)
          this.handleCloseModal()
          this.props.showSuccess(SUCCESS.DEFAULT)
          this.handleRestartModalType()
        })
        .catch(err => {
          this.handleCloseModal()
          this.props.showError(err, ERRORS.DEFAULT)
        })
    }
  }

  handleBulkChange = async (data: IBulkChange) => {
    const token = getToken()
    const { currentPage } = this.state
   
    for(let index: number = 0; index < this.state.selection.length; index++){
      let trip: any;
      await getSingleTrip(this.state.selection[index].id, token).then(
        res => trip = res.data
      )

      let updatedTrip: INewData = this.checkforChangedData(data, trip)

      this.setState({ isModalLoading: true })
      updateTrip(this.state.selection[index].id, updatedTrip, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.handleRestartModalType()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.BULK_EDIT)

      })
    }
    
    this.props.showSuccess(SUCCESS.BULK_EDIT)
    return Promise.reject()
  }

  checkforChangedData = (data: IBulkChange, trip: any) => {
    const activeStatus: boolean | undefined = this.assignBoolean(data.active)
    const fakeStatus: boolean | undefined  = this.assignBoolean(data.fake)
    let updatedTrip: INewData = trip;
    
    if(data.price > 0){
      updatedTrip.price = data.price
    }
    if(data.discount > 0){
      updatedTrip.discount = data.discount
    }
    if(data.timeSelection.defaultPrice > 0){
      updatedTrip.timeSelection.defaultPrice = data.timeSelection.defaultPrice
    }
    if(data.deselectionPrice > 0){
      updatedTrip.deselectionPrice = data.deselectionPrice
    }
    if(data.duration > 0){
      updatedTrip.duration = data.duration
    }
    if(activeStatus != undefined){
      updatedTrip.active = activeStatus
    }
    if(fakeStatus != undefined){
      updatedTrip.fake = fakeStatus
    }
  
    return updatedTrip
  }

  handleRedirectToCreateTicket = (trip: { _id: string; departure: string; destination: string }) => {
    this.props.history.push({
      pathname: `${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.TICKETS}`,
      state: { trip }
    })
  }

  handleRestartModalType = () => {
    this.setState({
      isModalLoading: false,
      modal: {
        id: '',
        type: null,
        heading: ''
      }
    })
  }

  handleDuplicateSchedule = (data: INewSchedule, parentTrip: any) => {
    if(parentTrip.scheduledTrips != undefined){
      let startDate: Date = new Date(data.date.start)
      let endDate: Date = new Date(data.date.end)

      for(let index: number = 0; index < parentTrip.scheduledTrips.length; index++) {
        if(this.compareDate(startDate, endDate, parentTrip.scheduledTrips[index]) && parentTrip.scheduledTrips[index].active == true ) {
          const deactivatedSchedule: INewSchedule = {
            ...parentTrip.scheduledTrips[index],
            active: false
          }
          updateSchedule(parentTrip.scheduledTrips[index]._id, deactivatedSchedule, getToken())
        }
      }
    }
  }

  checkNewDefaultTimeSelection = (data: IEditTimeSchedule) => {
    let newDefault: boolean = true;
    const samplePrice: number = data.timeSelection._0to6AM

    for(let price in data.timeSelection){
      if(data.timeSelection[price] != samplePrice && price != 'defaultPrice'){
        newDefault = false;
      }
    }

    if(newDefault){
      const newData: IEditTimeSchedule = {
        ...data,
        timeSelection: {
          defaultPrice: samplePrice,
          _0to6AM: samplePrice,
          _6to8AM: samplePrice,
          _8to10AM: samplePrice,
          _10to12PM: samplePrice,
          _12to2PM: samplePrice,
          _2to4PM: samplePrice,
          _4to6PM: samplePrice,
          _6to8PM: samplePrice,
          _8to10PM: samplePrice,
          _10to12AM: samplePrice,
        }
      }
      return newData
    }
    return data
  }

  assignBoolean = (option: string) => {
    switch(option) {
      case 'No change':
        return undefined
      case 'All fake':
        return true
      case 'None fake':
        return false
      case 'All active':
        return true
      case 'None active':
        return false
    }
    return undefined
  }

  filterTrips = (trips: ITrip[], results: ITrip[], filtersFrom: string[], filtersTo: string[]) => {
    if(filtersFrom.length) {  
      let filteredFromTrips: ITrip[] = [];
      for(let tripIndex: number = 0; tripIndex < results.length; tripIndex++){
        for(let index: number = 0; index < filtersFrom.length; index++){
          if(results[tripIndex].departure.name.toLowerCase() == filtersFrom[index].toLowerCase()) {
            filteredFromTrips.push(results[tripIndex]);
          }
        }
      }
      if(filtersTo.length) {
        let filteredTrips: ITrip[] = [];
        for(let tripIndex: number = 0; tripIndex < filteredFromTrips.length; tripIndex++){
          for(let index: number = 0; index < filtersTo.length; index++){
            if(filteredFromTrips[tripIndex].destination.name.toLowerCase() == filtersTo[index].toLowerCase()) {
                filteredTrips.push(filteredFromTrips[tripIndex]);
            }
          }
        }
        return filteredTrips
      } else { return filteredFromTrips }

    } else if ( filtersTo.length ) { 
        let filteredToTrips: ITrip[] = [];
        for(let tripIndex: number = 0; tripIndex < results.length; tripIndex++){
          for(let index: number = 0; index < filtersTo.length; index++){
            if(results[tripIndex].destination.name.toLowerCase() == filtersTo[index].toLowerCase()) {
              filteredToTrips.push(results[tripIndex]);
            }
          }
        }
        return filteredToTrips
      }
    return trips
  }

  compareDate = (startDate: Date, endDate: Date, trip: any) => {
    const existingStartDate: Date = new Date(trip.date.start)
    const existingEndDate: Date = new Date(trip.date.end)
    if(startDate.getFullYear() == existingStartDate.getFullYear() && endDate.getFullYear() == existingEndDate.getFullYear()){
      if(startDate.getMonth() == existingStartDate.getMonth() && endDate.getMonth() == existingEndDate.getMonth()){
        if(startDate.getDate() == existingStartDate.getDate() && endDate.getDate() == existingEndDate.getDate()){
          return true
        }
        return false
      }
      return false
    }
    return false
  }

  toggleSelection = (id: string) => {
    let tripFound: boolean = false
    let checkboxSelection = Object.assign({}, this.state.selectedCheckbox)
    let newSelected: any[] = this.state.selection

    for(let trip of newSelected){
      if(trip.id === id){
        trip.selected = !trip.selected
        tripFound = true
      }
    }

    if(!tripFound){
      const trip = {
        id: id,
        selected: true
      }
      newSelected.push(trip)
    }

    checkboxSelection[id] = !checkboxSelection[id]

    this.setState({
      selectedCheckbox: checkboxSelection,
      selection: newSelected,
      selectAll: 2
    })
  }

  toggleSelectAll = () => {
    let checkboxSelection = {}
    let newSelected: any[] = []

    if(this.state.selectAll === 0){
      this.state.results.forEach(x => {
        if(!x.isFromAPI){
          const trip = {
            id: x._id,
            selected: true
          }
          newSelected.push(trip)
          checkboxSelection[x._id] = true
        }   
      })
    }

    this.setState({
      selectedCheckbox: checkboxSelection,
      selection: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    })
  }
    
  render() {
    let {trips, total, selectedCheckbox} = this.state
    const {
      filtersFrom,
      filtersTo,
      results,
      selectAll,
      availableCities,
      isLoading,
      isModalLoading,
      editData,
      editSchedule,
      modal: { type: modalType, heading: modalHeading }
    } = this.state

    const usedDeparture: string[] = [];
    const usedDestination: string[] = [];

    for(let index: number = 0; index < results.length; index++ ){
      if(usedDeparture.includes(results[index].departure.name) == false){
        usedDeparture.push(results[index].departure.name)
      }
      if(usedDestination.includes(results[index].destination.name) == false){
        usedDestination.push(results[index].destination.name)
      }
    }

    if(filtersFrom.length || filtersTo.length){
      trips = this.filterTrips(trips, results, filtersFrom, filtersTo)
      total = trips.length
    }

    return (
      <div className="spon-container">
        <TripHeader
          title="Routes & Prices"
          handleOpenModal={this.handleOpenModal}
          filterFrom={filtersFrom}
          filterTo={filtersTo}
          availableDepartures={usedDeparture}
          availableDestinations={usedDestination}
          changeFilterFrom={(e) => this.setState({filtersFrom: e})}
          changeFilterTo={(e) => this.setState({filtersTo: e})}
        />
        <ExpandableTable
          data={trips.filter((trip)=> {
            if (trip.destination.isEnabled) {
              return trip
            }
            return
          })}
          handleFetchData={this.handleFetchTableData}
          columns={columns(
            selectedCheckbox,
            selectAll,
            this.handleOpenDeleteTripModal,
            this.handleOpenEditModal,
            this.handleOpenTimeSelectionModal,
            this.handleRedirectToCreateTicket,
            this.toggleSelectAll,
            this.toggleSelection
          )}
          loading={isLoading}
          pages={Math.ceil(total / 10)}
          subComponentClassName={"rangeTripTable"}
          handleOpenModal={this.handleOpenScheduleModal}
          detailsColumns={rangeColumns(
            this.handleOpenDeleteScheduleModal,
            this.handleOpenEditScheduleModal,
            this.handleOpenTimeSelectionScheduleModal,
            this.handleRedirectToCreateTicket
          )}
        />
        <Modal
          ref={this.modal}
          title={modalHeading}
          restartModalType={this.handleRestartModalType}>
          {modalType === MODAL_TYPE.ADD_TRIP ? (
            <TripModal
              isLoading={isModalLoading}
              closeModal={this.handleCloseModal}
              handleSubmit={this.handleAddTrip}
              availableCities={availableCities}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_TRIP ? (
            <TripModal
              isLoading={isModalLoading}
              editDate={editData}
              closeModal={this.handleCloseModal}
              handleEditTrip={this.handleEditTrip}
              availableCities={availableCities}
            />
          ) : null}

          {modalType === MODAL_TYPE.DELETE_TRIP ? (
            <DeleteModal
              closeModal={this.handleCloseModal}
              deleteItem={this.handleDeleteTrip}
              text="trip will be deleted"
            />
          ) : null}

          {modalType === MODAL_TYPE.DELETE_SCHEDULE ? (
            <DeleteModal
              closeModal={this.handleCloseModal}
              deleteItem={this.handleDeleteSchedule}
              text="schedule will be deleted"
            />
          ) : null}

          {modalType === MODAL_TYPE.ADD_SCHEDULE ? (
            <ScheduleModal
              isLoading={isModalLoading}
              closeModal={this.handleCloseModal}
              handleSubmit={this.handleAddSchedule}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_SCHEDULE ? (
            <ScheduleModal
              isLoading={isModalLoading}
              editDate={editSchedule}
              closeModal={this.handleCloseModal}
              handleEditSchedule={this.handleEditSchedule}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_TIME_SELECTION ? (
            <TimeSelectionModal
              isLoading={isModalLoading}
              isASchedule={false}
              editSchedule={editData}
              closeModal={this.handleCloseModal}
              handleEditTimeSelection={this.handleEditTimeSelection}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_TIME_SELECTION_SCHEDULE ? (
            <TimeSelectionModal
              isLoading={isModalLoading}
              isASchedule={true}
              editSchedule={editSchedule}
              closeModal={this.handleCloseModal}
              handleEditTimeSelection={this.handleEditScheduleTimeSelection}
            />
          ) : null}

          {modalType === MODAL_TYPE.BULK_CHANGE ? (
            <BulkChangeModal
              isLoading={isModalLoading}
              closeModal={this.handleCloseModal}
              handleSubmit={this.handleBulkChange}
            />
          ) : null}
        </Modal>
      </div>
    )
  }
}

export default withToast(TripsContainer)
