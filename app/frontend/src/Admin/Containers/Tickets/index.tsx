import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import Sidebar from '../../Components/Sidebar'
import Agenda from '../../Components/Agenda'
import Modal from '../../Components/Modal'
import TicketModal from '../../Components/TicketModal'
import DeleteModal from '../../Components/DeleteModal'

import withToast from '../../../Common/HOC/withToast'
import { Selectors, Actions } from '../../../Common/Redux/Services/adminTickets'
import {
  createTicket,
  getTickets,
  getTripNames,
  getSingleTicket,
  deleteTicket,
  editTicket
} from '../../Utils/api'
import { MODAL_TYPE } from '../../Utils/adminTypes'
import { ITicket } from '../../../Common/Utils/globalTypes'
import { getToken } from '../../../Common/Utils/helpers'
import { ERRORS, SUCCESS, DEFAULT_TICKET_DATA } from '../../Utils/constants'
import { IStore } from '../../../Common/Redux/types'
import { IState, IProps, IEditedData, IRequestInfo } from './types'
import './styles.scss'
import _ from 'lodash';

class TicketsContainer extends React.Component<
  RouteComponentProps<{ tripName: string }> & IProps,
  IState
> {
  readonly state: IState = {
    tickets: [],
    ticketsDefault: [],
    departures: [],
    departuresOptions: [],
    destinations: [],
    destinationsOptions: [],
    carriers: [],
    carriersOptions: [],
    types: [],
    typesOptions: [],
    isLoading: false,
    isModalLoading: false,
    isError: false,
    modal: {
      id: '',
      type: null,
      heading: '',
      data: DEFAULT_TICKET_DATA,
      trip: null
    },
    calendarFilter: {
      start: undefined,
      end: undefined
    },
    modalOptions: [],
    pagination: { 
      qtyOfItems: 0, 
      qtyTotal: 0,
      pageLimit: 100, 
      currentPage: 1,
      index: 0
     },
     requestInfo : {
       initialDate: new Date(),
       finalDate: '0',
       from: 'null',
       to: 'null',
       carrier: 'null',
       page: 0,
       limit: 100
     }
  }

  private modal = React.createRef<Modal>()

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.selectedDate !== this.props.selectedDate) {
      this.handleFetchTicketsByDate(this.state.requestInfo)
    }
  }

  componentDidMount() {
    const { selectedDate } = this.props
    const { state } = this.props.location

    this.setState(prevState => ({
      requestInfo: {
        ...prevState.requestInfo,
        initialDate: selectedDate
      }
    }))
    this.handleFetchTicketsByDate(this.state.requestInfo)
    this.handleFetchDestination()

    if (state && state.trip) {
      const tripFromState = state.trip

      this.setState(
        (state: IState) => ({
          ...state,
          modal: {
            ...state.modal,
            type: MODAL_TYPE.ADD_TICKET,
            trip: tripFromState
          }
        }),
        () => {
          this.modal.current!.open()
        }
      )
    }
  }

  handleCloseModal = () => {
    this.setState({ isModalLoading: false })
    this.modal.current!.close()
    this.setState({
      destinations: [],
      carriers: [],
      types: []
    })
  }

  handleFetchDestination = () => {
    const token = getToken()

    getTripNames(token)
      .then(({ data }) => {
        const cityNames = data.map((item: any) => ({
          _id: item._id,
          departure: item.departure.name,
          destination: item.destination.name,
          carrier: item.carrier,
          type: item.type
        }))

        this.setState( {  
          modalOptions: 
            [
              ...this.state.modalOptions,
              ...cityNames,
            ]
        })
        const uniqueCitiesNames = this.state.modalOptions.reduce((unique: any, other: any) => {
          if(!unique.some((obj: { departure: any; }) => obj.departure === other.departure)) {
            unique.push(other);
          }
          return unique;
        },[]);

        uniqueCitiesNames.sort((a: any, b: any) => {
          if(a.departure.toLowerCase() < b.departure.toLowerCase()) { return -1; }
          if(a.departure.toLowerCase() > b.departure.toLowerCase()) { return 1; }
          return 0;
        })
        this.props.changeFilters(cityNames)
        this.setState({ departures: uniqueCitiesNames, departuresOptions: this.state.modalOptions })
      })
      .catch(err => {
        this.props.showError(err)
      })
  }

  handleFetchTicketsByTwoDates = async ([startDate, endDate] : [Date, Date]) => {
    await this.setState(prevState => ({
      ...prevState,
      requestInfo: {
        ...prevState.requestInfo,
        initialDate: startDate,
        finalDate: endDate,
      }
    }))

    this.handleFetchTicketsByDate(this.state.requestInfo)
  }

  handlePaginationClick =  (page: number) => {
    this.handleFetchTicketsByDate(this.state.requestInfo, page)
  }

  handleCalendarClear = async() =>  {
    await this.setState(prevState => ({
      requestInfo: {
        ...prevState.requestInfo,
        initialDate: new Date(),
       finalDate: '0',
      }
    }))
    this.handleFetchTicketsByDate(this.state.requestInfo)
  }

  handleFetchTicketsByDate = (requestInfo: IRequestInfo, page?: number) => {
    
    const token = getToken()
    const offset = moment(requestInfo.initialDate).utcOffset()

    const initialDate = moment(requestInfo.initialDate).add(offset, 'minutes').format('x')
    const today = moment(new Date()).add(offset, 'minutes').format('x')
    const finalDate = moment(requestInfo.finalDate).add(offset, 'minutes').format('x')

    const initialOrToday = initialDate > today ? initialDate : today
    const finalOrToday = finalDate > today ? finalDate : today

    const startDate = requestInfo.finalDate !== '0' ? initialOrToday : 
      (initialDate > today ? initialDate: today)
    const endDate = requestInfo.finalDate !== '0' ? finalOrToday : 
      '0'
    
    this.setState({ isLoading: true, isError: false })

    const pageToSend = page? page - 1 : 0

    // the request
    getTickets(startDate, endDate, requestInfo.from, requestInfo.to, requestInfo.carrier, pageToSend, requestInfo.limit, token)
      .then(async res => {
        this.setState({ isLoading: false, tickets: res.data[1], ticketsDefault: res.data[1]})
        await this.setState(prevState => ({
          pagination: {
            ...prevState.pagination,
            qtyOfItems: res.data[1].length,
            index: (pageToSend * prevState.pagination.pageLimit) + res.data[1].length,
            qtyTotal: res.data[0],
            currentPage: page ? page : 1
          }
        }))
      })
      .catch(err => {
        this.setState({ isLoading: false, isError: true })
        this.props.showError(err, ERRORS.TICKET_FETCH)
      })
  }

  handleOpenModal = (type: MODAL_TYPE, heading: string, id: string = '') => {
    this.setState(
      (state: IState) => ({ modal: { ...state.modal, heading, type, id } }),
      () => {
        this.modal.current!.open()
      }
    )
    this.setState({
      destinations: [],
      carriers: [],
      types: []
    })
  }

  handleAddTicket = (
    ticketData: Pick<
      ITicket,
      Exclude<keyof ITicket, 'trip' | '_id' | 'date'>
    > & {
      trip: string
      date: {
        start: number
        end: number
      }
      repeat?: {
        dateEnd: number
        days: number[]
      }
      departureHours?: any[]
    }
  ) => {
    const token = getToken()

    this.setState({ isModalLoading: true })
    return createTicket(ticketData, token)
      .then(res => {
        let message = ''
        if (res.data.updated) {
          message = 'Tickets was overright'
        } else if (!res.data.updated && res.data.dates) {
          message = 'Ticket was updated'
        } else {
          message = SUCCESS.TICKET_ADD
        }

        this.props.showSuccess(message)
        this.handleCloseModal()
        this.handleFetchTicketsByDate(this.state.requestInfo)

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.TICKET_FETCH)

        return Promise.reject()
      })
  }

  handleOpenEditModal = (id: string) => {
    const token = getToken()

    getSingleTicket(id, token)
      .then(({ data }) => {
        const newData = {
          _id: data.trip._id,
          departure: data.trip.departure.name,
          destination: data.trip.destination.name,
          carrier: data.trip.carrier,
          type: data.trip.type,
          duration: data.trip.duration
        } 
        
        data.trip = newData; 
        this.setState(
          (state: IState) => ({
            ...state,
            modal: {
              ...state.modal,
              data,
              trip: newData
            }
          }),
          () => {
            this.handleOpenModal(MODAL_TYPE.EDIT_TICKET, 'Edit ticket', id)
          }
        )
        this.refillModalOptions()
      })
      .catch(err => {
        this.handleCloseModal()
        this.props.showError(err, ERRORS.TICKET_FETCH)
      })
      
  }

  handleDeleteTicket = () => {
    const {
      modal: { id }
    } = this.state
    const token = getToken()

    deleteTicket(id, token)
      .then(() => {
        this.handleCloseModal()
        this.props.showSuccess(SUCCESS.TICKET_DELETE)
        this.handleFetchTicketsByDate(this.state.requestInfo)
      })
      .catch(err => {
        this.modal.current!.close()
        this.props.showError(err, ERRORS.TICKET_DELETE)
      })
  }

  handleEditTicket = (editedDate: IEditedData) => {
    const token = getToken()
    const {
      modal: { id }
    } = this.state

    this.setState({ isModalLoading: true })
    return editTicket(editedDate, id, token)
      .then(() => {
        this.handleCloseModal()
        this.props.showSuccess(SUCCESS.TICKET_EDIT)
        this.handleFetchTicketsByDate(this.state.requestInfo)
      })
      .catch(err => {
        this.setState({ isModalLoading: false, isError: true })
        this.modal.current!.close()
        this.props.showError(err, ERRORS.TICKET_EDIT)
      })
  }

  handleChangeActiveState = (id: string, isActive: boolean) => {
    const token = getToken()

    editTicket({ active: isActive }, id, token)
      .then(({ data }) => {
        this.handleCloseModal()
        this.props.showSuccess(SUCCESS.TICKET_EDIT)
        const updatedTickets = this.state.tickets.map((ticket: ITicket) => {
          if (ticket._id === data._id) {
            return data
          }

          return ticket
        })

        this.setState({
          tickets: updatedTickets
        })

        return Promise.resolve()
      })
      .catch(err => {
        this.props.showError(err, ERRORS.TICKET_EDIT)

        return Promise.reject()
      })
  }

  handleRestartModalType = () => {
    this.setState({
      modal: {
        id: '',
        type: null,
        heading: '',
        data: DEFAULT_TICKET_DATA,
        trip: null
      }
    })
  }

  handleSelectDeparture = (departure: string) => {
    const { departuresOptions } = this.state
    const destinationsFiltered = departuresOptions.filter((item: any) => item.departure === departure)
    let destinationsMapped = destinationsFiltered.map((item: any) => ({
      _id: item._id,
      departure: item.departure,
      destination: item.destination,
      carrier: item.carrier,
      type: item.type
    }))

    const destinationsUnique = destinationsMapped.reduce((unique: any, other: any) => {
      if(!unique.some((obj: any) => obj.destination === other.destination)) {
        unique.push(other);
      }
      return unique;
    },[]);

    destinationsUnique.sort((a: any, b: any) => {
      if(a.destination.toLowerCase() < b.destination.toLowerCase()) { return -1; }
      if(a.destination.toLowerCase() > b.destination.toLowerCase()) { return 1; }
      return 0;
    }),
    this.setState({destinations : destinationsUnique, destinationsOptions: destinationsFiltered})  
  }

  handleSelectDestination = (destination: string) => {
    const { destinationsOptions } = this.state
    const carriersFiltered = destinationsOptions.filter((item: any) => item.destination === destination)
    const carriersMapped = carriersFiltered.map((item: any) => ({
      _id: item._id,
      departure: item.departure,
      destination: item.destination,
      carrier: item.carrier,
      type: item.type
    }))

    const carriersUnique = carriersMapped.reduce((unique: any, other: any) => {
      if(!unique.some((obj: any) => obj.carrier === other.carrier)) {
        unique.push(other);
      }
      return unique;
    },[]);

    carriersUnique.sort((a: any, b: any) => {
      if(a < b) { return -1; }
      if(a > b) { return 1; }
      return 0;
    })
    this.setState({carriers : carriersUnique, carriersOptions: carriersFiltered}) 
  }

  handleSelectCarrier = (carrier: string) => {
    const { carriersOptions } = this.state
    const typesFiltered = carriersOptions.filter((item: any) => item.carrier === carrier)
    const typesMapped = typesFiltered.map((item: any) => ({
      _id: item._id,
      departure: item.departure,
      destination: item.destination,
      carrier: item.carrier,
      type: item.type
    }))

    typesMapped.sort((a: any, b: any) => {
      if(a < b) { return -1; }
      if(a > b) { return 1; }
      return 0;
    })
    this.setState({types : typesMapped}) 
  }

  handleChangeFilterFrom = async(filterFrom: string[]) => {
    let filters = ''
    if (filterFrom.length) {
      
      for (let filter of filterFrom) {
        filters += filter + ','
      }
      
    } else {
      filters = 'null'
    }
    await this.setState(prevState => ({
      requestInfo: {
        ...prevState.requestInfo,
        from: filters
      }
    }))
    this.handleFetchTicketsByDate(this.state.requestInfo)
    this.props.changeFilterFrom(filterFrom)
  }

  handleChangeFilterTo = async(filterTo: string[]) => {
    let filters = ''
    if (filterTo.length) {
      for (let filter of filterTo) {
        filters += filter + ','
      }
    } else {
      filters = 'null'
    }
    await this.setState(prevState => ({
      requestInfo: {
        ...prevState.requestInfo,
        to: filters
      }
    }))
    this.handleFetchTicketsByDate(this.state.requestInfo)
    this.props.changeFilterTo(filterTo)
  }

  handleChangeFilterCarrier = async(filterCarrier: string[]) => {
    let filters = ''
    if (filterCarrier.length) {
      for (let filter of filterCarrier) {
        filters += filter + ','
      }
    } else {
      filters = 'null'
    }
    await this.setState(prevState => ({
      requestInfo: {
        ...prevState.requestInfo,
        carrier: filters
      }
    }))
    this.handleFetchTicketsByDate(this.state.requestInfo)
  }

  refillModalOptions = () => {
    const { trip } =  this.state.modal.data

    this.handleSelectDeparture(trip.departure)
    this.handleSelectDestination(trip.destination)
    this.handleSelectCarrier(trip.carrier)
  }

  render() {
    const {
      tickets,
      modal,
      isLoading,
      isModalLoading,
      isError,
      departures,
      destinations,
      carriers,
      types,
      calendarFilter,
      pagination,
    } = this.state
    const {
      filters,
      filterFrom,
      filterTo,
      filterCarrier,
      selectedDate,
      changeSelectedDate
    } = this.props

    return (
      <div className="spon-tickets">
        <div className="spon-tickets__content">
          <Sidebar
            filterCarrier={filterCarrier}
            filterFrom={filterFrom}
            filterTo={filterTo}
            selectedDate={selectedDate}
            changeFilterFrom={this.handleChangeFilterFrom}
            changeFilterTo={this.handleChangeFilterTo}
            changeFilterCarrier={this.handleChangeFilterCarrier}
            changeSelectedDate={changeSelectedDate}
            calendarFilter={calendarFilter}
            onChange={this.handleFetchTicketsByTwoDates}
            handleFetchTicketsByDate={this.handleCalendarClear}
          />
          <Agenda
            tickets={tickets}
            filterFrom={filterFrom}
            filterTo={filterTo}
            openEditModal={this.handleOpenEditModal}
            openModal={this.handleOpenModal}
            loading={isLoading}
            error={isError}
            changeActiveState={this.handleChangeActiveState}
            retry={() => this.handleFetchTicketsByDate(this.state.requestInfo)}
            filters={filters}
            pagination={pagination}
            handlePaginationClick={this.handlePaginationClick}
          />
        </div>

        <Modal
          title={modal.heading}
          ref={this.modal}
          restartModalType={this.handleRestartModalType}>
          {modal.type === MODAL_TYPE.ADD_TICKET ? (
            <TicketModal
              tripSelected={modal.trip ? modal.trip : null}
              departures={departures}
              destinations={destinations}
              carriers={carriers}
              types={types}
              isLoading={isModalLoading}
              closeModal={this.handleCloseModal}
              handleSubmit={this.handleAddTicket}
              handleSelectDeparture={this.handleSelectDeparture}
              handleSelectDestination={this.handleSelectDestination}
              handleSelectCarrier={this.handleSelectCarrier}
            />
          ) : null}

          {modal.type === MODAL_TYPE.EDIT_TICKET ? (
            <TicketModal
              departures={departures}
              destinations={destinations}
              carriers={carriers}
              types={types}
              editDate={modal.data}
              isLoading={isModalLoading}
              closeModal={this.handleCloseModal}
              handleEditTicket={this.handleEditTicket}
              handleSelectDeparture={this.handleSelectDeparture}
              handleSelectDestination={this.handleSelectDestination}
              handleSelectCarrier={this.handleSelectCarrier}
            />
          ) : null}

          {modal.type === MODAL_TYPE.DELETE_TICKET ? (
            <DeleteModal
              closeModal={this.handleCloseModal}
              deleteItem={this.handleDeleteTicket}
              text="the ticket will be deleted"
            />
          ) : null}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: IStore) => ({
  filters: Selectors.selectFilters(state),
  filterFrom: Selectors.selectFilterFrom(state),
  filterTo: Selectors.selectFilterTo(state),
  selectedDate: Selectors.selectSelectedDate(state),
})

export default connect(
  mapStateToProps,
  Actions
)(withToast(TicketsContainer))
