<template>
  <!-- 输入框 -->
  <ValidationProvider
    v-slot="{ errors, classes }"
    rules="rule"
    :name="label || '此项'"
    v-if="type === 'input'"
    class="validate"
  >
    <div class="row">
      <div class="label">{{ label }}</div>
      <input
        class="default input"
        placeholder="请输入"
        v-model="innerValue"
        :class="classes"
        ref="pure-comp"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
  <!-- 按钮 -->
  <button
    v-else-if="type === 'button'"
    class="default button"
    ref="pure-comp"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <slot></slot>
  </button>
  <!-- switch -->
  <!-- <span
    @click="() => $emit('input', !this.value)"
    v-else-if="type === 'switch'"
  >
    <span class="switch" :class="{ switch_active: value }">
      <span
        class="switch_button"
        :class="{ switch_button_active: value }"
      ></span>
    </span>
  </span> -->
</template>
<script>
const focusType = ["button", "input", "switch"];
import { ValidationProvider } from "vee-validate";
import { validate } from "vee-validate";
import { configure } from "vee-validate";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
export default {
  name: "focus-item",
  domain: "platform",
  components: { ValidationProvider },
  data() {
    return {
      innerValue: this.value,
    };
  },
  watch: {
    innerValue(val) {
      this.$emit("input", val);
    },
  },
  props: {
    type: {
      //组件类型
      type: String,
      default: "input",
      validator: (value) => focusType.indexOf(value) !== -1,
    },
    value: {
      //值
      type: [String, Number, Boolean],
      default: true,
    },
    requisite: {
      //必输
      type: Boolean,
      default: false,
    },
    validator: {
      //校验
      type: Function,
    },
    label: {
      //占位符
      type: String,
    },
  },
  created() {
    this.name = this.type.replace(this.type[0], this.type[0].toUpperCase());
    if (this.type === "input") this.initInput();
  },
  methods: {
    check() {
      if (this.type === "input") {
        return validate(this.innerValue, "rule");
      }
      return {
        valid: true,
      };
    },
    initInput() {
      configure({
        classes: {
          invalid: "is-invalid",
        },
      });
      extend("rule", {
        ...required,
        message: " {_field_} 为必输项",
      });
    },
    stopAction() {
      console.log("拦截默认事件");
      this.$el.addEventListener("click", this.stopProp);
      this.$refs["pure-comp"].addEventListener("click", this.stopProp);
      // console.log(this.$refs['pure-comp'])
    },
    activeAction() {
      this.$el.removeEventListener("click", this.stopProp);
    },
    //阻止事件冒泡，阻止默认事件,阻止事件本身
    stopProp(event) {
      event.stopPropagation();
      event.preventDefault();
      return false;
    },
    //向上传递focus blur
    handleFocus(event) {
      this.$emit("focus", event);
      return false;
    },
    handleBlur(event) {
      this.$emit("blur", event);
    },
    //手动设置focus blur
    focus() {
      this.$refs["pure-comp"].focus();
    },
    blur() {
      this.$refs["pure-comp"].blur();
    },
  },
};
</script>
<style scoped>
.validate {
  display: inline-block;
}
.row {
  display: flex;
}
.row .label {
  height: 40px;
  width: 80px;
  line-height: 40px;
  text-align: right;
  margin-right: 20px;
}
.error {
  color: #e74a41;
  margin-left: 100px;
}
.is-invalid {
  border: 1px solid #e74a41 !important;
}
.default {
  width: 100px;
  height: 40px;
  background-color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
.button {
  display: inline-block;
}
.button:hover,
.button:focus {
  /* button点击后为focus */
  background-color: #ecf5ff;
  color: #3a8ee6;
  border-color: #3a8ee6;
  cursor: pointer;
  outline: none;
}
.input {
  display: inline-block;
  width: 280px;
  height: 40px;
  text-align: left;
  color: #606266;
  padding: 0 15px;
}
.input:focus {
  border: 1px solid #409eff;
  outline: none;
}
.switch {
  width: 40px;
  height: 20px;
  background-color: rgb(255, 73, 73);
  cursor: pointer;
  border-radius: 10px;
  position: relative;
  display: inline-block;
}
.switch_active {
  background-color: rgb(19, 206, 102);
}
.switch_button {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 100%;
}
.switch_button_active {
  left: 22px;
}
</style>