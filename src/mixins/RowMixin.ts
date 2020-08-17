import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { IPropsRows } from "@/types";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleRowState from "@/store/modules/RowModuleStore";

import store from "@/store";

@Component
export default class RowMixin extends Vue {

    private stateRow = getModule(moduleRowState,store);

    private cloneRows: IPropsRows = {};
    private rowsMsgWarning = "The rows property expects an object of data. Rows should look like this {data: [ {propName: type, propName: type}, ... ]}";

    private rowsValidate (rows: any) {
        
        if (typeof rows === "object" ) {     
            if (Array.isArray(rows)) {
                return false;
            }

            return true;
        } 

        return false;
    }

    private rowsValidatePropInit () {

        if (!this.rowsValidate(this.$props.rows)) {

            writeWarningConsoleTypeDataErrorProp(this.rowsMsgWarning);
            this.cloneRows = { data: [] }
        } else {
            this.cloneRows = this.$props.rows;
        }
    }

    private rowsValidatePropWatch (rows: any) {
        if (!this.rowsValidate(rows)) {

            writeWarningConsoleTypeDataErrorProp(this.rowsMsgWarning);
            return { data: [] };
        }

        return this.$props.rows;
    }

    private rowsDispatchAction (rows: any) {

        const row = {
            data: this.configDataRows(rows), 
            totalByPage: this.$props.totalByPage
        }

        this.stateRow.ActionSetRows(row);
    }

    private configDataRows (rows: any) {
        return rows.data !== undefined ? rows.data : [];
    }

    @Watch('cloneRows')
    setCloneRows () {
        this.rowsDispatchAction(this.cloneRows);
    }

    // Watch origin Prop
    @Watch('rows')
    setRows (rows: any) {
        const newRows = this.rowsValidatePropWatch(rows);
        this.rowsDispatchAction(newRows);  
    }

    mounted () {
        this.rowsValidatePropInit();
    }
}