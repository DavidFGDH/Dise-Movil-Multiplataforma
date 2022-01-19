<template>
  <li class="list-group-item d-flex justify-content-between align-center">
    <span role="button" :class="{completada:todo.estado}" @click="complete(todo.id)">
      {{todo.texto}}
    </span>
  <i class="fas fa-times" role="button" @click="eliminar(todo.id)"></i>
  </li>
</template>

<script>
import {inject,toRef} from "vue";
export default {
  props:{
    todo:{
      type:Object,
      required:true
    }
  },
  setup(){
    const tareas = inject('tareas')

    const complete = id =>{
      tareas.value = tareas.value.map(item => {
        if(item.id === id){
          item.estado = !item.estado
        }
        return item
      })
    }
    const eliminar = id =>{
      tareas.value = tareas.value.filter(item => item.id !== id)
    }

    return{
      complete,
      eliminar
    }

  }
}
</script>

<style scoped>
.completada{
  text-decoration: line-through;
  font-size:20px;
  color:red;
}
</style>
