<template>
  <div>
    <div class="row">
      <Button requisite v-model="ipt1" label="必输框" ref="ipt1"></Button>
      <Button type="button">选项1</Button>
    </div>
    <div class="row">
      <Button requisite v-model="ipt2"></Button>
      <Button requisite v-model="ipt3"></Button>
    </div>
    <Button type="button" @click="handleClick">选项1</Button>
  </div>
</template>

<script>
import Button from "./focus-item.vue";
import { FocusManager } from "./signUpFocus";
export default {
  name: "HelloWorld",
  mixins: [FocusManager],
  components: {
    Button,
  },
  data() {
    return {
      value: true,
      ipt1: "",
      ipt2: "",
      ipt3: "",
      ipt4: "",
    };
  },
  mounted() {
    this.$watch("msg", () => {
      console.log("改变msg");
    });
    this.msg = "456";
  },
  methods: {
    handleClick() {
      this.msg = "456";
      console.log("123131315");
    },
  },
};
</script>
<style scoped>
.switch {
  position: fixed;
  right: 10px;
  top: 10px;
}
.row {
  display: flex;
}
</style>