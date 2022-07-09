import {DataRecord} from '../../../type/DataRecord';
import {SortSetup} from '../../../type/SortSetup';
import {RowsPerPage} from '../../../enums/RowsPerPage';

export type State = {
    currentPage: number
    rowsPerPage: RowsPerPage
    data: DataRecord[]
    sortSetup: SortSetup
    searchValue: string
}