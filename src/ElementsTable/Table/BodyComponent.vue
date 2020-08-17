<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { getModule }      from "vuex-module-decorators";
import { IPropsColumns, IPropsModelChildrenRow, IPropsActionsRow } from "@/types";

import moduleColumnState           from "@/store/modules/ColumnModuleStore";
import moduleRowState              from "@/store/modules/RowModuleStore";
import modulePaginateState         from "@/store/modules/PaginateModuleStore";
import moduleSearchState           from "@/store/modules/SearchModuleStore";
import moduleShowChildrenRowsState from "@/store/modules/ShowChildrenRowsModuleStore";
import moduleModelChildrenRowStore from "@/store/modules/ModelChildrenRowStore";
import moduleActionsRowStore       from "@/store/modules/ActionsRowModuleStore";

import Translate from "@/utils/translate";
import eventBus  from "@/utils/eventBus";

import store from "@/store";

@Component
export default class BodyComponent extends Vue {

    private stateColumn           = getModule(moduleColumnState,store);
    private stateRow              = getModule(moduleRowState,store);
    private statePaginate         = getModule(modulePaginateState,store);
    private stateSearch           = getModule(moduleSearchState,store);
    private stateShowChildrenRows = getModule(moduleShowChildrenRowsState,store);
    private stateModelChildrenRow = getModule(moduleModelChildrenRowStore,store);
    private stateActionsRow       = getModule(moduleActionsRowStore,store);

    private totalColumns = 0;
    private indexRow = -1;

    private get rows () {
        return this.stateRow.getRow;
    }

    private get columns () {
      return this.stateColumn.getColumns;
    }

    private get currentPage () {
      return this.statePaginate.getCurrentPage;
    }

    private get showChildrenRows () {
      return this.stateShowChildrenRows.getShowChildrenRows;
    }

    private get modelChildrenRow () {
      return this.stateModelChildrenRow.getModel;
    }

    private get actionsRow () {
      return this.stateActionsRow.getActionsRow;
    }

    private showChildrenRow (index: number) {
      this.indexRow = index === this.indexRow ? -1 : index;
    }

    private handleEmitAction (event: string, row: any) {
      eventBus.$emit('handleActionRow',{
        event,
        data: row
      });
    }

    private renderActionsRow (row: any) {
      return this.actionsRow.map((action: IPropsActionsRow) => {
        return (
          <button 
            type="button"
            class={ action.type } 
            onClick={ () => this.handleEmitAction(action.event as string,row) }
          >{ action.title }</button>
        );
      });  
    }

    private renderOnlyRow (row: any) {
      const columnsShow = this.columns.filter((column: IPropsColumns) => column.show); 
      const htmlElement: JSX.Element[] = [];
                
      columnsShow.forEach((column: IPropsColumns) => {
        htmlElement.push(<td><span domPropsInnerHTML={row[column.name as string]}></span></td>);
      });

      if(this.actionsRow.length > 0) {  
        htmlElement.push(<td class="actions"><span> { this.renderActionsRow(row) }</span></td>);
      }

      return htmlElement;
          
    }

    private renderRowChildren (children: any, index: number) {
      
      const model = this.modelChildrenRow;

      return (
        <tr class="details">
          <td colspan={ this.totalColumns }>
            <table class="table">
              <thead>
                <tr>{ model.map((itenModel: IPropsModelChildrenRow) => <th>{ itenModel.title }</th>) }</tr>
              </thead>             
              <tbody>
                <tr>
                  { 
                    model.map((itenModel: IPropsModelChildrenRow) => {
                      return (
                        <td>
                          <span domPropsInnerHTML={ children[itenModel.name] }></span>
                        </td>
                      ) 
                    })
                  }
                </tr>
             </tbody>
            </table>
          </td>
        </tr>   
      );
    }

    private renderRowWithChildren (row: any, index:number) {   

      const _class = this.indexRow === index ? "fa fa-minus-square-o" : "fa fa-plus-square-o";

      return (
        <tr>
          <td>          
            { row.children !== undefined && row.children.length > 0 && 
            <i onClick={ () => this.showChildrenRow(index) } class={ _class }></i> }
          </td>
          { this.renderOnlyRow(row) }
        </tr>
      );
    }

    private renderRowNotChildren (row: any) {   
      return <tr>{ this.renderOnlyRow(row) }</tr>;
    }

    private renderRowsNotChildren () {
      const rows = this.rows.data;
      const htmlElement: JSX.Element[] = [];

      rows.forEach( (row:any) => {        
        if(row._show && row._page === this.currentPage) {
          htmlElement.push(this.renderRowNotChildren(row));   
        }
      });

      return htmlElement;
    }    

    private renderRowsWithChildren () {

      const rows = this.rows.data;
      const htmlElement: JSX.Element[] = [];

      rows.forEach( (row:any, index) => {        
        
        if (row._show && row._page === this.currentPage) {
          
          htmlElement.push(this.renderRowWithChildren(row,index));  
          
          if (index === this.indexRow) {
            
            if (row.children !== undefined && row.children.length > 0) {
              
              row.children.forEach((children: any) => {
                htmlElement.push(this.renderRowChildren(children,index))
              });
            }
          }
        }
      });

      return htmlElement;
    }  

    updated () {
      if (this.showChildrenRows && this.actionsRow.length > 0 ) {
        this.totalColumns = this.columns.length + 2;
      } else if (this.showChildrenRows || this.actionsRow.length > 0) {
        this.totalColumns = this.columns.length + 1;
      } else {
        this.totalColumns = this.columns.length;
      }
    }

    renderRows () {   

      const htmlElement = this.showChildrenRows ? this.renderRowsWithChildren() : this.renderRowsNotChildren();
          
      if(htmlElement.length <= 0 && this.stateSearch.getSearching){
         return <tr><td colspan={ this.totalColumns }>{ Translate.emptyRowsSearch() }</td></tr>
      }

      return htmlElement;
    }

    renderEmptyRows () {
      return <tr><td colspan={ this.totalColumns }>{ Translate.emptyRows() }</td></tr>    
    }

    render() {    
      return (              
          <tbody>    
            { this.rows.data.length > 0 ? this.renderRows() : this.renderEmptyRows() }
          </tbody>
      );
    }  
}
</script>
