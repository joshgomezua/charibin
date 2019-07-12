import React from 'react'
//import classnames from 'classnames'
import { IProps, IState } from './types'
//import arrowDown from '../../../Common/Utils/Media/arrowDown.svg'
import './styles.scss'


import Button from 'src/Common/Components/Button';

class Pagination extends React.Component<IProps, IState> {

    readonly state: IState = {
        currentPage: 1,
        disabledLeft: false,
        disabledRight: false
    }

    componentDidMount() {
        this.verifyConditions()
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps !== this.props) {
            this.verifyConditions()
        }
    }
    
    verifyConditions = () => {
        const { currentPage, disabledLeft, disabledRight} = this.state
        const { qtyOfItems, pageLimit, qtyTotal } =  this.props

        console.log(`
            qtyOfItems: ${qtyOfItems} \n
            pageLimit: ${pageLimit} \n
            qtyTotal: ${qtyTotal} \n
            currentPage: ${currentPage} \n
            disabledLeft: ${disabledLeft} \n
            disabledRight: ${disabledRight}
        `)

        if (currentPage === 1) {
            this.setState({ disabledLeft: true, disabledRight: true})

            if (qtyTotal > pageLimit) {
                this.setState({ disabledRight: false })
            } 
        } 
        else if (currentPage > 1) {
            this.setState({ disabledLeft: false, disabledRight: false })
        }

        if (qtyOfItems <= pageLimit) {
            this.setState({ disabledRight: true })
        }

        if (qtyTotal <= pageLimit) {
            this.setState({ disabledRight: true })
        }
    }

    handleOnClick = (page: number) => {
        this.verifyConditions()
        this.props.onChange(page)
    }


    render() {
        const { currentPage, disabledRight, disabledLeft } = this.state

        return (
            <div className="pagination">
                    <Button
                        className="leftBtn"
                        text="Previous"
                        disabled={disabledLeft}
                        onClick={this.handleOnClick}
                    />
                <div className="pagination-text">
                    <p>page {currentPage} of {currentPage}</p>
                </div>
                    <Button
                        className="rightBtn"
                        text="Next"
                        disabled={disabledRight}
                        onClick={this.handleOnClick}
                    />
            </div>
        )
    }
}

export default Pagination
