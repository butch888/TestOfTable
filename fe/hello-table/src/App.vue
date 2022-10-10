<template>
  <div id="app">
    <div class="title">Test of table</div>
    <HelloTable />
  </div>
</template>

<script>
import HelloTable from './components/HelloTable.vue'

export default {
  name: 'App',
  components: {
    HelloTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  font-size: 36px;
  font-weight: bold;
}
</style>
