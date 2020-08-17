import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IPropsStyle }                          from "@/types";

@Module({
    namespaced: true,
    name: "style"
})
export default class StyleModuleStore extends VuexModule {

    private style: IPropsStyle = {
        borderInputs: "",
        borderButtonPaginate: "",
        classesTable: []
    }

    public get getBorderInputs () {
        return this.style.borderInputs;
    }

    public get getBorderButtonsPaginate () {
        return this.style.borderButtonPaginate;
    }

    public get getClassesTable () {
        return this.style.classesTable;
    }

    @Mutation
    private setStyle (payload: IPropsStyle) {
        this.style = payload;
    }

    @Action({commit: 'setStyle'})
    public ActionSetStyle (payload: IPropsStyle) {
        return payload;
    }
}