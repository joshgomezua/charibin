import React from 'react'
import { IProps, IState, STATE } from './types'
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
        this.verify() 
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps !== this.props) {
              this.verify()
        }
    }

    handleOnClickLeft = () => {
        const { onChange, pagination } = this.props
        const { state } = this.state

        if (state != STATE.MIDDLE_PAGE && state != STATE.LAST_PAGE) {
            pagination.currentPage = 1
        } 
        else if (pagination.currentPage > 1) {
            pagination.currentPage -= 1
        }

        this.verify()
        onChange(pagination.currentPage)
    }

    handleOnClickRight = () => {
        const { onChange, pagination } = this.props
        const { state } = this.state
        const maxPage = Math.ceil(pagination.qtyTotal / pagination.pageLimit)

        
        if (state != STATE.FIRST_PAGE_FULL_WITH_MORE && state != STATE.MIDDLE_PAGE) {
            pagination.currentPage = pagination.currentPage
        } 
        else if (pagination.currentPage < maxPage) {

            pagination.currentPage += 1
        }

        this.verify()
        onChange(pagination.currentPage)
    }

    verify =  () => {
        const { pagination } = this.props

        this.firstPageFullState(pagination)
        this.firstPageNotFullState(pagination)
        this.emptyState(pagination)
        this.firstPageFullWithMoreState(pagination)
        this.middlePageState(pagination)
        this.lastPageState(pagination)
    }

    firstPageFullState = (pagination: IPagination) => {
        if (
            pagination.qtyOfItems === pagination.pageLimit &&
            pagination.qtyTotal <= pagination.pageLimit &&
            pagination.index === pagination.qtyTotal &&
            pagination.currentPage === 1
        ) {
            this.setState({ 
                disabledLeft : true, 
                disabledRight : true,
                state: STATE.FIRST_PAGE_FULL
            })
        }
    }

    firstPageNotFullState = (pagination: IPagination) => {
        if (
            pagination.qtyOfItems > 0 &&
            pagination.qtyTotal <= pagination.pageLimit &&
            pagination.index <= pagination.qtyTotal &&
            pagination.currentPage === 1
        ) {
            this.setState({ 
                disabledLeft : true, 
                disabledRight : true,
                state: STATE.FIRST_PAGE_NOT_FULL
            })
        }
    }

    emptyState = (pagination: IPagination) => {
        if (
            !pagination.qtyOfItems &&
            (!pagination.index || (pagination.index < pagination.qtyTotal)) &&
            pagination.currentPage === 1
        ) {
            this.setState({ 
                disabledLeft : true, 
                disabledRight : true,
                state: STATE.EMPTY
            })
        }
    }

    firstPageFullWithMoreState = (pagination: IPagination) => {
        if (
            pagination.qtyOfItems === pagination.pageLimit &&
            pagination.qtyTotal > pagination.pageLimit &&
            pagination.index < pagination.qtyTotal &&
            pagination.currentPage === 1
        ) {
            this.setState({ 
                disabledLeft : true, 
                disabledRight : false,
                state: STATE.FIRST_PAGE_FULL_WITH_MORE
            })

        }
    }

    middlePageState = (pagination: IPagination) => {
        if (
            pagination.qtyOfItems === pagination.pageLimit &&
            pagination.qtyTotal > pagination.pageLimit &&
            pagination.index < pagination.qtyTotal &&
            pagination.currentPage > 1
        ) {
            this.setState({ 
                disabledLeft : false,
                disabledRight : false,
                state: STATE.MIDDLE_PAGE
            })
        }
    }

    lastPageState = (pagination: IPagination) => {
        if (
            pagination.qtyOfItems <= pagination.pageLimit &&
            pagination.qtyTotal > pagination.pageLimit &&
            pagination.index === pagination.qtyTotal &&
            pagination.currentPage > 1
        ) {
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
        return (
            <div className="pagination">
                    <Button
                        className="leftBtn"
                        text="Previous"
                        disabled={disabledLeft}
                        onClick={this.handleOnClickLeft}
                    />
                <div className="pagination-text">
                    <p>page {pagination.currentPage} of {
                            Math.ceil(pagination.qtyTotal / pagination.pageLimit) || 1
                        }</p>
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
