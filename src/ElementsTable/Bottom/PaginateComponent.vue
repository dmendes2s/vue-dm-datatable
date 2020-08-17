<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";

import modulePaginateState from "@/store/modules/PaginateModuleStore";
import moduleRowState      from "@/store/modules/RowModuleStore";
import moduleStyleState    from "@/store/modules/StyleModuleStore";

import store from "@/store";

@Component
export default class PaginateComponent extends Vue {

    private statePaginate = getModule(modulePaginateState,store);
    private stateRow      = getModule(moduleRowState,store);
    private stateStyle    = getModule(moduleStyleState,store);
 
    mounted () {
        const rows = this.stateRow.getRow.data as [];
        this.statePaginate.ActionSetTotalByPage({
            totalByPage: this.stateRow.getRow.totalByPage,
            rows
        });
    }

    public get currentPage () {
        return this.statePaginate.getCurrentPage;
    }

    public get buttonsPaginate () {
        return this.statePaginate.getArrayButtons;
    }

    private get borderButtonPaginate () {
        return this.stateStyle.getBorderButtonsPaginate;
    }

    private prev () {
        this.statePaginate.ActionSetPrev();
    }

    private next () {
        this.statePaginate.ActionSetNext();
    }

    private handlePaginate (page: number) {
        this.stateRow.ActionSetRowsPaginate(page);
        this.statePaginate.ActionSetCurrentPage(page);
    }

    private activeClass (number: number) {
         return this.currentPage === number ? "active" : "";
    }

    private isDisabledPrev () {
        return this.statePaginate.getArrayButtons[0] > 1 ? false : true;
    }

    private isDisabledNext () {
        const totalArrayButtons     = this.statePaginate.getArrayButtons.length; 
        const totalarrayButtonsFull = this.statePaginate.arrayButtonsFull.length;  
        
        const lastNumberArrayButtons     = this.statePaginate.getArrayButtons[totalArrayButtons - 1]; 
        const lastNumberarrayButtonsFull = this.statePaginate.arrayButtonsFull[totalarrayButtonsFull - 1]; 

        return lastNumberArrayButtons  <  lastNumberarrayButtonsFull ? false : true;
    }

 
    render() { 
        
        const liElementHtml: JSX.Element[] = [];
        const totalRowsShow = this.stateRow.getRow.data.filter((row: any) => row._show).length; 
           
        if(totalRowsShow <= 0){ return }

        if (this.statePaginate.arrayButtonsFull.length > 6) {

            this.buttonsPaginate.forEach(number => {            
                liElementHtml.push(
                    <li>
                        <button 
                            class={ this.borderButtonPaginate  + ' ' + this.activeClass(number) } 
                            onClick={ () => this.handlePaginate(number) }
                        >{number}</button>
                    </li>
                );   
            });
  
            liElementHtml.unshift(
                <li>
                    <button class={ this.borderButtonPaginate } disabled={this.isDisabledPrev()} onClick={this.prev}>
                        <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                    </button>
                </li>
            );

            liElementHtml.push(
                <li>
                    <button class={ this.borderButtonPaginate } disabled={this.isDisabledNext()} onClick={this.next}>
                        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                    </button>
                </li>
            );

        } else {

            this.buttonsPaginate.forEach(number => {       
                        
                liElementHtml.push(
                    <li>
                        <button 
                            class={ this.borderButtonPaginate + ' ' + this.activeClass(number)} 
                            onClick={() => this.handlePaginate(number)}
                        >{number}</button>
                    </li>
                );   
            });
        }  

        return (
            <div class="paginate">
                <ul>{liElementHtml}</ul>
            </div>
        );
    }
}
</script>