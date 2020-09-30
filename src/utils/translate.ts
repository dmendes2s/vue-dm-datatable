import { getModule }   from "vuex-module-decorators";
import moduleLangState from "@/store/modules/LangModuleStore";
import store           from "@/store";

const stateLang = getModule(moduleLangState,store);

export default {    

    info: (totalShowPage: number, totalByPage: number, totalRow: number, search: {isSearching: boolean, total: number}) => {   
        let message = stateLang.getLang.info?.
        replace("$show",String(totalShowPage)).
        replace("$totalByPage",String(totalByPage)).
        replace("$total",String(totalRow));

        if(search.isSearching) {
            const newMessage = " (" + stateLang.getLang.infoFilter?.replace("$total",String(search.total)) + ")";
            message += newMessage;
        }
        
        return message;
    },

    textDetailRows: () => {
        return stateLang.getLang.textDetailRows;
    },

    totalByPage: () => {        
        return stateLang.getLang.totalByPage;        
    },

    emptyRows: () => {
        return stateLang.getLang.emptyRows;
    },

    emptyRowsSearch: () => {
        return stateLang.getLang.emptyRowsSearch;
    },

    searchPlaceholder: () => {
        return stateLang.getLang.search;    
    },

    textFilter: () => {
        return stateLang.getLang.textFilter;    
    },

    textActionsRow: () => {
        return stateLang.getLang.textActionsRow;
    },

    loader: () => {
        return stateLang.getLang.loader;
    }
}


