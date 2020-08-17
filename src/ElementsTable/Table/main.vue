<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";

import moduleStyleState from "@/store/modules/StyleModuleStore";

import BodyTable   from "./BodyComponent.vue";
import HeaderTable from "./HeaderComponent.vue";

import store from "@/store";

@Component
export default class ComponentsTable extends Vue {

  private stateStyle = getModule(moduleStyleState,store);

  private get styleClassesTable () {
    return this.stateStyle.getClassesTable as [];
  }

  render() {

    const classesTable = this.styleClassesTable !== undefined ? this.styleClassesTable.join(" ") : [];

    return (
      <div id="dm-datatable-table">
        <table class= { 'table ' + classesTable }>
          <HeaderTable />     
          <BodyTable />
        </table>
      </div>
    );
  }
}
</script>
