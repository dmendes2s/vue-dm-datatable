import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
    namespaced: true,
    name: "totalByPage"
})
export default class TotalByPageModuleStore extends VuexModule {

    private totalByPage = 0;

    public get getTotalByPage () {
        return this.totalByPage;
    }

    @Mutation
    private setTotalByPage (payload: number) {
        this.totalByPage = payload;
    }

    @Action({commit: 'setTotalByPage'})
    public ActionSetTotalByPage (payload: number) {
        return payload;
    }

}