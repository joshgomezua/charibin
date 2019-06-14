import React from 'react'

import Header from '../../Components/Header'
import Table from '../../Components/Table'
import Modal from '../../Components/Modal'
import CityModal from '../../Components/CityModal'
import DeleteModal from '../../Components/DeleteModal'
 

import withToast from '../../../Common/HOC/withToast'
import { RouteComponentProps } from 'react-router-dom'
import { MODAL_TYPE, ICity } from '../../Utils/adminTypes'
import { getToken } from '../../../Common/Utils/helpers'
import {
 // ADMIN_ROUTING,
  ERRORS,
  SUCCESS,
  DEFAULT_CITY_DATA
} from '../../Utils/constants'
import {
  getCities,
  deleteCity,
  getSingleCity,
  addCity,
  updateCity
} from '../../Utils/api'
import { IState, IProps } from './types'
import { columns } from './columns'


class CityContainer extends React.Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  private modal = React.createRef<Modal>()

  readonly state: IState = {
    cities: [{
      _id: '0',
      name: 'Paris',
      country: 'France',
      tags:['Beach', 'Nightlife'],
      photo: "https://s3.eu-west-2.amazonaws.com/spon-staging/staging_5c91210fb4f0e3003452a581.png"
    }],
    total: 0,
    currentPage: 0,
    isLoading: false,
    isModalLoading: false,
    editData: DEFAULT_CITY_DATA,
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
    this.handleOpenModal(MODAL_TYPE.DELETE_CITY, 'Delete city', id)
  }

  handleOpenEditModal = (id: string) => {
    this.handleOpenModal(MODAL_TYPE.EDIT_CITY, 'Edit city', id)
    this.handleFetchCityData(id)
  }

  handleFetchCityData = (id: string) => {
    const token = getToken()
    
    if (token) {
      getSingleCity(id, token)
        .then(res => {
          this.setState({ editData: res.data })
          console.log('get signle city ')
        })
        .catch(err => {
          console.log("erreur")
          this.modal.current!.close()
          this.props.showError(err)
        })
    }
  }

  handleFetchItems = (page: number, limit: number) => {
    const token = getToken()
    console.log(token)
    console.log('get cities')
    if (token) {
      getCities(page, limit, token)
        .then(res =>{
          this.setState({
            isLoading: false,
            cities: res.data.results,
            total: res.data.status.total
          })
          console.log("res.data: ", res.data.results)
        })
        .catch(err => {
          this.props.showError(err, ERRORS.CITY_FETCH)
        })
    }
  }

  handleFetchTableData = (boardState: any) => {
    this.setState({ currentPage: boardState.page })
    this.handleFetchItems(boardState.page, 10)
  }

  handleDeleteCity = () => {
    const {
      modal: { id },
      currentPage
    } = this.state
    const token = getToken()

    if (token) {
      deleteCity(id, token)
        .then(() => {
          this.handleFetchItems(currentPage, 10)
          this.handleCloseModal()
          this.props.showSuccess(SUCCESS.CITY_DELETE)
          this.handleRestartModalType()
        })
        .catch(err => {
          this.handleCloseModal()
          this.props.showError(err, ERRORS.CITY_DELETE)
        })
    }
  }

  handleAddCity = (data: ICity) => {
    const token = getToken()
    const { currentPage } = this.state

    this.setState({ isModalLoading: true })
    return addCity(data, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.CITY_ADD)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.CITY_ADD)

        return Promise.reject()
      })
  }

  handleEditCity = (data: ICity) => {
    const token = getToken()
    const { currentPage } = this.state
    const {
      modal: { id }
    } = this.state

    console.log(data)
    this.setState({ isModalLoading: true })
    return updateCity(id, data, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.CITY_EDIT)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.CITY_EDIT)

        return Promise.reject()
      })
  }

/*  handleRedirectToCreateCity = (city: { _id: string; name: string }) => {
    this.props.history.push({
      pathname: `${ADMIN_ROUTING.MAIN}${ADMIN_ROUTING.CITIES}`,
       state: { city }
    })
  }*/

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
      cities,
      total,
      isLoading,
      isModalLoading,
      editData,
      modal: { type: modalType, heading: modalHeading }
    } = this.state
    return (
      <div className="spon-container">
        <Header
          title="Destination & Departure Database"
          heading = 'Create city'
          modal = {MODAL_TYPE.ADD_CITY}
          handleOpenModal={this.handleOpenModal}
        />

        <Table
          data={cities}
          handleFetchData={this.handleFetchTableData}
          columns={columns(
            this.handleOpenDeleteModal,
            this.handleOpenEditModal,
          )}
          loading={isLoading}
          pages={Math.ceil(total / 10)}
        />

        <Modal
          ref={this.modal}
          title={modalHeading}
          restartModalType={this.handleRestartModalType}>
          {modalType === MODAL_TYPE.ADD_CITY ? (
            <CityModal
              isLoading={isModalLoading}
              closeModal={this.handleCloseModal}
              handleSubmit={this.handleAddCity}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_CITY ? (
            <CityModal
              isLoading={isModalLoading}
              editDate={editData}
              closeModal={this.handleCloseModal}
              handleEditCity={this.handleEditCity}
            />
          ) : null}

          {modalType === MODAL_TYPE.DELETE_CITY ? (
            <DeleteModal
              closeModal={this.handleCloseModal}
              deleteItem={this.handleDeleteCity}
            />
          ) : null}
        </Modal>
      </div>
    )
  }
}

export default withToast(CityContainer)
