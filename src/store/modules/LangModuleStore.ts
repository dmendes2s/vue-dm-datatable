import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IPropsLang }                           from "@/types";

@Module({
    namespaced: true,
    name: "lang"
})
export default class LangModuleStore extends VuexModule {

    private lang: IPropsLang = {};

    public get getLang () {
        return this.lang;
    }

    @Mutation
    private setLang (payload: IPropsLang) {
        this.lang = payload;
    }

    @Action({commit: 'setLang'})
    public ActionSetLang (payload: IPropsLang) {
        return payload;
    }
}