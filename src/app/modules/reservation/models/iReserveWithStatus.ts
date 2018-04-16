import { IReserve } from './iReserve';
import { ReserveType } from './reserve.enum';

export interface IReserveWithStatus {
    reserve: IReserve;
    status: ReserveType;
}
