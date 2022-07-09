import React, {ChangeEvent, useCallback} from 'react';
import {debounce} from 'lodash';
import {useAppDispatch} from '../../hooks/typedReduxHooks';
import {setSearchValue} from '../../store/slices/table';

const SearchForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const handler = useCallback(debounce((event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (!value) return;
		dispatch(setSearchValue(value));
	}, 1000), []);
	return <label>
        Полное имя:
		<input type={'text'} placeholder={'Введите имя...'} onChange={handler}/>
	</label>;
};

export default SearchForm;