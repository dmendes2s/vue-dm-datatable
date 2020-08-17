import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
    namespaced: true,
    name: "info"
})
export default class InfoModuleStore extends VuexModule {

    private info = false;
    private totalByPage = 1;

    public get getInfo () {
        return this.info;
    }

    public get getTotalByPage () {
        return this.totalByPage;
    }

    @Mutation
    private setInfo (payload: boolean) {
        this.info = payload;
    }

    @Mutation
    private setTotalByPage (payload: number) {
        this.totalByPage = payload;
    }

    @Action({commit: 'setInfo'})
    public ActionSetInfo (payload: boolean) {
        return payload;
    }

    @Action({commit: 'setTotalByPage'})
    public ActionSetTotalByPage (payload: number) {
        return payload;
    }
}