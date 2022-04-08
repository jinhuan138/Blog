<template>
  <div>
    <keep-alive>
      <component :is="com" />
    </keep-alive>
    <button @click="change">change</button>
  </div>
</template>
<script>
const Component1 = {
  data() {
    return {
      value: "Component1",
    };
  },
  render(h) {
    return <input v-model={this.value} />;
  },
};
const Component2 = {
  data() {
    return {
      value: "Component2",
    };
  },
  render(h) {
    return <input v-model={this.value} />;
  },
};
export default {
  data() {
    return {
      com: "Component1",
    };
  },
  components: { Component1, Component2 },
  methods: {
    change() {
      this.com === "Component1"
        ? (this.com = "Component2")
        : (this.com = "Component1");
    },
  },
};
</script>
<style scoped>
#demo {
  width: 50px;
  height: 50px;
  color: skyblue;
}
</style>
