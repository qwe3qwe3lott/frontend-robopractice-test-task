import React from 'react';

export enum ResizableColumns {
	FULL_NAME,
	DAY,
	TOTAL_TIME
}

export const useResizableColumns = () => {
	let _x = 0;
	let _w = 0;
	let _element: HTMLLIElement | undefined;
	let _widthCondition = (width: number) => !!width;
	let _resizableColumn = ResizableColumns.FULL_NAME;
	let _toLeft = false;
	let _columnNumber = 1;
	const mouseDown = (
		event: React.MouseEvent<HTMLSpanElement>,
		widthCondition: (width: number) => boolean,
		resizableColumn: ResizableColumns,
		toLeft?: boolean,
		columnNumber?: number
	) => {
		_widthCondition = widthCondition;
		_resizableColumn = resizableColumn;
		_toLeft = !!toLeft;
		if (columnNumber) _columnNumber = columnNumber;
		_element = (event.target as HTMLSpanElement).parentElement as HTMLLIElement;
		_x = event.clientX;
		const styles = window.getComputedStyle(_element);
		_w = parseInt(styles.width, 10);
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	};

	const mouseMoveHandler = (event: MouseEvent) => {
		if (!_element) return;
		const dx = _toLeft ? _x - event.clientX : event.clientX - _x;
		// Основываюсь на том, что мы точно знаем в каком порядке и в какой структуре расположены HTML-элементы таблицы
		const dataGrid = (_resizableColumn !== ResizableColumns.DAY ?
			_element.parentElement!.parentElement!.children[1] :
			_element.parentElement!.parentElement!.parentElement!.children[1].children[0]) as HTMLElement;
		const gridTemplateColumns = window.getComputedStyle(dataGrid).gridTemplateColumns.split(' ');
		const width = _w + dx;
		if (_widthCondition(width)) return;
		switch (_resizableColumn) {
		case ResizableColumns.FULL_NAME: {
			_element.parentElement!.style.gridTemplateColumns = dataGrid.style.gridTemplateColumns = `${_w + dx}px 1fr ${gridTemplateColumns[2]}`;
			break;
		}
		case ResizableColumns.DAY:
			gridTemplateColumns[_columnNumber-1] = `${_w + dx}px`;
			_element.parentElement!.style.gridTemplateColumns = dataGrid.style.gridTemplateColumns = gridTemplateColumns.join(' ');
			break;
		case ResizableColumns.TOTAL_TIME: {
			_element.parentElement!.style.gridTemplateColumns = dataGrid.style.gridTemplateColumns = `${gridTemplateColumns[0]} 1fr ${_w + dx}px`;
			break;
		}
		}
	};
	const mouseUpHandler = () => {
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};
	return { mouseDown };
};