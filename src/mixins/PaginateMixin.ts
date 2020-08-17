import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import modulePaginateState from "@/store/modules/PaginateModuleStore";

import store from "@/store";

@Component
export default class PaginateMixin extends Vue {

    private statePaginate = getModule(modulePaginateState,store);

    private clonePaginate = false;
    private paginateMsgWarning = "The paginate property expects an boolean of data!";


    private paginateValidate (paginate: any) {
        return (typeof paginate === "boolean");
    }

    private paginateValidatePropInit () {

        if (!this.paginateValidate(this.$props.paginate)) {

            writeWarningConsoleTypeDataErrorProp(this.paginateMsgWarning);
            this.clonePaginate = false;
        } else {
            this.clonePaginate = this.$props.paginate;
        }
    }

    private paginateDispatchAction (paginate: any) {
        this.statePaginate.ActionSetPaginate(paginate);
        this.statePaginate.ActionSetCurrentPage(1);
    }

    private paginateValidatePropWatch (paginate: any) {
        if (!this.paginateValidate(paginate)) {

            writeWarningConsoleTypeDataErrorProp(this.paginateMsgWarning);
            return false;
        }

        return this.$props.paginate;
    }

    @Watch('clonePaginate')
    setClonePaginate () {
        this.paginateDispatchAction(this.clonePaginate);
    }

    // Watch origin Prop
    @Watch('paginate')
    setPaginate (paginate: any) {
        const newPaginate = this.paginateValidatePropWatch(paginate);
        this.paginateDispatchAction(newPaginate);
    }

    mounted () {
        this.paginateValidatePropInit();
    }
}