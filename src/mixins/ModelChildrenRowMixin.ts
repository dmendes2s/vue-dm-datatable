import { Vue, Watch }             from "vue-property-decorator";
import { getModule }              from "vuex-module-decorators";
import { IPropsModelChildrenRow } from "@/types";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleModelChildrenRowStore from "@/store/modules/ModelChildrenRowStore";

import store from "@/store";

@Component
export default class ModelChildrenRowMixin extends Vue {

    private stateModelChildrenRow = getModule(moduleModelChildrenRowStore,store);

    private cloneModelChildrenRow: IPropsModelChildrenRow[] = [];
    private modelChildrenRowMsgWarning = "The modelChildrenRow property expects an array of data. modelChildrenRow should look like this {name: string, title: string}";


    private modelChildrenRowValidate (modelChildrenRow: any) {
        return Array.isArray(modelChildrenRow);
    }

    private modelChildrenRowValidatePropInit () {
        if (!this.modelChildrenRowValidate(this.$props.modelChildrenRow)) {
            
            writeWarningConsoleTypeDataErrorProp(this.modelChildrenRowMsgWarning);
            this.cloneModelChildrenRow = [];
        } else {
            this.cloneModelChildrenRow = this.$props.modelChildrenRow;
        }
    }

    private modelChildrenRowValidatePropWatch (modelChildrenRow: any) {
        if (!this.modelChildrenRowValidate(modelChildrenRow)) {
            
            writeWarningConsoleTypeDataErrorProp(this.modelChildrenRowMsgWarning);
            return [];
        }

        return this.$props.modelChildrenRow;
    }

    private modelChildrenRowDispatchAction (modelChildrenRow: any) {
       this.stateModelChildrenRow.ActionSetModel(modelChildrenRow);
    }

    @Watch('cloneModelChildrenRow')
    setCloneModelChildrenRow () {
        this.modelChildrenRowDispatchAction(this.cloneModelChildrenRow);
    }

    // Watch origin Prop
    @Watch('modelChildrenRow')
    setModelChildrenRow (modelChildrenRow: any) {
        const newModelChildrenRow = this.modelChildrenRowValidatePropWatch(modelChildrenRow);
        this.modelChildrenRowDispatchAction(newModelChildrenRow);   
    }

    mounted () {
        this.modelChildrenRowValidatePropInit();
    }
}