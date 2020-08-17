import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IPropsColumns }                        from "@/types";

function configPropsSelectedFilterAndShow (columns: IPropsColumns[]) {
    return columns.map(column => {
        column.show = true;
        column.selectedFilter = false;
        return column;
    }) as [];
}


@Module({
    namespaced: true,
    name: "column"
})
export default class ColumnModuleStore extends VuexModule {

    private columns = [];

    public get getColumns () {
        return this.columns;
    }

    @Mutation
    private setColumns (payload: IPropsColumns[]) {
        this.columns = configPropsSelectedFilterAndShow(payload);
    }

    @Mutation
    private setColumnSelectedFilter (payload: string[]) {

        if (payload.length <= 0) {
            this.columns = configPropsSelectedFilterAndShow(this.columns);
            return;
        }

        this.columns = this.columns.map((column: IPropsColumns, index) => {
            const name = column.name as string;

            column.selectedFilter = false;
            column.show = false;

            if (payload.includes(name)) {
                column.selectedFilter = true;
                column.show = true;
            }

            return column;
   
        }) as [];
    }

    @Action({commit: 'setColumns'})
    public ActionSetColumns (payload: IPropsColumns[]) {
        return payload;
    }

    @Action({commit: 'setColumnSelectedFilter'})
    public ActionSetColumnSelectedFilter (payload: string[]) {
        return payload;
    }

}