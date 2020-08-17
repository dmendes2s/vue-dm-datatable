<script lang="tsx">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { getModule }                   from "vuex-module-decorators";

import moduleStyleState from "@/store/modules/StyleModuleStore";
import store            from "@/store";

@Component
export default class DmSelect extends Vue {

    @Prop() readonly options!: JSX.Element[];
    @Prop() readonly selected!: any;
    @Prop() readonly multiple!: boolean;

    private stateStyle  = getModule(moduleStyleState,store);    
    private showOptions = false;

    private toggleShowOptions () {
        this.showOptions = !this.showOptions;
    }

    private get borderInputs () {
        return this.stateStyle.getBorderInputs;
    }

    @Watch('selected')
    private getSelected () {
        if (!this.multiple) {
            this.showOptions = false;
        }        
    }

    render () {
        return (
            <div id="dm-select-component" class={ this.borderInputs }>
                <span class="selected" onClick={ () => this.toggleShowOptions() }>{ this.selected }</span>
                <i class="fa fa-chevron-down" aria-hidden="true"></i>
                { this.showOptions && 
                    <div class={ 'options ' + this.borderInputs }>
                        { this.options }
                        { this.multiple && <i class="fa fa-close" onClick={ () => this.toggleShowOptions() } aria-hidden="true"></i> }
                    </div> 
                }
            </div>
        )
    }
}

</script>
