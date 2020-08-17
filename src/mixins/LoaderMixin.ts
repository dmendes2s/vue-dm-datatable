import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleLoader from "@/store/modules/LoaderModuleStore";

import store from "@/store";

@Component
export default class InfoMixin extends Vue {

    private stateLoader = getModule(moduleLoader,store);

    private cloneLoader = false;
    private loaderMsgWarning = "The loader property expects an boolean of data!";

    private loaderValidate (loader: any) {
        return (typeof loader === "boolean");
    }

    private loaderValidatePropInit () {

        if (!this.loaderValidate(this.$props.loader)) {

            writeWarningConsoleTypeDataErrorProp(this.loaderMsgWarning);
            this.cloneLoader = false;
        } else {
            this.cloneLoader = this.$props.loader;
        }
    }

    private loaderDispatchAction (loader: any) {
        this.stateLoader.ActionSetLoader(this.$props.loader);
    }

    private loaderValidatePropWatch (loader: any) {
        if (!this.loaderValidate(loader)) {

            writeWarningConsoleTypeDataErrorProp(this.loaderMsgWarning);
            return false;
        }

        return this.$props.loader;
    }

    @Watch('cloneLoader')
    setCloneLoader () {
        this.loaderDispatchAction(this.cloneLoader);
    }

    // Watch origin Prop
    @Watch('loader')
    setLoader (loader: any) {
        const newLoader = this.loaderValidatePropWatch(loader);
        this.loaderDispatchAction(newLoader);  
    }

    mounted () {
        this.loaderValidatePropInit();
    }
}