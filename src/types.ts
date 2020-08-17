/**
 * Property type columns
 */
export interface IPropsColumns {
  title?: string,
  name?: string,
  selectedFilter?: boolean,
  show?: boolean
}

/**
 * Property type rows
 */
export interface IPropsRows {
  data?: any[],
  total?: number,
  totalByPage?: number
}

/**
 * Property type lang
 */
export interface IPropsLang {
  emptyRows?: string,
  emptyRowsSearch?: string,
  info?: string,
  infoFilter?: string,
  textDetailRows?: string,
  totalByPage?: string,
  loading?: string,
  search?: string,
  textFilter?: string,
  textActionsRow?: string,
  loader?: string
}

/**
 * Property type modelChildrenRow
 */
export interface IPropsModelChildrenRow {
  name: string,
  title?: string
}

/**
 * Property type actionsRow
 */
export interface IPropsActionsRow {
  title?: string,
  type?: string,
  event?: string
}

/**
 * Properties interface
 */
export interface IProps {
  columns: IPropsColumns[],
  rows: IPropsRows,
  sort: boolean,
  totalByPage: number,
  filter: boolean,
  search: boolean,
  info: boolean,
  paginate: boolean,
  showChildrenRows: boolean,
  lang: IPropsLang,
  styles: IPropsStyle,
  modelChildrenRow: string[],
  actionsRow: IPropsActionsRow[],
  loader: boolean
}


/**
 * Vuex columns module interface
 */
export interface IColumnState {
  columns: []
}

/**
 * Table ordering interface
 */
export interface IInfoSort {
  type: number,
  columnName: string
}

/**
 * Division of totalRows By amountByPage interface
 */
export interface IRelationshipRowsByAmountPage {
  rows: any[],
  total?: number,
  totalByPage: number,
}

/**
 * Property type styles
 */
export interface IPropsStyle {
  borderInputs?: string,
  borderButtonPaginate?: string,
  classesTable?: string[]
}

/**
 *  ActionsRow event interface
 */
export interface IHandleActionsRow {
  event: string,
  data: object
}