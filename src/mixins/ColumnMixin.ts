import { Vue, Watch }    from "vue-property-decorator";
import { getModule }     from "vuex-module-decorators";
import { IPropsColumns } from "@/types";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleColumnState from "@/store/modules/ColumnModuleStore";

import store from "@/store";

@Component
export default class ColumnMixin extends Vue {

    private stateColumn = getModule(moduleColumnState,store);

    private cloneColumns: IPropsColumns[] = [];
    private columnsMsgWarning = "The columns property expects an array of data. Columns should look like this {name: string, title: string}";

    private columnsValidate (columns: any) {
        return Array.isArray(columns);
    }

    private columnsValidatePropInit () {
        if (!this.columnsValidate(this.$props.columns)) {
            
            writeWarningConsoleTypeDataErrorProp(this.columnsMsgWarning);
            this.cloneColumns = [];
        } else {
            this.cloneColumns = this.$props.columns;
        }
    }

    private columnsValidatePropWatch (columns: any) {
        if (!this.columnsValidate(columns)) {
            
            writeWarningConsoleTypeDataErrorProp(this.columnsMsgWarning);
            return [];
        }

        return this.$props.columns;
    }

    private columnsDispatchAction (columns: any) {
        this.stateColumn.ActionSetColumns(columns);    
    }

    @Watch('cloneColumns')
    setCloneColumns () {
        this.columnsDispatchAction(this.cloneColumns);    
    }

    // Watch origin Prop
    @Watch('columns')
    setColumns (columns: any) {
       const newColumns = this.columnsValidatePropWatch(columns);
       this.columnsDispatchAction(newColumns);   
    }

    mounted () { 
        this.columnsValidatePropInit();
    }
}