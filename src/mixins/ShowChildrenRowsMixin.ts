import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleShowChildrenRowsState from "@/store/modules/ShowChildrenRowsModuleStore";

import store from "@/store";

@Component
export default class ShowChildrenRowsMixin extends Vue {

    private stateShowChildrenRows = getModule(moduleShowChildrenRowsState,store);

    private cloneShowChildrenRows = false;
    private showChildrenRowsMsgWarning = "The showChildrenRows property expects an boolean of data!";

    private showChildrenRowsValidate (showChildrenRows: any) {
        return (typeof showChildrenRows === "boolean");
    }

    private showChildrenRowsValidatePropInit () {

        if (!this.showChildrenRowsValidate(this.$props.showChildrenRows)) {

            writeWarningConsoleTypeDataErrorProp(this.showChildrenRowsMsgWarning);
            this.cloneShowChildrenRows = false;
        } else {
            this.cloneShowChildrenRows = this.$props.showChildrenRows;
        }
    }

    private showChildrenRowsDispatchAction (showChildrenRows: any) {
          this.stateShowChildrenRows.ActionSetShowChildrenRows(showChildrenRows);
    }

    private showChildrenRowsValidatePropWatch (showChildrenRows: any) {
        if (!this.showChildrenRowsValidate(showChildrenRows)) {

            writeWarningConsoleTypeDataErrorProp(this.showChildrenRowsMsgWarning);
            return false;
        }

        return this.$props.showChildrenRows;
    }

    @Watch('cloneShowChildrenRows')
    setCloneShowChildrenRows () {
        this.showChildrenRowsDispatchAction(this.cloneShowChildrenRows);
    }

    // Watch origin Prop
    @Watch('showChildrenRows')
    setShowChildrenRows (showChildrenRows: any) {
        const newShowChildrenRows = this.showChildrenRowsValidatePropWatch(showChildrenRows);
        this.showChildrenRowsDispatchAction(newShowChildrenRows);  
    }

    mounted () {
        this.showChildrenRowsValidatePropInit();
    }
}