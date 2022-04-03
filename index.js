function alerta(){
    alert("Su información nos ha llegado correctamente, en breve nos pondremos en contacto.")}

function soloNumeros(e){
    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key);
    numeros="0123456789";
    especiales="8-37-38-46";
    teclado_especial=false;

    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial=true
        }
    }
    if(numeros.indexOf(teclado)==-1 && !teclado_especial){
        return false;
    }
}

function soloLetras(e){
    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key).toLowerCase();
    letras=" abcdefghijklmnñopqrstuvwxyzáéíóúü";
    especiales="8-37-38-46-164";
    teclado_especial=false;

    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial=true;break;
        }
    }
    if(letras.indexOf(teclado)==-1 && !teclado_especial){
        return false;
    }
}

const productos = [{
    id:1,
    nombre:"Mate acero",
    precio: 1000,
    },{

    id:2,
    nombre:"Mate camionero",
    precio: 2000,
    },{

    id:3,
    nombre:"Mate imperial",
    precio: 3000,
    },
];
