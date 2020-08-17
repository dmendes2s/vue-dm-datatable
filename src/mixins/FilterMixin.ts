import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleFilterState from "@/store/modules/FilterModuleStore";
import moduleColumnState from "@/store/modules/ColumnModuleStore";

import store from "@/store";

@Component
export default class FilterMixin extends Vue {

    private stateFilter = getModule(moduleFilterState,store);
    private stateColumn = getModule(moduleColumnState,store);

    private cloneFilter = false;
    private filterMsgWarning = "The filter property expects an boolean of data!";

    private filterValidate (filter: any) {
        return (typeof filter === "boolean");
    }

    private filterValidatePropInit () {

        if (!this.filterValidate(this.$props.filter)) {

            writeWarningConsoleTypeDataErrorProp(this.filterMsgWarning);
            this.cloneFilter = false;
        } else {
            this.cloneFilter = this.$props.filter;
        }
    }

    private filterDispatchActionMounted (filter: any) {
        this.stateFilter.ActionSetFilter(filter);
    }

    private filterDispatchActionWatch (filter: any) {
        this.stateFilter.ActionSetFilter(filter);
        this.stateColumn.ActionSetColumnSelectedFilter([]);
    }

    private filterValidatePropWatch (filter: any) {
        if (!this.filterValidate(filter)) {

            writeWarningConsoleTypeDataErrorProp(this.filterMsgWarning);
            return false;
        }

        return this.$props.filter;
    }

    @Watch('cloneFilter')
    setCloneFilter () {
        this.filterDispatchActionMounted(this.cloneFilter);
    }

    // Watch origin Prop
    @Watch('filter')
    setFilter (filter: any) {
        const newFilter = this.filterValidatePropWatch(filter);
        this.filterDispatchActionWatch(newFilter);  
    }

    mounted () {
        this.filterValidatePropInit();
    }
}