<script lang="tsx">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { getModule }                   from 'vuex-module-decorators';
import { 
    IPropsColumns, 
    IPropsLang, 
    IPropsStyle, 
    IPropsModelChildrenRow, 
    IPropsActionsRow,
    IHandleActionsRow
} from "./types";

import ComponentsTop    from "@/ElementsTable/Top/main.vue";
import ComponentsTable  from "@/ElementsTable/Table/main.vue";
import ComponentsBottom from "@/ElementsTable/Bottom/main.vue";
import Loader           from "@/components/Loader.vue";

import moduleLoader from "@/store/modules/LoaderModuleStore";

import mixins   from "@/mixins/main";
import eventBus from './utils/eventBus';

import store from "@/store";

import "font-awesome/css/font-awesome.min.css";

@Component({
    name: "Dm-Datatable",
    mixins
})
export default class App extends Vue {

    @Prop({
        default: () => {
            return []
        }
    })  readonly columns!: IPropsColumns[];

    @Prop({
        default: () => {
            return { data:[] }
        }
    }) readonly rows!: {};

    @Prop({
        default: false
    }) readonly sort!: boolean;

    @Prop({
        default: 5
    }) readonly totalByPage!: number;

    @Prop({
        default: false
    }) readonly filter!: boolean;

    @Prop({
        default: false
    }) readonly search!: boolean;

    @Prop({
        default: false
    }) readonly info!: boolean;

    @Prop({
        default: false
    }) readonly paginate!: boolean;

    @Prop({
        default: false
    }) readonly showChildrenRows!: boolean;

    @Prop({
        default: () => {
            return {}
        }
    }) readonly lang!: IPropsLang;

    @Prop({
        default: () => {
            return {}
        }
    }) readonly styles!: IPropsStyle;

    @Prop({
        default: () => {
            return []
        }
    })  readonly modelChildrenRow!: IPropsModelChildrenRow[];

    @Prop({
        default: () => {
            return []
        }
    })  readonly actionsRow!: IPropsActionsRow[];

    @Prop({
        default: false
    })  readonly loader!: boolean;

    private stateLoader = getModule(moduleLoader,store);

    private get isLoader () {
        return this.stateLoader.getLoader;
    }

    mounted () {
        eventBus.$on('handleActionRow', (payload: IHandleActionsRow) => {
            this.$emit(payload.event,payload.data);
        });
    }

    render() {
        return (
            <div id="dm-datatable-container">
                { this.isLoader && <Loader /> }
                <ComponentsTop />
                <ComponentsTable />
                <ComponentsBottom />
            </div>
        );
    }
}
</script>

<style lang="scss">
@import "./assets/css/style.scss";
</style>