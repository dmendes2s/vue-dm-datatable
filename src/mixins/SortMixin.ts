import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleSortState from "@/store/modules/SortModuleStore";

import store from "@/store";

@Component
export default class SortMixin extends Vue {

    private stateSort = getModule(moduleSortState,store);

    private cloneSort = false;
    private sortMsgWarning = "The sort property expects an boolean of data!";

    private sortValidate (sort: any) {
        return (typeof sort === "boolean");
    }

    private sortValidatePropInit () {

        if (!this.sortValidate(this.$props.sort)) {

            writeWarningConsoleTypeDataErrorProp(this.sortMsgWarning);
            this.cloneSort = false;
        } else {
            this.cloneSort = this.$props.sort;
        }
    }

    private sortDispatchAction (sort: any) {
        this.stateSort.ActionSetSort(sort);
    }

    private sortValidatePropWatch (sort: any) {
        if (!this.sortValidate(sort)) {

            writeWarningConsoleTypeDataErrorProp(this.sortMsgWarning);
            return false;
        }

        return this.$props.sort;
    }

    @Watch('cloneSort')
    setCloneSort () {
        this.sortDispatchAction(this.cloneSort);
    }

    // Watch origin Prop
    @Watch('sort')
    setSort (sort: any) {
        const newSort = this.sortValidatePropWatch(sort);
        this.sortDispatchAction(newSort);  
    }

    mounted () {
        this.sortValidatePropInit();
    }
}