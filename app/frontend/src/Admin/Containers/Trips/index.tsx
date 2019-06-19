import React from 'react'

import Header from '../../Components/Header'
import Table from '../../Components/Table'
import Modal from '../../Components/Modal'
import TripModal from '../../Components/TripModal'
import DeleteModal from '../../Components/DeleteModal'
import TimeSelectionModal from '../../Components/TimeSelectionModal'

import withToast from '../../../Common/HOC/withToast'
import { RouteComponentProps } from 'react-router-dom'
import { MODAL_TYPE } from '../../Utils/adminTypes'
import { getToken } from '../../../Common/Utils/helpers'
import {
  ADMIN_ROUTING,
  ERRORS,
  SUCCESS,
  DEFAULT_TRIP_DATA,
} from '../../Utils/constants'
import {
  getTrips,
  addTrip,
  deleteTrip,
  getSingleTrip,
  updateTrip,
  updateTimeSelection,
  deleteScheduledTrip
} from '../../Utils/api'
import { IState, IProps, INewData, IEditTimeSchedule } from './types'
import { columns } from './columns'
import { rangeColumns } from './rangeColumns';

class TripsContainer extends React.Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  private modal = React.createRef<Modal>()

  readonly state: IState = {
    trips: [], //default is []
    total: 0,
    currentPage: 0,
    isLoading: true, //default is true
    isModalLoading: false,
    editData: DEFAULT_TRIP_DATA,
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
    this.handleOpenModal(MODAL_TYPE.ADD_TRIP, 'Add schedule', id)
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

  handleFetchItems = (page: number, limit: number) => {
    const token = getToken()

    if (token) {
      getTrips(page, limit, token)
        .then(res =>
          this.setState({
            isLoading: false,
            trips: res.data.results,
            total: res.data.status.total
          })
        )
        .catch(err => {
          this.props.showError(err, ERRORS.TRIP_FETCH)
        })
    }
    console.log(this.state.trips);
  }

  handleFetchTableData = (boardState: any) => {
    this.setState({ currentPage: boardState.page })
    this.handleFetchItems(boardState.page, 10)
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
        })
    }
  }

  handleAddTrip = (data: INewData) => {
    const token = getToken()
    const { currentPage } = this.state
    const newTrip: INewData = {
      ...data,
      timeSelection: {
        defaultPrice: data.timeSelection.defaultPrice,
        time1: data.timeSelection.defaultPrice,
        time2: data.timeSelection.defaultPrice,
        time3: data.timeSelection.defaultPrice,
        time4: data.timeSelection.defaultPrice,
        time5: data.timeSelection.defaultPrice,
        time6: data.timeSelection.defaultPrice,
        time7: data.timeSelection.defaultPrice,
        time8: data.timeSelection.defaultPrice,
        time9: data.timeSelection.defaultPrice,
        time10: data.timeSelection.defaultPrice,
      },
      isFromAPI: false,
    }
    this.setState({ isModalLoading: true })
    return addTrip(newTrip, token)
      .then(res => { // remplacer res par ()
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

    
    this.setState({ isModalLoading: true })
    return updateTrip(id, data, token)
      .then(res => {   // remplacer res par ()
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

    
    this.setState({ isModalLoading: true })
    return updateTimeSelection(id, data, token)
      .then(res => {  // remplacer res par ()
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
    console.log(this.state.trips)
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

  render() {
    const {
      trips,
      total,
      isLoading,
      isModalLoading,
      editData,
      modal: { type: modalType, heading: modalHeading }
    } = this.state
    return (
      <div className="spon-container">
        <Header
          title="Routes & Prices"
          handleOpenModal={this.handleOpenModal}
        />

        <Table
          data={trips}
          handleFetchData={this.handleFetchTableData}
          columns={columns(
            this.handleOpenDeleteTripModal,
            this.handleOpenEditModal,
            this.handleOpenTimeSelectionModal,
            this.handleRedirectToCreateTicket,
          )}
          loading={isLoading}
          pages={Math.ceil(total / 10)}
          subComponentClassName={"rangeTripTable"}
          detailsColumns={rangeColumns(
            this.handleOpenDeleteScheduleModal,
            this.handleOpenEditModal,
            this.handleOpenTimeSelectionModal,
            this.handleOpenModal,
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
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_TRIP ? (
            <TripModal
              isLoading={isModalLoading}
              editDate={editData}
              closeModal={this.handleCloseModal}
              handleEditTrip={this.handleEditTrip}
            />
          ) : null}

          {modalType === MODAL_TYPE.DELETE_TRIP ? (
            <DeleteModal
              closeModal={this.handleCloseModal}
              deleteItem={this.handleDeleteTrip}
            />
          ) : null}

          {modalType === MODAL_TYPE.DELETE_SCHEDULE ? (
            <DeleteModal
              closeModal={this.handleCloseModal}
              deleteItem={this.handleDeleteSchedule}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_TIME_SELECTION ? (
            <TimeSelectionModal
              isLoading={isModalLoading}
              editSchedule={editData}
              closeModal={this.handleCloseModal}
              handleEditTimeSelection={this.handleEditTimeSelection}
            />
          ) : null}
        </Modal>
      </div>
    )
  }
}

export default withToast(TripsContainer)
