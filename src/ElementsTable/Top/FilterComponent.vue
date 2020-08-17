<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";
import { IPropsColumns }  from "@/types";

import moduleColumnState from "@/store/modules/ColumnModuleStore";
import moduleStyleState  from "@/store/modules/StyleModuleStore";

import DmSelect from "@/components/DmSelect.vue";

import Translate from "@/utils/translate";

import store from "@/store";

@Component({
    components: {
        DmSelect
    } 
})
export default class FilterComponent extends Vue {

    private stateColumn = getModule(moduleColumnState,store);
    private stateStyle  = getModule(moduleStyleState,store);
    
    private showOptionsFilter = false;
    private columnsSelected: string[] = [];

    private get columns () {
      return this.stateColumn.getColumns;
    }

    private get borderInputs () {
        return this.stateStyle.getBorderInputs;
    }

    private hideShowOptionsFilter () {
        this.showOptionsFilter = false;
    }

    private handleSelected (name: string, selected: boolean) { 

        if(this.columnsSelected.includes(name)){
            const indexName = this.columnsSelected.indexOf(name); 
            this.columnsSelected.splice(indexName,1);
        } else {
            if(!selected){
                this.columnsSelected.push(name);
            }
        }

        if(this.columnsSelected.length <= 0) {
             this.showOptionsFilter = false;
        }

        this.stateColumn.ActionSetColumnSelectedFilter(this.columnsSelected);
    }

    private handleToggleShowOptionsFilter () {
        this.showOptionsFilter = !this.showOptionsFilter;
    }

    render () { 

        const htmlElemnt: JSX.Element[] = [];
        const _class = this.columns.filter((column: IPropsColumns) => column.selectedFilter).length ? "filtering" : "";

        this.columns.map((column: IPropsColumns, index) => {
            const name = column.name as string;
            const title = column.title as string;
            const selected = column.selectedFilter as boolean;
            const _class = selected ? "selected" : "";
            
            htmlElemnt.push(<span class={ _class } onClick={ () => this.handleSelected(name,selected) }>{ title }</span>)
        })

        return (
            <div class="filter">
                <div class="text">{ Translate.textFilter() }</div>      
                <Dm-Select options={ htmlElemnt } selected={ <i class={ 'fa fa-filter ' + _class } aria-hidden="true"></i> } multiple={ true }/>                
            </div>
        );
    }
}
</script>
