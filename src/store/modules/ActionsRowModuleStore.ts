import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IPropsActionsRow }                     from "@/types";

@Module({
    namespaced: true,
    name: "actionsRow"
})
export default class ActionsRowModuleStore extends VuexModule {

    private actionsRow: IPropsActionsRow[] = [];

    public get getActionsRow () {
        return this.actionsRow;
    }

    @Mutation
    private setActionsRow (payload: IPropsActionsRow[]) {
        this.actionsRow = payload;
    }

    @Action({commit: 'setActionsRow'})
    public ActionSetActionsRow (payload: IPropsActionsRow[]) {
        return payload;
    }

}