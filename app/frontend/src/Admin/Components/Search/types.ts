import { ICity } from "src/Admin/Utils/adminTypes";

export interface IProps {
    placeholder: string
    data: ICity[]
    handleUpdateCities: (cities: ICity[]) => void
}


export interface IState {
    inputValue: string
    filteredData: ICity[]
}