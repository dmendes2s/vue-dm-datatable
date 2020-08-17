## Property styles

<strong>prop</strong>: borderInputs <br />
<strong>values:</strong> square | round <br />
<strong>default:</strong> square <br />
<strong>description</strong>: Define the border type of the elements inputs and selects.
<hr />

<strong>prop</strong>: borderButtonPaginate <br /> 
<strong>values</strong>: square | round <br />
<strong>default</strong>: square <br />
<strong>description</strong>: Define the border type of the pagination buttons.
<hr />

<strong>prop</strong>: classesTable <br /> 
<strong>values</strong>: ["table-bordered","table-striped", "table-hover"] <br />
<strong>default</strong>: [] <br />
<strong>description</strong>: I defined the classes of the table \<table>\</table> <br />
<strong>note</strong>: In place of table-bordered you can use table-line, table-bordered will fill the entire table with borders, table-line will apply a border at the end of each \<tr>\</tr>.

```  
Ex:

{
    classesTable: ["table-line", "table-striped"]
}
```