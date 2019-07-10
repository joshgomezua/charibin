import React from 'react'

import UserHeader from '../../Components/UserHeader'
import Table from '../../Components/Table'
import Modal from '../../Components/Modal'
import UserModal from '../../Components/UserModal'
import DeleteModal from '../../Components/DeleteModal'

import withToast from '../../../Common/HOC/withToast'
import { RouteComponentProps } from 'react-router-dom'
import { MODAL_TYPE, IUser } from '../../Utils/adminTypes'
import { getToken } from '../../../Common/Utils/helpers'
import {
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
import { debounce } from 'lodash';

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
    enable: false,
    usersTable: [],
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
    if (token) {
      getUsers(page, limit, token)
        .then(res => {
            this.setState({
              isLoading: false,
              users: res.data.results,
              usersTable: res.data.results,
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
      
    } = this.state
    const token = getToken()

    if (token) {
      deleteUser(id, true, token)
      .then(({ data }) => {
        const updatedUsers = this.state.users.map((user: IUser) => {
          if (user._id === data._id) {

            return data
          }

          return user
        })
        this.modal.current!.close()
        this.setState({ users:updatedUsers  })
        this.setState({ usersTable: updatedUsers })
        this.props.showSuccess(SUCCESS.USER_DELETE)
        this.handleRestartModalType()
        return Promise.resolve()
      })
      .catch(err => this.props.showError(err, ERRORS.USER_DELETE))
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


  handleToggleSwitch =  (id: string, value:boolean) => {
    const token = getToken()
    
    editUserState(id, value, token)
      .then(({ data }) => {
        const updatedUsers = this.state.users.map((user: IUser) => {
          if (user._id === data._id) {

            return data
          }

          return user
        })

        this.setState({ users:updatedUsers  })
        this.setState({ usersTable: updatedUsers })
        this.props.showSuccess(SUCCESS.USER_UPDATE)
      })
      .catch(err => this.props.showError(err, ERRORS.USER_EDIT))
}
  

  handleToggle = () =>{
    let newUsers
    const toggle = !this.state.enable
      
    if (toggle){
      newUsers = this.state.users.filter(user => user.active)
    } else {
      newUsers = this.state.users
    }
    
    this.setState({usersTable: newUsers, enable: toggle})


  }
 
  handlResetPassword(id: string){

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
      usersTable,
      total,
      isLoading,
      isModalLoading,
      editData,
      enable,
      modal: { type: modalType, heading: modalHeading }
    } = this.state
    return (
      <div className="spon-container">
        <UserHeader
          title="Manage Users"
          handleToggle={this.handleToggle}
          heading = 'Create User'
          enable = {enable}
	        modal = {MODAL_TYPE.ADD_USER}
          handleOpenModal={this.handleOpenModal}
        />

        <Table
          data={usersTable}
          handleFetchData={this.handleFetchTableData}
          columns={columns(
            this.handleOpenDeleteModal,
            this.handleOpenEditModal,
            this.handlResetPassword,
            debounce(this.handleToggleSwitch,300),
           
           
          )}
          loading={isLoading}
          pages={Math.ceil(total / 10)}
        />

        <Modal
          ref={this.modal}
          title={modalHeading}
          restartModalType={this.handleRestartModalType}>
          {modalType === MODAL_TYPE.ADD_USER ? (
            <UserModal
              isLoading={isModalLoading}
              closeModal={this.handleCloseModal}
              handleSubmit={this.handleAddUser}
            />
          ) : null}

          {modalType === MODAL_TYPE.EDIT_USER ? (
            <UserModal
              isLoading={isModalLoading}
              editDate={editData}
              closeModal={this.handleCloseModal}
              handleEditUser={this.handleEditUser}
            />
          ) : null}

          {modalType === MODAL_TYPE.DELETE_USER ? (
            <DeleteModal
              closeModal={this.handleCloseModal}
              deleteItem={this.handleDeleteUser}
              text="user will be deleted"
            />
          ) : null}
        </Modal>
      </div>
    )

  }

}

export default withToast(UsersContainer)

