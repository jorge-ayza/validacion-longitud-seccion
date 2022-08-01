const data = {
    longTramo:{
        valor: null,
        pass: false
    },
    numSecc: {
        valor: null,
        pass: false
    }, 
    longSeccion: {
        valor: [],
        pass: false
    },
    longTotalSecc: {
        valor: null,
        pass: false
    }
}
const longTramo = document.querySelector('#longTramo')
const numSecc   = document.querySelector('#numSecc')
const longSecc  = document.querySelectorAll('.longitud-seccion')
const editarSecc = document.querySelector('#editarSecc')
const containerSecc = document.querySelector('#containerSecc')
const error     = document.querySelectorAll('span')

window.addEventListener('load', e => editarSecc.disabled = true)

longSecc.forEach( elem => {
    elem.addEventListener('input', e => {
        containerSecc.textContent = ''
        editarSecc.checked = false
        
        if(elem === longTramo){
            const ER = /^(\d{1,3}(\.\d{1,2})?)$/

            if(ER.test(e.target.value) && Number(e.target.value) > 0) {
                data.longTramo.valor = Number(e.target.value)
                data.longTramo.pass = true
                mensajeError()
                
            } else {
                data.longTramo.valor = false
                data.longTramo.pass = false
                editarSecc.checked = false
                mensajeError(e.target.parentElement.getAttribute('id'))
            }
        } else if(elem === numSecc) {
            const ER = /^(\d{1,2})$/
    
            if(ER.test(e.target.value) && Number(e.target.value) > 0) {
                data.numSecc.valor = Number(e.target.value)
                data.numSecc.pass = true
                mensajeError()
            } else {
                data.numSecc.valor = false
                data.numSecc.pass = false
                mensajeError(e.target.parentElement.getAttribute('id'))
                editarSecc.checked = false
            }
        }

        if(data.longTramo.valor && data.numSecc.valor) {
            const resultado = data.longTramo.valor / data.numSecc.valor
            editarSecc.disabled = false
            data.longSeccion.valor = []

            if(resultado !== 0) {
                for(let i = 1; i <= data.numSecc.valor; i++){
                    const seccion = document.createElement('input')
                    seccion.value = resultado.toFixed(2)
                    seccion.disabled = true
                    seccion.classList.add('seccion')
                    seccion.setAttribute('type', 'text')
                    containerSecc.appendChild(seccion)
                    
                    data.longSeccion.valor.push(Number(seccion.value))
                    data.longSeccion.pass = true

                    data.longTotalSecc.valor = data.longSeccion.valor.reduce((acc, actl) => acc + actl, 0)
                    data.longTotalSecc.pass = true
                }
            }
            
        } else {
            editarSecc.disabled = true
        }

    })
})

editarSecc.addEventListener('change', e => {
    const seccion = document.querySelectorAll('.seccion')
    
    if(e.target.checked){
        seccion.forEach( secc => {
            secc.disabled = false
        })
        
        seccion.forEach((secc, i) => {
            secc.addEventListener('input', e => {
                data.longSeccion.valor[i] = Number(e.target.value)
                data.longTotalSecc.valor = data.longSeccion.valor.reduce((acc, actl) => acc + actl, 0)
                if(data.longTotalSecc.valor === data.longTramo.valor){
                    data.longTotalSecc.valor = data.longSeccion.valor.reduce((acc, actl) => acc + actl, 0)
                    data.longTotalSecc.pass = true
                    mensajeError()
                } else {
                    data.longTotalSecc.valor = null
                    data.longTotalSecc.pass = false
                    mensajeError('secciones')
                }

                console.log(data);
            })
        })
        
    } else {
        seccion.forEach( secc => {
            secc.disabled = true
        })
    }
})


// FUNCIONES
function mensajeError(id){
    error.forEach( err => {
        if(err.parentElement.getAttribute('id') === id){
            err.classList.add('error')
        } else {
            err.classList.remove('error')
        }
    })
}









/*
longTramo.addEventListener('input', e => {
    const ER = /^(\d{1,3}(\.\d{1,2})?)$/
    
    if(ER.test(e.target.value)) {
        data.longTramo.valor = e.target.value
        data.longTramo.pass = true
        mensajeError()
        
    } else {
        data.longTramo.valor = false
        data.longTramo.pass = false
        mensajeError(e.target.parentElement.getAttribute('id'))
    }

})

numSecc.addEventListener('input', e => {
    const ER = /^(\d{1,2})$/
    
    if(ER.test(e.target.value)) {
        data.numSecc.valor = e.target.value
        data.numSecc.pass = true
        mensajeError()
    } else {
        data.numSecc.valor = false
        data.numSecc.pass = false
        mensajeError(e.target.parentElement.getAttribute('id'))
    }
})

console.log(data);

*/



