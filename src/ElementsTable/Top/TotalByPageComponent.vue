<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";
import { getRelationshipTotalRowsByAmountPage } from "@/utils/functionsHelper";

import moduleTotalByPageState from "@/store/modules/TotalByPageModuleStore";
import moduleRowState         from "@/store/modules/RowModuleStore";
import modulePaginateState    from "@/store/modules/PaginateModuleStore";
import moduleSearchState      from "@/store/modules/SearchModuleStore";
import moduleInfoState        from "@/store/modules/InfoModuleStore";

import DmSelect from "@/components/DmSelect.vue";

import Translate from "@/utils/translate";

import store from "@/store";

@Component({
    components: {
        DmSelect
    } 
})
export default class TotalByPageComponent extends Vue {

    private stateTotalByPage = getModule(moduleTotalByPageState,store);
    private stateRow         = getModule(moduleRowState,store);
    private statePaginate    = getModule(modulePaginateState,store);
    private stateSearch      = getModule(moduleSearchState,store);
    private stateInfo        = getModule(moduleInfoState,store);

    private selected = 0;
 
    private get totalByPage () {
        const totalByPage = this.stateTotalByPage.getTotalByPage;
        this.selected = totalByPage;
        
        return totalByPage;
    }

    private get rows () {
        return this.stateRow.getRow;
    }
  
    private handleTotalByPage (value: number) {
    
        const rows = this.rows.data as [];  
        this.selected = value;

        this.stateRow.ActionSetRowsByPage({
            totalByPage: value,
            isSearching: this.stateSearch.getSearching
        });

        this.statePaginate.ActionSetTotalByPage({rows, totalByPage: value});
        this.statePaginate.ActionSetCurrentPage(1);
        this.stateInfo.ActionSetTotalByPage(value);
    }

    render () {

        const amountOptions = Number(getRelationshipTotalRowsByAmountPage(this.rows.total,this.totalByPage));
        const htmlElemnt: JSX.Element[] = [];

        if(this.totalByPage > this.rows.total) {
            this.selected = this.rows.total;
            htmlElemnt.push(<span onClick={ () => this.handleTotalByPage(this.rows.total) }>{ this.rows.total }</span>); 
        } else {

            for (let i = 1; i <= amountOptions; i++) {
                const multiple = (i * this.totalByPage);
                const value =  multiple <= this.rows.total ? multiple : this.rows.total;
                const _class = this.selected === value ? "selected" : "";
                
                htmlElemnt.push(<span class={ _class } onClick={ () => this.handleTotalByPage(value) }>{ value }</span>);                          
            }
        }   

        return (
            <div class="length">
                <div class="text">{ Translate.totalByPage() }</div>
                <Dm-Select options={ htmlElemnt } selected={ this.selected } multiple={ false } />
            </div>
        );
    }
}
</script>
