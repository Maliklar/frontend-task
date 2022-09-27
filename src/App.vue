<template>
  <div>
    <CardComponent />
  </div>
</template>

<script>
import CardComponent from './components/CardComponent.vue';

export default {
  name: 'App',

  components: {
    CardComponent
  },

}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
