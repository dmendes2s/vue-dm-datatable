## Property rows

The objects of the rows property are free to have the model you want, but the key for each property of the rows object must be equal to the value of the key "name" of the object columns, if the values ​​do not match, the value of the object property line will not be rendered.


```
Ex:

{ 
    data: [
        {
            name: "Fabian Emanuelly",
            email: "ffabianaemanuelly@fedato.com",
            age: 30,
            salary: 2.300,
            children: []
        },

        {
            name: "John Finder",
            email: "jfinder@feddan.com",
            age: 28,
            salary: 5.000,
            children: []
        }
    ]
}
``` 


The children property must remain present and with the same name if you want to add a sub table for the object in question. We will see more details of this property in the modelChildrenRow property section.
