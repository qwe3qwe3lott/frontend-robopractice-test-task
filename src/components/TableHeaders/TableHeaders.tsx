import React from 'react';
import {DataRecord} from '../../type/DataRecord';
import {SortSetup} from '../../type/SortSetup';
import styles from './TableHeaders.module.scss';
import {setSortSetup} from '../../store/slices/table';
import sorted from '../../assets/sorted.svg';
import notSorted from '../../assets/not-sorted.svg';
import {ResizableColumns, useResizableColumns} from '../../hooks/useResizableColumns';
import {useAppDispatch} from '../../hooks/typedReduxHooks';
type Props = {
	data: DataRecord[]
	sortSetup: SortSetup
}
const TableHeaders: React.FC<Props> = ({data, sortSetup}) => {
	const dispatch = useAppDispatch();
	const {mouseDown} = useResizableColumns();
	const totalColumns = data.length > 0 ? data[0].values.length : 0;
	const headersArray = Array.from(Array(totalColumns), (_, i) => i+1);
	return <ul className={styles.layout}>
		<li className={styles.headerCell}>
			<button onClick={() => dispatch(setSortSetup({byFullName: true}))} className={styles.headerButton}>
				Full Name
				<img
					alt="sort arrow"
					src={sortSetup.byFullName !== undefined ? sorted : notSorted}
					className={styles.sort}
					style={sortSetup.byFullName !== undefined && !sortSetup.ascOrder ? { transform: 'rotate(180deg)' } : undefined}
				/>
			</button>
			<span className={styles.grabberR} onMouseDown={(event) => mouseDown(
				event,
				(width) => width < 20 || width > window.screen.width / 4,
				ResizableColumns.FULL_NAME
			)}/>
		</li>
		<ul className={styles.headersList} style={{gridTemplateColumns: `repeat(${totalColumns}, 3em)`}}>
			{headersArray.map((number) => <li key={number} className={styles.headerCell}>
				<button onClick={() => dispatch(setSortSetup({byDay: number}))} className={styles.headerButton}>
					{number}
					<img
						alt="sort arrow"
						src={sortSetup.byDay === number ? sorted : notSorted}
						className={styles.sort}
						style={sortSetup.byDay === number && !sortSetup.ascOrder ? { transform: 'rotate(180deg)' } : undefined}
					/>
				</button>
				<span className={styles.grabberR} onMouseDown={(event) => mouseDown(
					event,
					(width) => width < 20 || width > 100,
					ResizableColumns.DAY,
					false,
					number
				)}/>
			</li>)}
		</ul>
		<li className={styles.headerCell}>
			<button onClick={() => dispatch(setSortSetup({byTotalTime: true}))} className={styles.headerButton}>
				Total time
				<img
					alt="sort arrow"
					src={sortSetup.byTotalTime !== undefined ? sorted : notSorted}
					className={styles.sort}
					style={sortSetup.byTotalTime !== undefined && !sortSetup.ascOrder ? { transform: 'rotate(180deg)' } : undefined}
				/>
			</button>
			<span className={styles.grabberL} onMouseDown={(event) => mouseDown(
				event,
				(width) => width < 20 || width > window.screen.width / 4,
				ResizableColumns.TOTAL_TIME,
				true
			)}/>
		</li>
	</ul>;
};

export default TableHeaders;