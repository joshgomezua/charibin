import React from 'react'
//import classnames from 'classnames'
import { IProps, IState, STATE } from './types'
//import arrowDown from '../../../Common/Utils/Media/arrowDown.svg'
import './styles.scss'


import Button from 'src/Common/Components/Button';
import { IPagination } from 'src/Admin/Containers/Tickets/types';

class Pagination extends React.Component<IProps, IState> {

    readonly state: IState = {
        disabledLeft: true,
        disabledRight: true,
        state: STATE.EMPTY
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.verify() 
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps !== this.props) {
            console.log('pass')     
              this.verify()
        }
    }

    handleOnClickLeft = () => {
        const { onChange } = this.props
        const { state } = this.state

        if (state != STATE.MIDDLE_PAGE && state != STATE.LAST_PAGE) {
            this.props.pagination.currentPage = 1
        } else {
            this.props.pagination.currentPage -= 1
        }
        this.verify()
        onChange(this.props.pagination.currentPage)
    }

    handleOnClickRight = () => {
        const { onChange } = this.props
        const { state } = this.state

        
        if (state != STATE.FIRST_PAGE_FULL_WITH_MORE && state != STATE.MIDDLE_PAGE) {
            this.props.pagination.currentPage = this.props.pagination.currentPage
        } else {
            this.props.pagination.currentPage += 1
        }

        this.verify()
        onChange(this.props.pagination.currentPage)
    }

    verify =  () => {
        console.log('verify')
        const { pagination } = this.props

        this.firstPageFullState(pagination)
        this.firstPageNotFullState(pagination)
        this.emptyState(pagination)
        this.firstPageFullWithMoreState(pagination)
        this.middlePageState(pagination)
        this.lastPageState(pagination)
    }

    firstPageFullState = (pagination: IPagination) => {
        console.log('in')
        if (
            pagination.qtyOfItems === pagination.pageLimit &&
            pagination.qtyTotal <= pagination.pageLimit &&
            pagination.index === pagination.qtyTotal &&
            pagination.currentPage === 1
        ) {
            console.log('test')
            this.setState({ 
                disabledLeft : true, 
                disabledRight : true,
                state: STATE.FIRST_PAGE_FULL
            })
        }
    }

    firstPageNotFullState = (pagination: IPagination) => {
        console.log('in1')
        if (
            pagination.qtyOfItems > 1 &&
            pagination.qtyTotal <= pagination.pageLimit &&
            pagination.index < pagination.qtyTotal &&
            pagination.currentPage === 1
        ) {
            console.log('test1')
            this.setState({ 
                disabledLeft : true, 
                disabledRight : true,
                state: STATE.FIRST_PAGE_NOT_FULL
            })
        }
    }

    emptyState = (pagination: IPagination) => {
        console.log('in2')
        if (
            !pagination.qtyOfItems &&
            (!pagination.index || (pagination.index < pagination.qtyTotal)) &&
            pagination.currentPage === 1
        ) {
            console.log('test2')
            this.setState({ 
                disabledLeft : true, 
                disabledRight : true,
                state: STATE.EMPTY
            })
        }
    }

    firstPageFullWithMoreState = (pagination: IPagination) => {
        console.log('in3')
        if (
            pagination.qtyOfItems === pagination.pageLimit &&
            pagination.qtyTotal > pagination.pageLimit &&
            pagination.index < pagination.qtyTotal &&
            pagination.currentPage === 1
        ) {
            console.log('test3')
            this.setState({ 
                disabledLeft : true, 
                disabledRight : false,
                state: STATE.FIRST_PAGE_FULL_WITH_MORE
            })

        }
    }

    middlePageState = (pagination: IPagination) => {
        console.log('in4')
        if (
            pagination.qtyOfItems === pagination.pageLimit &&
            pagination.qtyTotal > pagination.pageLimit &&
            pagination.index < pagination.qtyTotal &&
            pagination.currentPage > 1
        ) {
            console.log('test4')
            this.setState({ 
                disabledLeft : false,
                disabledRight : false,
                state: STATE.MIDDLE_PAGE
            })
        }
    }

    lastPageState = (pagination: IPagination) => {
        console.log('in5')
        if (
            pagination.qtyOfItems <= pagination.pageLimit &&
            pagination.qtyTotal > pagination.pageLimit &&
            pagination.index === pagination.qtyTotal &&
            pagination.currentPage > 1
        ) {
            console.log('test5')
            this.setState({ 
                disabledLeft : false, 
                disabledRight : true,
                state: STATE.LAST_PAGE
            })
        }
    }


    render() {
        const { disabledRight, disabledLeft } = this.state
        const { pagination } = this.props
        console.log('render: \state', this.state, '\nprops', this.props)
        return (
            <div className="pagination">
                    <Button
                        className="leftBtn"
                        text="Previous"
                        disabled={disabledLeft}
                        onClick={this.handleOnClickLeft}
                    />
                <div className="pagination-text">
                    <p>page {pagination.currentPage} of {pagination.currentPage}</p>
                </div>
                    <Button
                        className="rightBtn"
                        text="Next"
                        disabled={disabledRight}
                        onClick={this.handleOnClickRight}
                    />
            </div>
        )
    }
}

export default Pagination
