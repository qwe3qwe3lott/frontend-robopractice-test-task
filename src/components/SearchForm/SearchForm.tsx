import React, {ChangeEvent, useCallback} from 'react';
import {debounce} from 'lodash';
import {useAppDispatch} from '../../hooks/typedReduxHooks';
import {setSearchValue} from '../../store/slices/table';
import styles from './SearchForm.module.scss';
const SearchForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const handler = useCallback(debounce((event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchValue(event.target.value));
	}, 1000), []);
	return <div className={styles.layout}>
		<label className={styles.labelToLeft}>
        Full name:
			<input className={styles.input} type={'text'} placeholder={'Enter full name...'} onChange={handler}/>
		</label>
	</div>;
};

export default SearchForm;