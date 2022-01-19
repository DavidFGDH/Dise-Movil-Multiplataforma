<template>
  <ul class="list-group">
    <todo-item v-for="item in todos" :key="item.id" :todo="item" />
    <todo-footer v-if="todos.length"/>

    <li v-if="todos.length === 0" class="list-group-item">
      SIN TAREAS PENDIENTES 😍
    </li>

  </ul>
  <todo-filter/>
</template>

<script>
import {computed,inject,provide,ref} from "vue";
import TodoItem from "@/components/TodoItem";
import TodoFooter from "@/components/TodoFooter";
import TodoFilter from "@/components/TodoFilter";
export default {
  components: {TodoFilter,TodoFooter,TodoItem},
  setup(){
    const tasks = inject('tareas')
    const estado = ref('all')
    const todos = computed(()=>{
      if(estado.value === 'all'){
        return tasks.value
      }
      if(estado.value === 'active'){
        return tasks.value.filter(item => item.estado === false)
      }
      if(estado.value === 'complete'){
        return tasks.value.filter(item => item.estado === true)
      }
    })
    provide('estado',estado)
    return {
      todos
    }
  }
}
</script>
