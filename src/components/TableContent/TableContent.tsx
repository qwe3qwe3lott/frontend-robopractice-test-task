import React from 'react';
import styles from './TableContent.module.scss';
import {DataRecord} from '../../type/DataRecord';
import {minutesToRecordValue} from '../../util/minutesToRecordValue';
import {SortSetup} from '../../type/SortSetup';

type Props = {
    data: DataRecord[]
	sortSetup: SortSetup
}
const TableContent: React.FC<Props> = ({data}) => {
	const totalColumns = data.length > 0 ? data[0].values.length : 0;
	const scrollHandler = (event: React.UIEvent<HTMLUListElement>) => {
		const target = event.target as HTMLElement;
		target.parentElement!.parentElement!.children[0].children[1].scrollLeft = target.scrollLeft;
	};
	return <ul className={styles.layout} style={{gridTemplateRows: `repeat(${data.length}, 1.5em)` }}>
		<ul
			onScroll={scrollHandler}
			className={styles.dataLayout}
			style={{ gridColumn: '2', gridRow: `1/span ${data.length}`, gridTemplateColumns: `repeat(${totalColumns}, 3em)` }}
		>
			{data.map((dataRecord, index) => dataRecord.values.map((value) => <li className={styles.cell} key={value.day} style={{ gridColumn: value.day, gridRow: index+1 }}>
				{minutesToRecordValue(value.value)}
			</li>))}
		</ul>
		{data.map((dataRecord, index) => <li className={styles.heightLightedCell} key={dataRecord.id} style={{ gridColumn: '1', gridRow: index+1 }}>
			{dataRecord.fullName}
		</li>)}
		{data.map((dataRecord, index) => <li className={styles.heightLightedCell} key={dataRecord.id} style={{ gridColumn: '3', gridRow: index+1 }}>
			{minutesToRecordValue(dataRecord.totalValue)}
		</li>)}
	</ul>;
};

export default TableContent;