import Vue  from "vue";
import Vuex from "vuex";

import Column           from "./modules/ColumnModuleStore";
import Row              from "./modules/RowModuleStore";
import Sort             from "./modules/SortModuleStore";
import TotalByPage      from "./modules/TotalByPageModuleStore";
import Filter           from "./modules/FilterModuleStore";
import Search           from "./modules/SearchModuleStore";
import Info             from "./modules/InfoModuleStore";
import Paginate         from "./modules/PaginateModuleStore";
import ShowChildrenRows from "./modules/ShowChildrenRowsModuleStore";
import Lang             from "./modules/LangModuleStore";
import Style            from "./modules/StyleModuleStore";
import ModelChildrenRow from "./modules/ModelChildrenRowStore";
import ActionsRow       from "./modules/ActionsRowModuleStore";
import Loader           from "./modules/LoaderModuleStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    column: Column,
    row: Row,
    sort: Sort,
    totalByPage: TotalByPage,
    filter: Filter,
    search: Search,
    info: Info,
    paginate: Paginate,
    showChildrenRows: ShowChildrenRows,
    lang: Lang,
    style: Style,
    modelChildrenRow: ModelChildrenRow,
    actionsRow: ActionsRow,
    loader: Loader
  }
});
