<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";

import moduleInfoState     from "@/store/modules/InfoModuleStore";
import modulePaginateState from "@/store/modules/PaginateModuleStore";

import Info     from "./InfoComponent.vue";
import Paginate from "./PaginateComponent.vue";

import store from "@/store";


@Component
export default class ComponentsBottom extends Vue {

  private statePaginate = getModule(modulePaginateState,store);
  private stateInfo     = getModule(moduleInfoState,store);

  private get info () {
    return this.stateInfo.getInfo;
  }

  private get paginate () {
    return this.statePaginate.getPaginate;
  }

  render() {
    return (
      <div id="dm-datatable-bottom">
        { this.info ? <Info /> : <div></div> }
        { this.paginate ? <Paginate /> : <div></div> }
      </div>
    );
  }
}
</script>
