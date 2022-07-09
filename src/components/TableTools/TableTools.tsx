import React from 'react';
import styles from './TableTools.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {
	computeTableInfo,
	computeTotalPages,
	selectCurrentPage,
	selectRowsPerPage
} from '../../store/slices/table/selectors';
import {setCurrentPage, setRowsPerPage} from '../../store/slices/table';
import {RowsPerPage} from '../../enums/RowsPerPage';
const TableTools: React.FC = () => {
	return <div className={styles.layout}>
		<InfoBlock/>
		<NavBlock/>
	</div>;
};

export default TableTools;

const InfoBlock: React.FC = () => {
	const info = useAppSelector(computeTableInfo);
	return <p className={styles.info}>{info}</p>;
};

let array: [string | RowsPerPage, string | RowsPerPage][] = Object.entries(RowsPerPage);
array = array.splice(0, array.length/2);
const rowsPerPageList = array.map(el => el[0] as number);
const NavBlock: React.FC = () => {
	return <div className={styles.horizontalLayout}>
		<RowsPerPageBlock/>
		<CurrentPageBlock/>
	</div>;
};

const RowsPerPageBlock: React.FC = () => {
	const dispatch = useAppDispatch();
	const rowsPerPage = useAppSelector(selectRowsPerPage);
	return <label className={styles.labelLeft}>
		Rows per page:
		<select className={styles.rowsPicker} value={rowsPerPage} onChange={(event) => dispatch(setRowsPerPage(+event.target.value))}>
			{rowsPerPageList.map(value => <option key={value}>
				{value}
			</option>)}
		</select>
	</label>;
};

const CurrentPageBlock: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(selectCurrentPage);
	const totalPages = useAppSelector(computeTotalPages);
	const isThisFirstPage = totalPages === 1;
	const isThisLastPage = currentPage === totalPages;
	const totalPagesArray = Array.from(Array(totalPages), (_, i) => i + 1);
	return <div className={styles.horizontalLayout}>
		<button
			className={[styles.pageChooserButton, styles.pageChooserPrevious].join(' ')}
			disabled={isThisFirstPage}
			onClick={() => dispatch(setCurrentPage(currentPage - 1))}
		/>
		<select
			className={styles.pageChooser}
			onChange={(event) => dispatch(setCurrentPage(+event.target.value))}
			value={currentPage}
			disabled={isThisFirstPage && isThisLastPage}
		>
			{totalPagesArray.map(value => <option key={value} value={value} hidden>
				{`${value}/${totalPages}`}
			</option>)}
			{totalPagesArray.map(value => <option key={value}>
				{value}
			</option>)}
		</select>
		<button
			className={[styles.pageChooserButton, styles.pageChooserNext].join(' ')}
			disabled={isThisLastPage}
			onClick={() => dispatch(setCurrentPage(currentPage + 1))}
		/>
	</div>;
};