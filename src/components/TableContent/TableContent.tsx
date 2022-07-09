import React from 'react';
import styles from './TableContent.module.scss';
import {DataRecord} from '../../type/DataRecord';
import {useAppDispatch} from '../../hooks/typedReduxHooks';
import {setSortSetup} from '../../store/slices/table';
import {ResizableColumns, useResizableColumns} from '../../hooks/useResizableColumns';
import {minutesToRecordValue} from '../../util/minutesToRecordValue';

type Props = {
    layoutStyles: object
    data: DataRecord[]
}
const TableContent: React.FC<Props> = ({layoutStyles, data}) => {
	const dispatch = useAppDispatch();
	const totalColumns = data.length > 0 ? data[0].values.length : 0;
	const headersArray = Array.from(Array(totalColumns), (_, i) => i+1);
	const {mouseDown} = useResizableColumns();
	return <ul style={{ ...layoutStyles, gridTemplateColumns: `repeat(${totalColumns}, 3em)` }} className={styles.layout}>
		{headersArray.map((number) => <li key={number} className={styles.headerCell}>
			<button onClick={() => dispatch(setSortSetup({byDay: number}))} className={styles.headerButton}>{number}</button>
			<span className={styles.grabber} onMouseDown={(event) => mouseDown(
				event,
				(width) => width < 20 || width > 100,
				ResizableColumns.DAY,
				false,
				number
			)}/>
		</li>)}
		{data.map((dataRecord, index) => dataRecord.values.map((value) => <li className={styles.cell} key={value.day} style={{ gridColumn: value.day, gridRow: index+2 }}>
			{minutesToRecordValue(value.value)}
		</li>))}
	</ul>;
};

export default TableContent;