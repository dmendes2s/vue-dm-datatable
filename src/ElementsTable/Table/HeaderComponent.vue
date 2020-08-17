<script lang="tsx">
import { Vue, Component, } from "vue-property-decorator";
import { getModule }       from "vuex-module-decorators";
import { IPropsColumns, IInfoSort, IPropsActionsRow } from "@/types";

import moduleColumnState           from "@/store/modules/ColumnModuleStore";
import moduleSortState             from "@/store/modules/SortModuleStore";
import moduleRowState              from "@/store/modules/RowModuleStore";
import moduleShowChildrenRowsState from "@/store/modules/ShowChildrenRowsModuleStore";
import moduleActionsRowStore       from "@/store/modules/ActionsRowModuleStore";

import Translate from "@/utils/translate";

import store from "@/store";

@Component
export default class HeaderComponent extends Vue {

    private stateColumn            = getModule(moduleColumnState,store);
    private stateSort              = getModule(moduleSortState,store);
    private stateRow               = getModule(moduleRowState,store);
    private stateShowChildrenRows  = getModule(moduleShowChildrenRowsState,store);
    private stateActionsRow        = getModule(moduleActionsRowStore,store);

    private infoSort: IInfoSort = {type: 1, columnName: ""};

    private get columns() {
        return this.stateColumn.getColumns;
    }

    private get sort () {
        return this.stateSort.getSort;
    }

    private get showChildrenRows () {
      return this.stateShowChildrenRows.getShowChildrenRows;
    }

    private get ActionsRow () {
      return this.stateActionsRow.getActionsRow;
    }

    private handleSort (columnName: string) {
        this.infoSort.columnName = columnName;
        this.infoSort.type = this.infoSort.type === 1 ? -1 : 1;
        this.stateRow.ActionHandleSort(this.infoSort);
    }

    private withSort () {   
        const columnsShow = this.columns.filter((column: IPropsColumns) => column.show); 
        
        return columnsShow.map((column: IPropsColumns) => {
            if(column.name === this.infoSort.columnName) {
                return (
                    <th class="sort" onClick={() => this.handleSort(column.name as string)}>
                        <span class="name">{column.title}</span>
                        <span class="icons">                
                        {
                            this.infoSort.type === -1
                            ? <i class="fa fa-sort-desc" aria-hidden="true"></i>  
                            : <i class="fa fa-sort-asc" aria-hidden="true"></i>    
                        }                               
                        </span>
                    </th>
                );
            }

            return (
                <th class="sort" onClick={ () => this.handleSort(column.name as string) }>
                    <span class="name">{ column.title }</span>
                    <span class="icons"><i class="fa fa-sort" aria-hidden="true"></i></span>
                </th>
            );            
        });
    }

    private notSort () {
        const columnsShow = this.columns.filter((column: IPropsColumns) => column.show);
        return columnsShow.map((column: IPropsColumns) => {
             return <th><span class="name">{ column.name }</span></th>;
        });
    }

    render () {   

        return (
            <thead>
                <tr>
                    { this.showChildrenRows && <th><span>{ Translate.textDetailRows() }</span></th> }
                    { this.sort ? this.withSort() : this.notSort() }
                    { this.ActionsRow.length > 0 && <th><span>{ Translate.textActionsRow() }</span></th> }
                </tr>
            </thead>
        );
    }  
}
</script>
