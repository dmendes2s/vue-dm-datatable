import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
    namespaced: true,
    name: "filter"
})
export default class FilterModuleStore extends VuexModule {

    private filter = false;

    public get getFilter () {
        return this.filter;
    }

    @Mutation
    private setFilter (payload: boolean) {
        this.filter = payload;
    }

    @Action({commit: 'setFilter'})
    public ActionSetFilter (payload: boolean) {
        return payload;
    }
}