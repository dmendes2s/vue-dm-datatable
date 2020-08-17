import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleInfoState from "@/store/modules/InfoModuleStore";

import store from "@/store";

@Component
export default class InfoMixin extends Vue {

    private stateInfo = getModule(moduleInfoState,store);

    private cloneInfo = false;
    private infoMsgWarning = "The info property expects an boolean of data!";

    private infoValidate (info: any) {
        return (typeof info === "boolean");
    }

    private infoValidatePropInit () {

        if (!this.infoValidate(this.$props.info)) {

            writeWarningConsoleTypeDataErrorProp(this.infoMsgWarning);
            this.cloneInfo = false;
        } else {
            this.cloneInfo = this.$props.info;
        }
    }

    private infoDispatchAction (info: any) {
         this.stateInfo.ActionSetInfo(info);
    }

    private infoValidatePropWatch (info: any) {
        if (!this.infoValidate(info)) {

            writeWarningConsoleTypeDataErrorProp(this.infoMsgWarning);
            return false;
        }

        return this.$props.info;
    }

    @Watch('cloneInfo')
    setCloneInfo () {
        this.infoDispatchAction(this.cloneInfo);
    }

    // Watch origin Prop
    @Watch('info')
    setInfo (info: any) {
        const newInfo = this.infoValidatePropWatch(info);
        this.infoDispatchAction(newInfo);  
    }

    mounted () {
        this.infoValidatePropInit();
    }
}