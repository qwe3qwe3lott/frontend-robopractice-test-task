import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../index';

export const selectData = (state: RootState) => state.table.data;
export const selectSortSetup = (state: RootState) => state.table.sortSetup;
export const selectCurrentPage = (state: RootState) => state.table.currentPage;
export const selectRowsPerPage = (state: RootState) => state.table.rowsPerPage;
export const selectSearchValue = (state: RootState) => state.table.searchValue;
export const computeFilteredData = createSelector(
	[selectData, selectSearchValue],
	(data, searchValue) => {
		return data.filter(dataRecord => dataRecord.fullName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
	}
);
export const computeSortedData = createSelector(
	[computeFilteredData, selectSortSetup],
	(data, sortSetup) => {
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
export const computeTotalPages = createSelector(
	[selectData, selectRowsPerPage],
	(data, rowsPerPage) => {
		const value = Math.ceil(data.length / rowsPerPage);
		return value < 1 ? 1 : value;
	}
);
export const computeTableInfo = createSelector(
	[selectData, selectCurrentPage, selectRowsPerPage, computeTotalPages],
	(data, currentPage, rowsPerPage, totalPages) => {
		const firstRowIndex = (currentPage-1) * rowsPerPage;
		const isThisLastPage = totalPages === currentPage;
		return `${firstRowIndex+1}-${isThisLastPage ? data.length : currentPage * rowsPerPage} of ${data.length}`;
	}
);