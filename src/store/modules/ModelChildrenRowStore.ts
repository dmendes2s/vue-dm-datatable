import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IPropsModelChildrenRow }               from "@/types";

@Module({
    namespaced: true,
    name: "modelChildrenRow"
})
export default class ModelChildrenRowStore extends VuexModule {

    private model: IPropsModelChildrenRow[] = [];

    public get getModel () {
        return this.model;
    }

    @Mutation
    private setModel (payload: IPropsModelChildrenRow[]) {
        this.model = payload;
    }

    @Action({commit: 'setModel'})
    public ActionSetModel (payload: IPropsModelChildrenRow[]) {
        return payload;
    }

}