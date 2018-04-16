export interface IReserve {
    $loki?: number;
    no: string;
    name?: string;
    note?: string;
    companyType?: string;
    beginDate: {
        year: number;
        month: number;
        day: number;
    };
    endDate: {
        year: number;
        month: number;
        day: number;
    };
}
