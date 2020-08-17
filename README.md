# dm-datatable

## Over View

You may be wondering, another data table library for vue, there are already so many that do their job well, why should I use a dm-datatable user?

Dm-Datatable was created with the purpose of being easy to use, we know that there are many libraries for vue, but many are complex to configure and others are very simple, where dm-datatable comes in.

Dm-Datatable was born with the purpose of learning from users' pain when working with table data and thus evolving, we count on the community's contribution to evolve.

According to usage and popularity, we will evolve to better documentation.

## Getting started

```
npm install vue-dm-datatable
```

#### Importing and Using
``` 
import DmDatatable from "vue-dm-datatable";
import "vue-dm-datatable/dist/vue-dm-datatable.css";

<template>
    <dm-datatable />
</template>

new Vue({
    components: {
        DmDatatable
    }
})
```

### Note

All properties are being heard, if you need to change any of them according to the state of your application you have this option.
<br/><br/>

### Props

<table>
    <thead>
        <tr>
            <th style="text-align:center">Name</th>
            <th style="text-align:center">Type</th>
            <th style="text-align:center">Default</th>
    </thead>
    <body>
        <tr>
            <td>columns</td>
            <td><a href="./doc/propColumns.md">Show Model</a></td>
            <td>[ ]</td>
        </tr>
        <tr>
            <td>rows</td>
            <td><a href="./doc/propRows.md">Show Model</a></td>
            <td>[ ]</td>
        </tr>
        <tr>
            <td>totalByPage</td>
            <td>number</td>
            <td>5</td>
        </tr>
        <tr>
            <td>sort</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>filter</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>search</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>info</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>paginate</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>loader</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>showChildrenRows</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>lang</td>
            <td><a href="./doc/propLang.md">Show Model</a></td>
            <td>{ }</td>
        </tr>
        <tr>
            <td>styles</td>
            <td><a href="./doc/propStyles.md" target_="blank">Show Model</a></td>
            <td>{ }</td>
        </tr>
        <tr>
            <td>modelChildrenRow</td>
            <td><a href="./doc/propModelChildrenRow.md">Show Model</a></td>
            <td>{ }</td>
        </tr>
        <tr>
            <td>actionsRow</td>
            <td><a href="./doc/actionsRow.md">Show Model</a></td>
            <td>{ }</td>
        </tr>
    </tbody>
</table>
<br />

### Note on upcoming features.
* Editable row
* Ajax rendering
* Theme options