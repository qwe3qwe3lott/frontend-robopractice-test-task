import {DataRecordValue} from './DataRecordValue';

export type DataRecord = {
    id: number
    fullName: string
    values: DataRecordValue[]
    totalValue: number
}