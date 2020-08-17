<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";

import Translate from "@/utils/translate";

import store from "@/store";

@Component
export default class Loader extends Vue {
 
    render() {
        return (
            <div class="loader">
            <i class="fa fa-refresh fa-spin"></i> { Translate.loader() }...</div>
        )
    }
}
</script>
