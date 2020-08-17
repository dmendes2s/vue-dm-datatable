import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleSearchState from "@/store/modules/SearchModuleStore";

import store from "@/store";

@Component
export default class SearchMixin extends Vue {

    private stateSearch = getModule(moduleSearchState,store);

    private cloneSearch = false;
    private searchMsgWarning = "The search property expects an boolean of data!";

    private searchValidate (search: any) {
        return (typeof search === "boolean");
    }

    private searchValidatePropInit () {

        if (!this.searchValidate(this.$props.search)) {

            writeWarningConsoleTypeDataErrorProp(this.searchMsgWarning);
            this.cloneSearch = false;
        } else {
            this.cloneSearch = this.$props.search;
        }
    }

    private searchDispatchAction (search: any) {
        this.stateSearch.ActionSetSearch(search);
    }

    private searchValidatePropWatch (search: any) {
        if (!this.searchValidate(search)) {

            writeWarningConsoleTypeDataErrorProp(this.searchMsgWarning);
            return false;
        }

        return this.$props.search;
    }

    @Watch('cloneSearch')
    setCloneSearch () {
        this.searchDispatchAction(this.cloneSearch);
    }

    // Watch origin Prop
    @Watch('search')
    setSearch (search: any) {
        const newSearch = this.searchValidatePropWatch(search);
        this.searchDispatchAction(newSearch);  
    }

    mounted () {
        this.searchValidatePropInit();
    }
}