<template>
  <Dm-Datatable
    :columns="columns"
    :rows="rows"
    :totalByPage="2"
    :info="true"
    :sort="false"
    :search="true"
    :filter="true"
    :paginate="true"
    :showChildrenRows="true"
    :modelChildrenRow="modelChildren"
    :styles="style"    
    :loader="false"
  />
</template>

<script>
import DmDatatable from "./App.vue";
import dataRows from "@/fakes/dataRows";
import dataAjax from "@/fakes/dataAjax";
import lang from "@/fakes/lang-pt-br";
import style from "@/fakes/style";
import modelChildren from "@/fakes/modelChildren.ts";
import actionsRows from "@/fakes/actionsRows.ts";

export default {
  data() {
    return {
      columns: [
        { title: "Nome", name: "name" },
        { title: "Email", name: "email" },
        { title: "Idade", name: "age" },
        { title: "Salário", name: "salary" }
      ],
      rows: {
        data: [
            {
              name: "Fabian Emanuelly",
              email: "ffabianaemanuelly@fedato.com",
              age: 30,
              salary: 2.300,
              children: [
                { 
                    exercising: "yes", 
                    skils: "vue.js" 
                },
                { 
                    exercising: "yes", 
                    skils: "node.js"
                },
                { 
                    exercising: "no", 
                    skils: "typescript"
                },
              ]
          },

          {
              name: "John Finder",
              email: "jfinder@feddan.com",
              age: 28,
              salary: 5.000,
              children: []
          }
        ]
      },
      lang: {},
      sort: true,
      style: style,
      modelChildren: [
        {
          title: "Exercising",
          name: "exercising"
        },
        {
          title: "Skils",
          name: "skils"
        }
      ],
      actionsRows: actionsRows
    }
  },
  components: {
    DmDatatable
  }
};
</script>