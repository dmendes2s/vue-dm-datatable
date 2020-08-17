import { Vue, Watch }  from "vue-property-decorator";
import { getModule }   from "vuex-module-decorators";
import { IPropsStyle } from "@/types";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleStyleState from "@/store/modules/StyleModuleStore";

import store from "@/store";

@Component
export default class StyleMixin extends Vue {

    private stateStyleState = getModule(moduleStyleState,store);

    private cloneStyles: IPropsStyle = {};
    private stylesMsgWarning = "The styles property expects an object of data.";

    private stylesValidate (styles: any) {
        
        if (typeof styles === "object" ) {     
            if (Array.isArray(styles)) {
                return false;
            }

            return true;
        } 

        return false;
    }

    private stylesValidatePropInit () {

        if (!this.stylesValidate(this.$props.styles)) {

            writeWarningConsoleTypeDataErrorProp(this.stylesMsgWarning);
            this.cloneStyles = { }
        } else {
            this.cloneStyles = this.$props.styles;
        }
    }

    private stylesValidatePropWatch (styles: any) {
        if (!this.stylesValidate(styles)) {

            writeWarningConsoleTypeDataErrorProp(this.stylesMsgWarning);
            return {};
        }

        return this.$props.styles;
    }

    private stylesDispatchAction (styles: any) {
        this.stateStyleState.ActionSetStyle(this.$props.styles);
    }

    @Watch('cloneStyles')
    setCloneStyle () {
        this.stylesDispatchAction(this.cloneStyles);
    }

    // Watch origin Prop
    @Watch('styles')
    setStyle (styles: any) {
        const newStyles = this.stylesValidatePropWatch(styles);
        this.stylesDispatchAction(newStyles);  
    }

    mounted () {
        this.stylesValidatePropInit();
    }
}