<template> 
  <div ref="demo">demo</div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const demo = ref(null)

      onMounted(() => {
        // DOM 元素将在初始渲染后分配给 ref
        console.log(demo.value) // <div>This is a root element</div>
      })
    }
  }
</script>
