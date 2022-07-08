import React, {useEffect} from 'react';
import Table from '../../components/Table/Table';
import styles from './TablePage.module.scss';
import {useAppDispatch} from '../../hooks/typedReduxHooks';
import {fetchData} from '../../store/slices/table';
const TablePage: React.FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchData());
	}, []);
	return <main className={styles.layout}>
		<Table/>
	</main>;
};

export default TablePage;