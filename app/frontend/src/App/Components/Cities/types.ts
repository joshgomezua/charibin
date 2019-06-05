import {ICity} from '../../../Admin/Components/MultiSwitch/types';

export interface ICities extends ICity {
    country: string;
    picture: string;
    tags: string;   // can be an array
    isModify: boolean;
    isEnable: boolean;
}