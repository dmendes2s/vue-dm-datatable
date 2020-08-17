<script lang="tsx">
import { Vue, Component }            from "vue-property-decorator";
import { getModule }                 from "vuex-module-decorators";
import { IPropsColumns, IPropsRows } from "@/types";

import moduleRowState      from "@/store/modules/RowModuleStore";
import modulePaginateState from "@/store/modules/PaginateModuleStore";
import moduleColumnState   from "@/store/modules/ColumnModuleStore";
import moduleSearchState   from "@/store/modules/SearchModuleStore";
import moduleStyleState    from "@/store/modules/StyleModuleStore";

import Translate from "@/utils/translate";

import store from "@/store";

@Component
export default class SearchComponent extends Vue {

    private stateColumn   = getModule(moduleColumnState,store);
    private stateRow      = getModule(moduleRowState,store);
    private statePaginate = getModule(modulePaginateState,store);
    private stateSearch   = getModule(moduleSearchState,store);
    private stateStyle    = getModule(moduleStyleState,store);

    private stringSearch: string[] = [];
    private valueSearch = "";
  
    private findSearchInRows (string: string) {
        
        const columns = this.stateColumn.getColumns;
        const rows = this.stateRow.getRow;

        const stringToUpper = string.toUpperCase();
        const stringToLower = string.toLowerCase(); 
   
        return rows.data.map((row: any) => {  

            let find = false;

            columns.map((column: IPropsColumns) => {
                const columnName = column.name as string;
                const data = String(row[columnName]);   

                if(data.includes(stringToUpper) || data.includes(stringToLower) || data.includes(string)) {
                    find = true;
                }
            });

            row._show = find;
            row._search = find;
           
            return row;
        });
    }

    private get borderInputs () {
        return this.stateStyle.getBorderInputs;
    }

    private search (string: string) {

        this.statePaginate.ActionSetCurrentPage(1);

        if(string === ""){

            const newRows = this.stateRow.getRow.data.map((row: any) => {
                row._search = false;
                row._show = false;
                return row;
            });

            this.stateSearch.ActionSetSearching(false);
            this.statePaginate.ActionSetSearchEmpty(newRows);
            this.stateRow.ActionSetRowsSearchEmpty({data: newRows});
            
            return;
        }

        const newRows = this.findSearchInRows(string);
        
        this.stateSearch.ActionSetSearching(true);
        this.statePaginate.ActionSetSearch(newRows);
        this.stateRow.ActionSetRowsSearch({data: newRows});
    }

    private handleSearch (event: Event) {  
        const value = String((event.target as any).value);
        this.search(value);
    }

    render () {

        return (
            <div class="search">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input 
                    type="text" 
                    class={ this.borderInputs }
                    onKeyup={ this.handleSearch } 
                    value={ this.valueSearch } 
                    placeholder={ Translate.searchPlaceholder() }
                />
            </div>
        );
    }
}
</script>
