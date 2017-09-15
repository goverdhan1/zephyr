declare var _: any;
import {getI18nText} from '../../../utils/messages/messages.en';

function getNestedObjectValue(obj, key) {
    let _keys = key.split('.'),
        _value = obj;
    _.each(_keys, function(_k) {
        _value = _value[_k];
    });
    return _value || '';
}

export class GridUtil {

    static manageSort(data, grid, isTceGrid?): any {
        // console.log('data and grid', data, grid);
        let sortType = data.sortType,
            key = data.key || '',
            dataType = data.dataType,
            isClientGrid = grid.sortedRows.length > grid.size;

        let sortedArray = isClientGrid ? grid.rows : grid.sortedRows;

        if(dataType == 'string') {
            sortedArray = _.orderBy(sortedArray, [function(obj) {
                let _value = getNestedObjectValue(obj, key);
                return _value.toLowerCase();
            }], [sortType]);
        } else {
            sortedArray = _.orderBy(sortedArray, [key], [sortType]);
        }
        if (isClientGrid) {
            grid.rows = sortedArray;
        } else {
            grid.sortedRows = sortedArray;
            grid.rows = this.fetchGridRecords(data, grid, false, isTceGrid);
        }
        return grid;
    }

    static generatePageNumbers(size, totalCount, currentIndex) {
        let pageList = [],
            pageNumber = 1,
            endIndex = Math.ceil(totalCount / size),
            iterateIndex = 0,
            ALLOWED_MAX_PAGE_NUMBERS = 5,
            middleNumber = Math.floor(ALLOWED_MAX_PAGE_NUMBERS/2);

        // If currentIndex >= 5 and less than endIndex + middleNumber, than we increment by middleNumber .
        // At all point, we keep the pages total displayed as 5
        if(currentIndex >= ALLOWED_MAX_PAGE_NUMBERS) { //1
            if(endIndex >= (currentIndex + middleNumber)) {
                pageNumber = currentIndex - middleNumber;
            } else {
                if(totalCount % size != 0) {
                    pageNumber = (endIndex + 1) - ALLOWED_MAX_PAGE_NUMBERS + 1;
                } else {
                    pageNumber = (endIndex + 1) - ALLOWED_MAX_PAGE_NUMBERS;
                }
            }
        }
        //If the Total/Max hit is not equal to 0, we will just add one to it as Round will round it off to previous value
        if(totalCount % size != 0) {
            //If End Index >= ALLOWED_MAX_PAGE_NUMBERS, than we need to only show ALLOWED_MAX_PAGE_NUMBERS links
            if(endIndex >= ALLOWED_MAX_PAGE_NUMBERS) {
                endIndex = ALLOWED_MAX_PAGE_NUMBERS - 1;
            }
            iterateIndex = endIndex;
        } else {
            //If End Index >= ALLOWED_MAX_PAGE_NUMBERS, than we need to only show ALLOWED_MAX_PAGE_NUMBERS links
            if(endIndex >= ALLOWED_MAX_PAGE_NUMBERS) {
                endIndex = ALLOWED_MAX_PAGE_NUMBERS;
            }
            iterateIndex = endIndex;
        }

        for (let index = 0; index < iterateIndex; index++) {
            pageList.push(pageNumber++);
        }
        return pageList;
    }

    static fetchGridRecords(data, grid, wasServiceCalled, isTceGrid?) {
        let size = data.size || grid.size,
            offset = wasServiceCalled ? grid.offset : (grid.currentPage - 1) * size,
            rows = wasServiceCalled ? data : grid.sortedRows.length > size ? grid.sortedRows.slice(offset, size + offset) : grid.sortedRows;

        //if rows obtained is 0 and current page is greater than 1,
        //it fethes data of previous page and accordingly updates the grid state
        //use case - when only row of cuurent page is deleted, it refreshes the data with previous page.
        if (rows && !(rows.length > 0) && (grid.currentPage > 1)) {
            grid.currentPage = grid.currentPage - 1;

            offset = isTceGrid ? 0 : wasServiceCalled ? grid.offset : (grid.currentPage - 1) * size;
            rows = wasServiceCalled ? data : grid.sortedRows.slice(offset, size + offset);
        }

        grid.size = size;
        if(grid.paginationOptions) {

            let _rowIndex = Math.min(size + offset, grid.totalCount);

            grid.paginationOptions.isFirstPage = (offset === 0) ? true : false;
            grid.paginationOptions.isLastPage = ((size + offset) >= grid.totalCount) ? true : false;
            grid.paginationOptions.currentOfTotal = getI18nText('zephyr.grid.pagination.current.of.total',
                [offset + 1, _rowIndex, grid.totalCount]);
            grid.paginationOptions.totalCount = grid.totalCount;
            grid.paginationOptions.pageList = this.generatePageNumbers(size, grid.totalCount, (grid.currentPage));
            grid.paginationOptions.currentIndex = grid.currentPage;
            grid.paginationOptions.lastIndex = Math.ceil(grid.totalCount/size);
            grid.paginationOptions.disabled = false;
            grid.paginationOptions.size = size;
            grid.paginationOptions.show = true;
        }
        if(!grid.totalCount && (!rows || !rows.length)) {
            grid.noData = true;
            if(grid.paginationOptions) {
                grid.paginationOptions.show = false;
            }
        }
        return rows;
    }

    static configureGridColumn(data, grid) {
        let columnId = data.columnId,
            isChecked = data.isChecked;
        _.find(grid.columns, {id: columnId}).show = isChecked;
    }

    static manageGridPagination(paginationType, data, grid, wasServiceCalled) {
        /*grid.currentPage = (paginationType === 'next') ? grid.currentPage + 1 :
                            (paginationType === 'prev') ? grid.currentPage - 1 : grid.currentPage;*/
        grid.rows = this.fetchGridRecords(data, grid, wasServiceCalled);
    }
}
