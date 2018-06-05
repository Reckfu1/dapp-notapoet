<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import index from '@/views/index'
export default {
  name: 'App',
  components:{
    index
  }
}
</script>

<style>
#app {
  font-family: 'Open Sans','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
