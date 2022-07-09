import React from 'react';
import TableContent from '../TableContent/TableContent';

import styles from './Table.module.scss';
import {useAppDispatch, useAppSelector} from '../../hooks/typedReduxHooks';
import {computeCurrentData} from '../../store/slices/table/selectors';
import {setSortSetup} from '../../store/slices/table';
import {ResizableColumns, useResizableColumns} from '../../hooks/useResizableColumns';
import {minutesToRecordValue} from '../../util/minutesToRecordValue';

const Table: React.FC = () => {
	const data = useAppSelector(computeCurrentData);
	const dispatch = useAppDispatch();
	const {mouseDown} = useResizableColumns();
	return <ul className={styles.layout}>
		<li className={styles.headerCell}>
			<button onClick={() => dispatch(setSortSetup({byFullName: true}))} className={styles.headerButton}>Full Name</button>
			<span className={styles.grabberR} onMouseDown={(event) => mouseDown(
				event,
				(width) => width < 20 || width > window.screen.width / 4,
				ResizableColumns.FULL_NAME
			)}/>
		</li>
		{data.map((dataRecord, index) => <li className={styles.fullNameCell} key={dataRecord.id} style={{ gridColumn: '1', gridRow: index+2 }}>
			{dataRecord.fullName}
		</li>)}
		<TableContent layoutStyles={{ gridColumn: '2', gridRow: `1/${data.length + 2}` }} data={data}/>
		<li className={styles.headerCell}>
			<button onClick={() => dispatch(setSortSetup({byTotalTime: true}))} className={styles.headerButton}>Total Time</button>
			<span className={styles.grabberL} onMouseDown={(event) => mouseDown(
				event,
				(width) => width < 20 || width > window.screen.width / 6,
				ResizableColumns.TOTAL_TIME,
				true
			)}/>
		</li>
		{data.map((dataRecord, index) => <li className={styles.totalCell} key={dataRecord.id} style={{ gridColumn: '3', gridRow: index+2 }}>
			{minutesToRecordValue(dataRecord.totalValue)}
		</li>)}
	</ul>;
};

export default Table;