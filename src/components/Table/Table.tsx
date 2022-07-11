import React from 'react';
import styles from './Table.module.scss';
import {useAppSelector} from '../../hooks/typedReduxHooks';
import {computeCurrentData, selectSortSetup} from '../../store/slices/table/selectors';
import TableHeaders from '../TableHeaders';
import TableContent from '../TableContent';

const Table: React.FC = () => {
	const data = useAppSelector(computeCurrentData);
	const sortSetup = useAppSelector(selectSortSetup);
	if (data.length <= 0) return null;
	return <ul className={styles.layout}>
		<TableHeaders data={data} sortSetup={sortSetup}/>
		<TableContent data={data} sortSetup={sortSetup}/>
	</ul>;
};

export default Table;
