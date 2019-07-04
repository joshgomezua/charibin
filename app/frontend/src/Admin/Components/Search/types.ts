import { ICity } from "src/Admin/Utils/adminTypes";

export interface IProps {
    placeholder: string
    handleSearchCity: (name: string) => void
}


export interface IState {
    inputValue: string
    filteredData: ICity[]
}