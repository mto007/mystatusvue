<template>
  <div>
    <MyStatusForm />
  </div>
</template>

<script>
import MyStatusForm from "./components/MyStatusForm.vue";

export default {
  name: "App",
  components: {
    MyStatusForm,
  },
};
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
</style>
