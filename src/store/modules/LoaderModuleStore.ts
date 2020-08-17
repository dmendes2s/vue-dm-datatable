import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
    namespaced: true,
    name: "loader"
})
export default class LoaderModuleStore extends VuexModule {

    private loader = false;

    public get getLoader () {
        return this.loader;
    }

    @Mutation
    private setLoader (payload: boolean) {
        this.loader = payload;
    }

    @Action({commit: 'setLoader'})
    public ActionSetLoader (payload: boolean) {
        return payload;
    }
}