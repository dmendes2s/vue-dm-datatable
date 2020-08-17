const clearRowPage = (rows: any[] | undefined) => {
    return rows?.map(row => {
        row._page = 0; 
        return row;
    });
}

const setPropShowByAmountPage = (data: any[] | undefined, totalByPage: number) => {
    return data?.map((row,index) => {
        row._show = (index < totalByPage) ? true : false;
        return row;
    }) as [];     
}

const filterRowsStatePaginate = (data: any[] | undefined, pageCurrent: number) => {

    const isSearch = data?.filter(row => row._search).length as number;

    if(isSearch <= 0){
        return data?.map(row => {
            row._show = row._page === pageCurrent ? true : false;
            return row;
        }) as []; 
    }

    return data?.map(row => {
        row._show = (row._page === pageCurrent && row._search) ? true : false;
        return row;  
    }) as [];     
}

const setPropPage = (data: any[] | undefined, totalByPage: number) => {

    let cont = 1, page = 1;

    return data?.map(row => {        
        if(cont === totalByPage){
            row._page = page;
            page++;
            cont = 1;
        }else{
            row._page = page;
            cont++;
        }
        return row;
    });
}

const setPropSearch = (data: any[] | undefined) => {
    return data?.map(row => {
        row._search = false;
        return row;
    }) as [];
}

function getRelationshipTotalRowsByAmountPage (total:number, totalByPage:number) {
    const restDivision = Math.round(total / totalByPage);  
    return (restDivision * totalByPage) < total ? (restDivision + 1) : restDivision; 
}

function writeWarningConsoleTypeDataErrorProp (msg: string) {
    console.warn(msg);
}

export {
    clearRowPage,
    setPropShowByAmountPage,
    filterRowsStatePaginate,
    setPropPage,
    setPropSearch,
    getRelationshipTotalRowsByAmountPage,
    writeWarningConsoleTypeDataErrorProp
}