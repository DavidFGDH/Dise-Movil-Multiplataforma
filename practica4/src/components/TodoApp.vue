<template>
  <h1 class="my-5 text-center">Proyecto de Lista de Tareas</h1>
  <todo-form/>
  <todo-list/>
</template>

<script>
import {provide,ref,watchEffect} from "vue";
import TodoForm from './TodoForm'
import TodoList from './Todolist'
export default {
  components:{
    TodoForm,
    TodoList
  },
  setup(){
    const tareas =ref([])
    provide('tareas',tareas)

    if(localStorage.getItem('tareas')){
      tareas.value = JSON.parse(localStorage.getItem('tareas'))
    }
    watchEffect(()=>{
      localStorage.setItem('tareas',JSON.stringify(tareas.value))
    })
  }
}
</script>

<style>

</style>
