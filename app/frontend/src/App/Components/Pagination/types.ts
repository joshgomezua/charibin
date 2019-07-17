import { IPagination } from "src/Admin/Containers/Tickets/types";

export interface IProps {
    pagination: IPagination
    onChange: (page: number) => void
}

export interface IState {
    disabledLeft: boolean
    disabledRight: boolean
    state: STATE
}

export enum STATE {
    FIRST_PAGE_NOT_FULL = "first page not full",
    FIRST_PAGE_FULL = "first page full",
    EMPTY = "empty",
    FIRST_PAGE_FULL_WITH_MORE = "first page full with more",
    MIDDLE_PAGE = "middle page",
    LAST_PAGE = "last page"
}

