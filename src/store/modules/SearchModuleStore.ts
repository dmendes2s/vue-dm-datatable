import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
    namespaced: true,
    name: "search"
})
export default class SearchModuleStore extends VuexModule {

    private search = false;
    private searching = false;

    public get getSearch () {
        return this.search;
    }

    public get getSearching () {
        return this.searching;
    }

    @Mutation
    private setSearch (payload: boolean) {
        this.search = payload;
    }

    @Mutation
    private setSearching (payload: boolean) {
        this.searching = payload;
    }

    @Action({commit: 'setSearch'})
    public ActionSetSearch (payload: boolean) {
        return payload;
    }

    @Action({commit: 'setSearching'})
    public ActionSetSearching (payload: boolean) {
        return payload;
    }
}