import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { orderBy, toLower }                     from "lodash";
import { IPropsRows, IInfoSort }                from "@/types";
import { 
    setPropShowByAmountPage,
    filterRowsStatePaginate, 
    setPropPage,
    setPropSearch,
    clearRowPage
} from "@/utils/functionsHelper";


function configRowsShowSearch(rows: any[] | undefined, totalByPage: number) {

    let cont = 1;
    let page = 1;

    return rows?.map(row => {

        row._page = 0;
        
        if (row._show) {
            if (cont === totalByPage) {
                row._page = page;
                page++;
                cont = 1;
            } else{
                row._page = page;
                cont++;
            }
        }

        return row;
    });
}

function configRowsShow(rows: any[] | undefined, totalByPage: number) {
    
    let cont = 1;
    let page = 1;

    return rows?.map((row: any) => {  
        
        row._page = 0;

        if (row._search) {
            row._show = true;
            
            if (cont === totalByPage) {
                row._page = page;
                page++;
                cont = 1;
            } else{
                row._page = page;
                cont++;
            }
        }

       return row;
    }) as [];
}

@Module({
    namespaced: true,
    name: "row"
})
export default class RowModuleStore extends VuexModule {

    private row = { data: [], total: 0, totalByPage: 0 };

    public get getRow () {
        return this.row;
    }

    @Mutation
    private setRows (payload: IPropsRows) { 
        let rows = setPropPage(payload.data,payload.totalByPage as number);  
        rows = setPropSearch(rows);  

        this.row.total = payload.data?.length as number;
        this.row.totalByPage = payload.totalByPage as number;  
        this.row.data = setPropShowByAmountPage(rows,this.row.totalByPage);
    }

    @Mutation
    private handleSort (payload: IInfoSort) {
        const type = payload.type === 1 ? "asc" : "desc";
        this.row.data = orderBy(this.row.data,payload.columnName,type); 
    }

    @Mutation
    private setRowsByPage (payload: {totalByPage:number, isSearching: boolean}) {

        let rows = clearRowPage(this.row.data) as [];
        this.row.totalByPage = payload.totalByPage;

        if (payload.isSearching) {   
            this.row.data = configRowsShow(rows,payload.totalByPage);
        } else {
            rows = setPropPage(rows,payload.totalByPage) as [];
            rows = setPropShowByAmountPage(rows,payload.totalByPage);
            this.row.data = rows as [];
        }
    }

    @Mutation
    private rowsSearch (payload: IPropsRows) {  
        let rows = clearRowPage(payload.data);
        rows = configRowsShowSearch(rows,this.row.totalByPage);
        this.row.data = rows as [];
    }

    @Mutation
    private rowsSearchEmpty (payload: IPropsRows) {
        let rows = clearRowPage(payload.data);
        rows = setPropPage(rows,this.row.totalByPage);
        this.row.data = setPropShowByAmountPage(rows,this.row.totalByPage);  
    }

    @Mutation
    private rowsPaginate (payload: number) {
        this.row.data = filterRowsStatePaginate(this.row.data,payload);  
    }

    @Action({commit: 'setRows'})
    public ActionSetRows (payload: IPropsRows) {
        return payload;
    }

    @Action({commit: 'handleSort'})
    public ActionHandleSort (payload: IInfoSort) {
        return payload;
    }

    @Action({commit: 'setRowsByPage'})
    public ActionSetRowsByPage(payload: {totalByPage:number, isSearching: boolean}){
        return payload;
    }

    @Action({commit: 'rowsSearch'})
    public ActionSetRowsSearch(payload: IPropsRows){
        return payload;
    }

    @Action({commit: 'rowsSearchEmpty'})
    public ActionSetRowsSearchEmpty(payload: IPropsRows){
        return payload;
    }

    @Action({commit: 'rowsPaginate'})
    public ActionSetRowsPaginate(payload: number){
        return payload;
    }
}