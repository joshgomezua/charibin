import React from 'react'

import Header from '../../Components/Header'
import Table from '../../Components/Table'
import Modal from '../../Components/Modal'
import TripModal from '../../Components/TripModal'
import DeleteModal from '../../Components/DeleteModal'
import TimeSelectionModal from '../../Components/TimeSelectionModal'

import withToast from '../../../Common/HOC/withToast'
import { RouteComponentProps } from 'react-router-dom'
import { MODAL_TYPE, ITrip, ISchedule } from '../../Utils/adminTypes'
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
  updateTimeSelection
} from '../../Utils/api'
import { IState, IProps } from './types'
import { columns } from './columns'

class TripsContainer extends React.Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  private modal = React.createRef<Modal>()

  readonly mockSchedule: ISchedule = {
    defaultPrice: 5,
    time1: 2,
    time2: 2,
    time3: 2,
    time4: 2,
    time5: 2,
    time6: 2,
    time7: 2,
    time8: 2,
    time9: 2,
    time10: 2,
    bidirectionalChange: false,
  }
  
  readonly firstTrip: ITrip = {
    _id: 'sdslkd',
    active: true,
    deselectionPrice: 3,
    timeSelection: 2,
    schedule: this.mockSchedule,
    discount: 30,
    duration: 90,
    fake: false,
    carrier: "Flixbus",
    departure: "Londres",
    destination: "Dublin",
    photo: "mockPhoto.png",
    price: 90,
    type: "train"
  }

  readonly secondTrip: ITrip = {
    _id: 'sdsl3kd',
    active: true,
    deselectionPrice: 2,
    schedule: this.mockSchedule,
    timeSelection: 3,
    discount: 25,
    duration: 55,
    fake: true,
    carrier: "Flixbus",
    departure: "Londres",
    destination: "Paris",
    photo: "mockPhoto.png",
    price: 45,
    type: "train"
  }
  
  readonly arrayTrip: ITrip[] = [this.firstTrip, this.secondTrip]

  readonly state: IState = {
    trips: this.arrayTrip, //default is []
    total: 0,
    currentPage: 0,
    isLoading: false, //default is true
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

  handleOpenDeleteModal = (id: string) => {
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

  handleAddTrip = (data: ITrip) => {
    const token = getToken()
    const { currentPage } = this.state

    this.setState({ isModalLoading: true })
    return addTrip(data, token)
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

  handleEditTrip = (data: ITrip) => {
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

  handleEditTimeSelection = (data: ISchedule) => {
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
          title="Destination control"
          handleOpenModal={this.handleOpenModal}
        />

        <Table
          data={trips}
          handleFetchData={this.handleFetchTableData}
          columns={columns(
            this.handleOpenDeleteModal,
            this.handleOpenEditModal,
            this.handleOpenTimeSelectionModal,
            this.handleRedirectToCreateTicket
          )}
          loading={isLoading}
          pages={Math.ceil(total / 10)}
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

          {modalType === MODAL_TYPE.EDIT_TIME_SELECTION ? (
            <TimeSelectionModal
              isLoading={isModalLoading}
              editSchedule={editData.schedule}
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
