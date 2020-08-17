import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { IPropsLang } from "@/types";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleLangState from "@/store/modules/LangModuleStore";

import langDefault from "@/lang";

import store from "@/store";

@Component
export default class LangMixin extends Vue {

    private stateLang = getModule(moduleLangState,store);

    private cloneLang: IPropsLang = {};
    private langMsgWarning = "The lang property expects an object of data.";

    private langValidate (lang: any) {
        
        if (typeof lang === "object" ) {     
            if (Array.isArray(lang)) {
                return false;
            }

            return true;
        } 

        return false;
    }

    private langValidatePropInit () {

        if (!this.langValidate(this.$props.lang)) {

            writeWarningConsoleTypeDataErrorProp(this.langMsgWarning);
            this.cloneLang = { }
        } else {
            this.cloneLang = this.$props.lang;
        }
    }

    private langValidatePropWatch (lang: any) {
        if (!this.langValidate(lang)) {

            writeWarningConsoleTypeDataErrorProp(this.langMsgWarning);
            return {};
        }

        return this.$props.lang;
    }

    private langDispatchAction (lang: any) {
        const _lang = this.checkPropLangAndReturnValue(this.$props.lang) as IPropsLang;
        this.stateLang.ActionSetLang(_lang);
    }

    private async checkPropLangAndReturnValue (lang: IPropsLang){
        return Object.keys(this.$props.lang).length <= 0 ? langDefault : lang;
    }

    @Watch('cloneLang')
    setCloneLang () {
        this.langDispatchAction(this.cloneLang);
    }

    // Watch origin Prop
    @Watch('lang')
    setLang (lang: any) {
        const newLang = this.langValidatePropWatch(lang);
        this.langDispatchAction(lang);  
    }

    mounted () {
        this.langValidatePropInit();
    }
}