<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";

import moduleRowState         from "@/store/modules/RowModuleStore";
import moduleTotalByPageState from "@/store/modules/TotalByPageModuleStore";
import moduleInfoState        from "@/store/modules/InfoModuleStore";
import modulePaginateState    from "@/store/modules/PaginateModuleStore";
import moduleSearchState      from "@/store/modules/SearchModuleStore";

import Translate from "@/utils/translate";

import store from "@/store";

@Component
export default class InfoComponent extends Vue {

    private stateRow         = getModule(moduleRowState,store);   
    private stateTotalByPage = getModule(moduleTotalByPageState,store);
    private stateInfo        = getModule(moduleInfoState,store);
    private statePaginate    = getModule(modulePaginateState,store);
    private stateSearch      = getModule(moduleSearchState,store);

    private get rows () {
        return this.stateRow.getRow;
    }

    private get totalByPage () {
        return this.stateTotalByPage.getTotalByPage;
    }   

    private get isSearching () {
        return this.stateSearch.getSearching;
    }     

    private get totalByPageCurrent () {
        return this.stateInfo.getTotalByPage;
    }

    private get currentPage () {
        return this.statePaginate.getCurrentPage;
    }

    private getTotalSearch () {
        return this.rows.data.filter((row: any) => row._search).length;
    }

    private getTotalShowPage () {
        return this.isSearching 
        ? this.rows.data.filter((row: any) => row._page === this.currentPage).length 
        : this.totalByPageCurrent;
    }

    private totalByPageSearching (totalShowPage: number) {
        const totalSearch = this.getTotalSearch();

        if( (totalShowPage * this.currentPage) <= totalSearch ) {
            return ( ( (totalShowPage * this.currentPage) / this.totalByPageCurrent) < this.totalByPageCurrent) 
            ? this.totalByPageCurrent 
            : (totalShowPage * this.currentPage);
        } 
        
        return totalShowPage; 
    }

    private totalByPageDefault () {
        return (this.totalByPageCurrent * this.currentPage) <= this.rows.total 
        ? (this.totalByPageCurrent * this.currentPage) 
        : this.rows.total;
    }

    private getTotalByPage (totalShowPage: number) {
        if (totalShowPage <= 0) { return 0; }
        return this.isSearching ? this.totalByPageSearching(totalShowPage) : this.totalByPageDefault();
    }

    private getTotalVisible () {
        return this.isSearching ? this.getTotalSearch() : this.rows.total;
    }

    render() {      
        
        if (this.rows.total <= 0) { return; }  
        
        const totalShowPage = this.getTotalShowPage();
        const totalByPage = this.getTotalByPage(totalShowPage);
        const totalVisible = this.getTotalVisible();
        const search = { isSearching: this.isSearching, total: this.rows.total }
    
        return <div class="info">
            { Translate.info(totalShowPage,totalByPage,totalVisible,search) }
        </div>
    }
}
</script>