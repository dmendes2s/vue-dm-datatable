import { Vue, Watch } from "vue-property-decorator";
import { getModule }  from "vuex-module-decorators";
import { writeWarningConsoleTypeDataErrorProp } from "@/utils/functionsHelper";

import Component from "vue-class-component";

import moduleTotalByPageState from "@/store/modules/TotalByPageModuleStore";
import moduleRowState         from "@/store/modules/RowModuleStore";
import modulePaginateState    from "@/store/modules/PaginateModuleStore";
import moduleSearchState      from "@/store/modules/SearchModuleStore";
import moduleInfoState        from "@/store/modules/InfoModuleStore";

import store from "@/store";

@Component
export default class TotalByPageMixin extends Vue {

    private stateTotalByPage = getModule(moduleTotalByPageState,store);
    private stateRow         = getModule(moduleRowState,store);
    private statePaginate    = getModule(modulePaginateState,store);
    private stateSearch      = getModule(moduleSearchState,store);
    private stateInfo        = getModule(moduleInfoState,store);

    private cloneTotalByPage = 0;
    private totalByPageMsgWarning = "The totalByPage property expects an number of data!";

    private totalByPageValidate (totalByPage: any) {
        return (typeof totalByPage === "number");
    }

    private totalByPageValidatePropInit () {

        if (!this.totalByPageValidate(this.$props.totalByPage)) {

            writeWarningConsoleTypeDataErrorProp(this.totalByPageMsgWarning);
            this.cloneTotalByPage = 5;
        } else {
            this.cloneTotalByPage = this.$props.totalByPage;
        }
    }

    private totalByPageValidatePropWatch (totalByPage: any) {

        if (!this.totalByPageValidate(totalByPage)) {

            writeWarningConsoleTypeDataErrorProp(this.totalByPageMsgWarning);
            return 5;
        }

        return this.$props.totalByPage;
    }

    private totalByPageDispatchActionMounted (totalByPage: any) {

        const _totalByPage = this.totalByPageConfigValue(this.$props.totalByPage);

        this.stateRow.ActionSetRowsByPage({
            isSearching: this.stateSearch.getSearching,
            totalByPage: _totalByPage
        });

        this.stateTotalByPage.ActionSetTotalByPage(_totalByPage);
        this.stateInfo.ActionSetTotalByPage(_totalByPage); 
    }

    private totalByPageDispatchActionWatch (totalByPage: any) {

        const rows = this.stateRow.getRow.data as [];
        const _totalByPage = this.totalByPageConfigValue(totalByPage);

        this.stateRow.ActionSetRowsByPage({
            isSearching: this.stateSearch.getSearching,
            totalByPage: _totalByPage
        });

        this.stateTotalByPage.ActionSetTotalByPage(_totalByPage);
        this.statePaginate.ActionSetTotalByPage({rows,totalByPage});
        this.stateInfo.ActionSetTotalByPage(_totalByPage);
    }

    private totalByPageConfigValue (prop: number) {
        return prop <= 0 ? 5 : prop;
    }

    @Watch('cloneTotalByPage')
    setCloneTotalByPage () {
        this.totalByPageDispatchActionMounted(this.cloneTotalByPage);
    }

    // Watch origin Prop
    @Watch('totalByPage')
    setTotalByPage (totalByPage: any) {
        const newTotalByPage = this.totalByPageValidatePropWatch(totalByPage);
        this.totalByPageDispatchActionWatch(newTotalByPage);  
    }

    mounted () {       
        this.totalByPageValidatePropInit();
    }
}