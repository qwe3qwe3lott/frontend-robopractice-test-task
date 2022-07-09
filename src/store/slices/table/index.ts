import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State} from './types';
import {RootState} from '../../index';
import {DataRecord} from '../../../type/DataRecord';
import {DataRecordDto} from '../../../dto/DataRecordDto';
import {DataRecordValue} from '../../../type/DataRecordValue';
import {recordDtoTimeToMinutes} from '../../../util/recordDtoTimeToMinutes';
import {SortSetup} from '../../../type/SortSetup';
import {RowsPerPage} from '../../../enums/RowsPerPage';

const initialState: State = {
	currentPage: 1,
	rowsPerPage: RowsPerPage.FEW,
	data: [],
	sortSetup: { ascOrder: true, byFullName: true },
	searchValue: ''
};

const slice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setSortSetup(state, action: PayloadAction<Omit<SortSetup, 'ascOrder'>>) {
			if ('byFullName' in action.payload && action.payload.byFullName === state.sortSetup.byFullName
				|| 'byTotalTime' in action.payload && action.payload.byTotalTime === state.sortSetup.byTotalTime ||
				'byDay' in action.payload && action.payload.byDay === state.sortSetup.byDay) {
				state.sortSetup = { ...action.payload, ascOrder: !state.sortSetup.ascOrder };
				return;
			}
			state.sortSetup = { ...action.payload, ascOrder: true };
		},
		setRowsPerPage(state, action: PayloadAction<RowsPerPage>) {
			state.rowsPerPage = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage(state, action: PayloadAction<number>) { state.currentPage = action.payload; },
		setSearchValue(state, action: PayloadAction<string>) { state.searchValue = action.payload; }
	},
	extraReducers(builder) {
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.data = action.payload;
		});
	}
});

export const fetchData = createAsyncThunk<DataRecord[], void, {state: RootState}>(
	'table/fetchData',
	async function () {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users`);
		if (!response.ok) return [];
		const dataDto = await response.json() as DataRecordDto[];
		const data: DataRecord[] = [];
		let maxDays = 0;
		for (const dataRecordDto of dataDto) {
			const values: DataRecordValue[] = [];
			let totalMinutes = 0;
			for (const day of dataRecordDto.Days) {
				const minutes = recordDtoTimeToMinutes(day.End) - recordDtoTimeToMinutes(day.Start);
				totalMinutes += minutes;
				const dayNumber = +day.Date.substring(8,10);
				if (dayNumber > maxDays) maxDays = dayNumber;
				values.push({
					day: dayNumber,
					value: minutes
				});
			}
			data.push({
				id: dataRecordDto.id,
				fullName: dataRecordDto.Fullname,
				values,
				totalValue: totalMinutes
			});
		}
		const allDays = Array.from(Array(maxDays), (_, i) => i+1);
		for (const dataRecord of data) {
			const days = dataRecord.values.map(value => value.day);
			const daysToCreate = allDays.filter(day => !days.includes(day));
			for (const day of daysToCreate) {
				dataRecord.values.push({
					day,
					value: 0
				});
			}
		}
		return data;
	},
	{
		condition: (_, {getState}): boolean => getState().table.data.length === 0
	}
);

export const {setSortSetup, setCurrentPage, setRowsPerPage, setSearchValue} = slice.actions;
export default slice.reducer;