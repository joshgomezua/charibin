export interface IProps {
    qtyOfItems: number
    pageLimit: number
    qtyTotal: number, 
    onChange: (page: number) => void
}

export interface IState {
    currentPage: number
    disabledLeft: boolean
    disabledRight: boolean
}