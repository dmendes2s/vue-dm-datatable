import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { getRelationshipTotalRowsByAmountPage } from "@/utils/functionsHelper";
import { IRelationshipRowsByAmountPage }        from "@/types";

function transformNumberInArray (restDivision: number) {

    const arrayTotalButtons = [];
    let cont = 1;
 
    while (cont <= restDivision) {
        arrayTotalButtons.push(cont);
        cont++;
    }

    return arrayTotalButtons;
}

function getArrayButtonFull (payload: IRelationshipRowsByAmountPage) {
    const restDivision = getRelationshipTotalRowsByAmountPage(payload.total as number,payload.totalByPage);
    return transformNumberInArray(restDivision);
}

function getListOfArraysButtons (arrayButtonsFull: number[]) {
    return arrayButtonsFull.length > 6 ? [1,2,3,4,5,6] : arrayButtonsFull;  
}

@Module({
    namespaced: true,
    name: "paginate"
})
export default class PaginateModuleStore extends VuexModule {

    private paginate = false;
    private arrayButtons: number[]     = [];
    public arrayButtonsFull: number[] = [];
    private dataPaginate: IRelationshipRowsByAmountPage = {rows: [], total: 0, totalByPage: 0};
    private currentPage = 1;

    public get getPaginate () {
        return this.paginate;
    }

    public get getCurrentPage () {
        return this.currentPage;
    }

    public get getArrayButtons () {
        return this.arrayButtons;
    }

    @Mutation
    private setPaginate (payload: boolean) {
        this.paginate = payload;
    }

    @Mutation
    private setTotalByPage (payload: IRelationshipRowsByAmountPage) {        
        
        const totalSearch = payload.rows.filter(row => row._search).length;
        const totalButtonsBySearch = getRelationshipTotalRowsByAmountPage(totalSearch,payload.totalByPage);

        this.dataPaginate.total = payload.rows.length;
        this.dataPaginate.totalByPage = payload.totalByPage;
        
        this.arrayButtons = [];   
        this.arrayButtonsFull = [];

        if (totalSearch > 0) {          
            for(let i = 1; i<= totalButtonsBySearch; i++){
                this.arrayButtons.push(i);
                this.arrayButtonsFull.push(i);
            }
            return;           
        } 
            
        this.arrayButtonsFull = getArrayButtonFull(this.dataPaginate);
        this.arrayButtons     = getListOfArraysButtons(this.arrayButtonsFull);                   
    }

    @Mutation
    private setSearch (payload: any[]) {
        this.dataPaginate.total = payload.filter(row => row._show).length;
        this.arrayButtonsFull = getArrayButtonFull(this.dataPaginate);
        this.arrayButtons     = getListOfArraysButtons(this.arrayButtonsFull);     
    }

    @Mutation
    private setSearchEmpty (payload: any[]) {
        this.dataPaginate.total = payload.length;
        this.arrayButtonsFull = getArrayButtonFull(this.dataPaginate);
        this.arrayButtons     = getListOfArraysButtons(this.arrayButtonsFull);  
    }

    @Mutation
    private setNext() {
        const arrayButtons = this.arrayButtons.length;      
        const lastNumberArrayTotalButtonsVisible = this.arrayButtons[arrayButtons - 1] + 1;    

        this.arrayButtons.splice(0,1);
        this.arrayButtons.push(lastNumberArrayTotalButtonsVisible);
    }

    @Mutation
    private setPrev() {
        const lastNumberArray = this.arrayButtons[0] - 1;   
        this.arrayButtons.splice(-1,1);
        this.arrayButtons.unshift(lastNumberArray);
    }

    @Mutation
    private setCurrentPage(payload: number) {
        this.currentPage = payload;
    }

    @Action({commit: 'setPaginate'})
    public ActionSetPaginate (payload: boolean) {
        return payload;
    }

    @Action({commit: 'setTotalByPage'})
    public ActionSetTotalByPage (payload: IRelationshipRowsByAmountPage) {
        return payload;
    }

    @Action({commit: 'setNext'})
    public ActionSetNext () {
        return [];
    }

    @Action({commit: 'setPrev'})
    public ActionSetPrev () {
        return [];
    }

    @Action({commit: 'setSearch'})
    public ActionSetSearch (payload: any[]) {
        return payload;
    }

    @Action({commit: 'setSearchEmpty'})
    public ActionSetSearchEmpty (payload: any[]) {
        return payload;
    }

    @Action({commit: 'setCurrentPage'})
    public ActionSetCurrentPage (payload: number) {
        return payload;
    }
}