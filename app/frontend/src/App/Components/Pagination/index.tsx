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
        const { currentPage } = this.state
        const { qtyOfItems, pageLimit } =  this.props
    
        
        if (currentPage === 1) {
            this.setState({ disabledLeft: true })
        } 
        else if (currentPage > 1) {
            this.setState({ disabledLeft: false })
        }

        if (qtyOfItems <= pageLimit) {
            this.setState({ disabledRight: true })
        }
        else {
            this.setState({ disabledRight: false })
        }
    }

    componentDidUpdate(prevProps: IProps) {
        const { currentPage, disabledLeft, disabledRight } = this.state
        const { qtyOfItems, pageLimit } =  this.props

        console.log(`
            qtyOfItems: ${qtyOfItems} \n
            pageLimit: ${pageLimit} \n'
            currentPage: ${currentPage} \n
            disabledLeft: ${disabledLeft} \n
            disabledRight: ${disabledRight}
        `)
        if (prevProps !== this.props) {
            if (currentPage === 1) {
                console.log('cond 1');
                this.setState({ disabledLeft: true })
            } 
            else if (currentPage > 1) {
                console.log('cond 2');
                this.setState({ disabledLeft: false })
            }
    
            if (qtyOfItems <= pageLimit) {
                console.log('cond 3');
                this.setState({ disabledRight: true })
            }
            else {
                console.log('cond 4');
                this.setState({ disabledRight: false })
            }
        }
    }
        

    handleOnClick = (page: number) => {
        const { currentPage } = this.state
        const { qtyOfItems, pageLimit, onChange } =  this.props
    
        if (currentPage === 1) {
            this.setState({ disabledLeft: true })
        } 
        else if (currentPage > 1) {
            this.setState({ disabledLeft: false })
        }

        if (qtyOfItems <= pageLimit) {
            this.setState({ disabledRight: true })
        }
        else {
            this.setState({ disabledRight: false })
        }

        onChange(page)
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
