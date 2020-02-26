var a = [
    {
        "name":"Juan",
        "data":{
            "edad":21,
            "sexo":"Masculino"
        }
    },
    {
        "name":"Diego",
        "data":{
            "edad":28,
            "sexo":"Masculino"
        }
    },
    {
        "name":"Fernanda",
        "data":{
            "edad":24,
            "sexo":"Femenino"
        }
    }
] 

/* var b = JSON.stringify(a)
var c = JSON.parse(b) */

console.log(a);
/* console.log(b);
console.log(c); */

// Con la propiedad length se devuelve la cantidad de elementos de una matriz
console.log('------');
console.log(a.length)
console.log('------');
//acccedemos al valor sexo del indice 1 de nuestra arreglo
// console.log(a[1].data.sexo)
//En esta linea se conoce el indice del arreglo.
a.forEach((ele, index) => console.log(index) )


var totalEdades = a.reduce((sum, value) => (typeof value.data.edad == "number" ? sum + value.data.edad : sum), null);
/* console.log('------');
console.log(totalEdades); */

// prom totalEdades / a.length

var avg = totalEdades / a.length;
/* console.log('------');
console.log(avg);
console.log('------'); */

//__________________________________________________________________________________________________________________________________________________
console.log('------');
console.log("Ejemplo sumas y comparaciones con foreach");

console.log('------');

// a.forEach((ele, index ) => console.log(ele.data.sexo, ( ' -- ' ), index ))
a.forEach((a) => {
    console.log(a.data.sexo);
})

console.log('------');
sum = 0;
//a.forEach(elem => sum += elem.data.edad)
console.log(sum);
console.log('------');




/* var edadesTotal = a.forEach(function(ele){ ele.data.edad + sum});
console.log(edadesTotal); */