import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
    namespaced: true,
    name: "showChildrenRows"
})
export default class ShowChildrenRowsModuleStore extends VuexModule {

    private show = false;

    public get getShowChildrenRows () {
        return this.show;
    }

    @Mutation
    private setShowChildrenRows (payload: boolean) {
        this.show = payload;
    }

    @Action({commit: 'setShowChildrenRows'})
    public ActionSetShowChildrenRows (payload: boolean) {
        return payload;
    }
}