<template>
  <div id="app">{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello Vue!",
    };
  },
};
</script>
<style scoped>
#app {
  text-align: center;
}
</style>
