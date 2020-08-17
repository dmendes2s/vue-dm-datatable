import { Vue, Watch }       from "vue-property-decorator";
import { getModule }        from "vuex-module-decorators";
import { IPropsActionsRow } from "@/types";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleActionsRowState from "@/store/modules/ActionsRowModuleStore";

import store from "@/store";

@Component
export default class ActionsRowMixin extends Vue {

    private stateActionsRow = getModule(moduleActionsRowState,store);
    
    private cloneActionsRow: IPropsActionsRow[] = [];
    private actionsRowMsgWarning = "The actionsRow property expects an array of data. actionsRow should look like this {title: string, type: string, event: string}";

    private actionsRowValidate (actionsRow: any) {
        return Array.isArray(actionsRow);
    }

    private actionsRowValidatePropInit () {
        if (!this.actionsRowValidate(this.$props.actionsRow)) {
            
            writeWarningConsoleTypeDataErrorProp(this.actionsRowMsgWarning);
            this.cloneActionsRow = [];
        } else {
            this.cloneActionsRow = this.$props.actionsRow;
        }
    }

    private actionsRowValidatePropWatch (actionsRow: any) {
        if (!this.actionsRowValidate(actionsRow)) {
            
            writeWarningConsoleTypeDataErrorProp(this.actionsRowMsgWarning);
            return [];
        }

        return this.$props.actionsRow;
    }

    private actionsRowDispatchAction (actionsRow: any) {
        this.stateActionsRow.ActionSetActionsRow(actionsRow);
    }

    @Watch('cloneActionsRow')
    setCloneActionsRow () {
        this.actionsRowDispatchAction(this.cloneActionsRow); 
    }

    // Watch origin Prop
    @Watch('actionsRow')
    setActionsRow (actionsRow: any) {
        const newActionsRow = this.actionsRowValidatePropWatch(actionsRow);
        this.actionsRowDispatchAction(newActionsRow);  
    }

    mounted () {
        this.actionsRowValidatePropInit();
    }
}