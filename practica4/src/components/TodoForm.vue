<template>
  <form class="formulario" @submit.prevent="agregarTarea">
  <input type="text" class="form-control my-2 inputText" placeholder="Create a new task" v-model.trim="texto">
  </form>
</template>

<script>
import {inject,ref,toRef} from "vue";
export default {
  setup(){
    const tareas = inject('tareas')
    const texto = ref('')
    const agregarTarea = () =>{
      if(texto.value===''){
        alert('Tareas Vacia')
        return
      }
      const tarea ={
        id:Date.now(),
        texto:texto.value,
        estado: false
      }
      //console.log(tarea)
      texto.value=''

      tareas.value.push(tarea)
      //console.log(tareas)
    }

    return{
      texto,
      agregarTarea
    }
  }

}
</script>

<style scoped>
.formulario{
  border-width:1px;
  border-color:blue;
  border-radius:5px;
  border-style:solid;
  width: 100%;
}
.inputText{
  margin-left:0px;
}
</style>
