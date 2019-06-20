import React from 'react'

import Header from '../../Components/Header'
import Table from '../../Components/Table'
import Modal from '../../Components/Modal'
import UserModal from '../../Components/UserModal'
import DeleteModal from '../../Components/DeleteModal'

import withToast from '../../../Common/HOC/withToast'
import { RouteComponentProps } from 'react-router-dom'
import { MODAL_TYPE, IUser } from '../../Utils/adminTypes'
import { getToken } from '../../../Common/Utils/helpers'
import {
  //ADMIN_ROUTING,
  ERRORS,
  SUCCESS,
  DEFAULT_USER_DATA
} from '../../Utils/constants'
import {
  getUsers,
  addUser,
  deleteUser,
  getSingleUser,
  editUserState,
  updateUser
} from '../../Utils/api'
import { IState, IProps } from './types'
import { columns } from './columns'

class UsersContainer extends React.Component<
  RouteComponentProps<{}> & IProps,
  IState
> {
  private modal = React.createRef<Modal>()

  readonly state: IState = {
    users: [],
    total: 0,
    currentPage: 0,
    isLoading: true,
    isModalLoading: false,
    editData: DEFAULT_USER_DATA,
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
    this.handleOpenModal(MODAL_TYPE.DELETE_USER, 'Delete user', id)
  }

  handleOpenEditModal = (id: string) => {
    this.handleOpenModal(MODAL_TYPE.EDIT_USER, 'Edit user', id)
    this.handleFetchUserpData(id)
  }

  handleFetchUserpData = (id: string) => {
    const token = getToken()

    if (token) {
      getSingleUser(id, token)
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
    console.log('2000')
    if (token) {
      getUsers(page, limit, token)
        .then(res => {
            this.setState({
              isLoading: false,
              users: res.data.results,
              total: res.data.status.total
              
            })
            

        })
        .catch(err => {
          this.props.showError(err, ERRORS.USER_FETCH)
        })
    }
  }

  handleFetchTableData = (boardState: any) => {
    this.setState({ currentPage: boardState.page })
    this.handleFetchItems(boardState.page, 10)
  }

  handleDeleteUser = () => {
    const {
      modal: { id },
      currentPage
    } = this.state
    const token = getToken()

    if (token) {
      deleteUser(id, token)
        .then(() => {
          this.handleFetchItems(currentPage, 10)
          this.handleCloseModal()
          this.props.showSuccess(SUCCESS.USER_DELETE)
          this.handleRestartModalType()
        })
        .catch(err => {
          this.handleCloseModal()
          this.props.showError(err, ERRORS.USER_DELETE)
        })
    }
  }

  handleAddUser = (data: IUser) => {
    const token = getToken()
    const { currentPage } = this.state

    this.setState({ isModalLoading: true })
    return addUser(data, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.USER_ADD)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.USER_ADD)

        return Promise.reject()
      })
  }

  handleEditUser = (data: IUser) => {
    const token = getToken()
    const { currentPage } = this.state
    const {
      modal: { id }
    } = this.state

    this.setState({ isModalLoading: true })
    return updateUser(id, data, token)
      .then(res => {
        this.modal.current!.close()
        this.handleFetchItems(currentPage, 10)
        this.props.showSuccess(SUCCESS.USER_EDIT)
        this.handleRestartModalType()

        return Promise.resolve()
      })
      .catch(err => {
        this.setState({ isModalLoading: false })
        this.props.showError(err, ERRORS.USER_EDIT)

        return Promise.reject()
      })
  }

  handleToggleSwitch = (id: string, value: boolean) => {
    const token = getToken()

    editUserState(id, value, token)
      .then(({ data }) => {
        const updatedUsers = this.state.users.map((user: IUser) => {
          if (user._id === data._id) {
            return data
          }

          return user
        })
        
        this.setState({ users: updatedUsers })
        this.props.showSuccess(SUCCESS.USER_UPDATE)
      })
      .catch(err => this.props.showError(err, ERRORS.USER_EDIT))
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
      users,
      total,
      isLoading,
      isModalLoading,
      editData,
      modal: { type: modalType, heading: modalHeading }
    } = this.state
    return (
      <div className="spon-container">
        <Header
          title="Users control"
          handleOpenModal={this.handleOpenModal}
        />

        <Table
          data={users}
          handleFetchData={this.handleFetchTableData}
          columns={columns(
            this.handleOpenDeleteModal,
            this.handleOpenEditModal,
            this.handleToggleSwitch
          )}
          loading={isLoading}
          pages={Math.ceil(total / 10)}
        />

        <Modal
          ref={this.modal}
          title={modalHeading}
          restartModalType={this.handleRestartModalType}>
          {modalType === MODAL_TYPE.ADD_TRIP ? (
            <UserModal
              isLoading={isModalLoading}
              closeModal={this.handleCloseModal}
              handleSubmit={this.handleAddUser}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_TRIP ? (
            <UserModal
              isLoading={isModalLoading}
              editDate={editData}
              closeModal={this.handleCloseModal}
              handleEditTrip={this.handleEditUser}
            />
          ) : null}

          {modalType === MODAL_TYPE.DELETE_TRIP ? (
            <DeleteModal
              closeModal={this.handleCloseModal}
              deleteItem={this.handleDeleteUser}
            />
          ) : null}
        </Modal>
      </div>
    )
  }
}

export default withToast(UsersContainer)

