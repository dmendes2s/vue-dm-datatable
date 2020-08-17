import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
    namespaced: true,
    name: "sort"
})
export default class SortModuleStore extends VuexModule {

    private sort = false;

    public get getSort () {
        return this.sort;
    }

    @Mutation
    private setSort (payload: boolean) {
        this.sort = payload;
    }

    @Action({commit: 'setSort'})
    public ActionSetSort (payload: boolean) {
        return payload;
    }
}