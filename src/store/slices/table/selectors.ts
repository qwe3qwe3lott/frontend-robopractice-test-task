import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../index';

export const selectData = (state: RootState) => state.table.data;
export const selectSortSetup = (state: RootState) => state.table.sortSetup;
export const selectCurrentPage = (state: RootState) => state.table.currentPage;
export const selectRowsPerPage = (state: RootState) => state.table.rowsPerPage;
export const computeSortedData = createSelector(
	[selectData, selectSortSetup],
	(data, sortSetup) => {
		console.log(data);
		console.log(sortSetup);
		if (sortSetup.byFullName) return [...data].sort((a, b) => {
			const c = a.fullName.localeCompare(b.fullName);
			return sortSetup.ascOrder ? c : -c;
		});
		if (sortSetup.byTotalTime) return [...data].sort((a, b) => {
			const c = a.totalValue - b.totalValue;
			return sortSetup.ascOrder ? c : -c;
		});
		if (sortSetup.byDay) return [...data].sort((a, b) => {
			const c = a.values.find(value => value.day === sortSetup.byDay)!.value - b.values.find(value => value.day === sortSetup.byDay)!.value;
			return sortSetup.ascOrder ? c : -c;
		});
		return data;
	}
);
export const computeCurrentData = createSelector(
	[computeSortedData, selectCurrentPage, selectRowsPerPage],
	(data, currentPage, rowsPerPage) => {
		const firstRowIndex = (currentPage-1) * rowsPerPage;
		return data.slice(firstRowIndex, firstRowIndex + Math.min(rowsPerPage, data.length));
	}
);