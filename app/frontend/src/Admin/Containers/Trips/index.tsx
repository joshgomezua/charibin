import React from 'react'

import Header from '../../Components/Header'
import ExpandableTable from '../../Components/ExpandableTable'
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
  DEFAULT_TRIP_SCHEDULE,
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
  updateSchedule
} from '../../Utils/api'
import { IState, IProps, INewData, IEditTimeSchedule, INewSchedule } from './types'
import { columns } from './columns'
import { rangeColumns } from './rangeColumns';
import ScheduleModal from 'src/Admin/Components/ScheduleModal';

class TripsContainer extends React.Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  private modal = React.createRef<Modal>()

  readonly state: IState = {
    trips: [], 
    total: 0,
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

    this.setState({ isModalLoading: true })
    return updateTrip(id, data, token)
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
    
    this.setState({ isModalLoading: true })
    return updateTimeSelection(id, data, token)
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
      trip: this.state.editData._id
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

    this.setState({ isModalLoading: true })
    return updateSchedule(id, data, token)
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
      editSchedule,
      modal: { type: modalType, heading: modalHeading }
    } = this.state
    return (
      <div className="spon-container">
        <Header
          title="Routes & Prices"
          handleOpenModal={this.handleOpenModal}
        />

        <ExpandableTable
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
              editSchedule={editData}
              closeModal={this.handleCloseModal}
              handleEditTimeSelection={this.handleEditTimeSelection}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_TIME_SELECTION_SCHEDULE ? (
            <TimeSelectionModal
              isLoading={isModalLoading}
              editSchedule={editSchedule}
              closeModal={this.handleCloseModal}
              handleEditTimeSelection={this.handleEditScheduleTimeSelection}
            />
          ) : null}
        </Modal>
      </div>
    )
  }
}

export default withToast(TripsContainer)
