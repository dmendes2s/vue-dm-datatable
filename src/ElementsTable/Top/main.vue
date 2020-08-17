<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";

import moduleFilterPageState  from "@/store/modules/FilterModuleStore";
import moduleSearchState      from "@/store/modules/SearchModuleStore";
import moduleTotalByPageState from "@/store/modules/TotalByPageModuleStore";

import TotalByPage from "./TotalByPageComponent.vue";
import Search      from "./SearchComponent.vue";
import Filters     from "./FilterComponent.vue";

import store from "@/store";

@Component
export default class ComponentTop extends Vue {

  private stateSearch      = getModule(moduleSearchState,store);
  private stateTotalByPage = getModule(moduleTotalByPageState,store);
  private stateFilter      = getModule(moduleFilterPageState,store);

  private get search () {
    return this.stateSearch.getSearch;
  }

  private get totalByPage () {
    return this.stateTotalByPage.getTotalByPage;
  }

  private get filter () {
    return this.stateFilter.getFilter;
  }
 
  render() {
    
    return (
      <div id="dm-datatable-top">

        <div class="side-left">
          { this.totalByPage > 0 ? <TotalByPage /> : <div></div> }
          { this.filter && <Filters /> }
        </div>

        { this.search ? <Search /> : <div></div> }
      </div>
    );
  }
}
</script>
