const formulario = document.getElementById('formulario')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tareas = {}
document.addEventListener('DOMContentLoaded',()=> {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'));

    }
    pintarTareas()
})

listaTareas.addEventListener('click',(e)=>{
    btnAccion(e)
})

const pintarTareas = () => {
    localStorage.setItem('tareas',JSON.stringify(tareas))
    if(Object.values(tareas).length===0){
        listaTareas.innerHTML = `<div class="alert alert-dark">
            Sin Tareas Pendientes 😍
        </div>`
        return
    }
    listaTareas.innerHTML = ""
    Object.values(tareas).forEach(tarea => {
        console.log(tarea)
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.estado) {
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id


        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)
}

formulario.addEventListener('submit', e=>{
    e.preventDefault()
    setTarea(e)
})

const setTarea = (e) => {
    const textotareas = e.target.querySelector('input').value
    if(textotareas.trim() === ''){
        alert('no escribiste nada')
        return
    }

    const  tarea ={
        id:Date.now(),
        texto:textotareas,
        estado:false
    }

    tareas[tarea.id]=tarea
    console.log(tarea)
    pintarTareas()

    formulario.reset()
    e.target.querySelector('input').focus()
}

const btnAccion= e =>{
    if(e.target.classList.contains('fa-check-circle')){
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
    }
    if(e.target.classList.contains('fa-minus-circle')){
        delete(tareas[e.target.dataset.id])
        pintarTareas()
    }
    if(e.target.classList.contains('fa-undo-alt')){
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }
    e.stopPropagation()
}