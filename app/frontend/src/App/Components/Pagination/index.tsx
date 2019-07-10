import React from 'react'
//import classnames from 'classnames'
import { IProps, IState } from './types'
//import arrowDown from '../../../Common/Utils/Media/arrowDown.svg'
//import './styles.scss'
import Button from 'src/Common/Components/Button';

class Pagination extends React.Component<IProps, IState> {

    readonly state: IState = {
        currentPage: 1,
        disabledLeft: false,
        disabledRight: false
    }

    componentDidMount() {
        // calculate if more page is required before setting the 2 buttons disablement
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
        const { disabledLeft, disabledRight, currentPage } = this.state

        return (
            <div>
                <Button
                    text="clear dates"
                    variant="gray"
                    icon="cross"
                    disabled={disabledLeft}
                    onClick={this.handleOnClick}
                />

                <p>{ currentPage }</p>

                <Button
                    text="clear dates"
                    variant="gray"
                    icon="cross"
                    disabled={disabledRight}
                    onClick={this.handleOnClick}
                />
            </div>
        )
    }
}

export default Pagination
