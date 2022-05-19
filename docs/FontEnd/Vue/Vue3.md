## vue3
<img loop="" src="../../.vuepress/public/img/spring.gif" width="100%" height="100%"  >
</img>

## setup 

- setup：新的 option，所有的组合 API 函数都在此使用

  ::: demo

  ```vue
  <div class="hello">{{ msg }}</div>
  <script>
      import { defineComponent ,toRefs,getCurrentInstance} from 'vue-demi'
      export default defineComponent({
          props: {
              title: {
                  type: String,
                  default: "vue3",
              },
          },
          setup(props, context) {
              //组合api入口函数，只会触发一次
              //如果返回对象，可以在模板中使用
              //无法访问data、computed、methods、模板refs
              const msg= "Hello vue3";
              const {attrs} =context//包括attrs、emit、slots属性
              //console.log(props.title)
              const { title } = toRefs(props)//使用toRefs解构保持响应性
              //没有this,可以通过getCurrentInstance获取实例
              const instance= getCurrentInstance()//VueComponent
              return { msg };
          },
      })
  </script>
  ```

  :::

- setup script语法糖

  ```vue
  <div>
      <input @input="change($event)" :value="user" />
      {{user}}
  </div>
  <script lang="ts" setup>
      import { ref,useSlots, defineProps, useAttrs } from "vue-demi";  
      //defineEmit,defineProps,defineExpose定义属性、事件...,useContext弃用
      const user = ref("小明");//不需要return
      function change(e: any) {
          user = e.target.value;
      }
      const solt:any =useSlots()//获取插槽
      console.log(solt.default())
      console.log(useAttrs())//获取属性与事件
  </script>
  ```

## 响应式

- ref：定义一个基本类型响应式数据

  ::: demo

  ```vue
  <div>
      {{ count }}
      <button @click="count++">加1</button>
      <!-- 模板中不需使用.value写法 -->
      <button @click="add">加1</button>
  </div>
  <script>
      import { ref } from "vue-demi";
      export default {
          name: "hello",
          setup() {
              let a = 0; //此时a不是响应式的
              let count = ref(a);//依然是靠object.defineProperty()的get与set完成的
              function add() {
                  count.value++;// 通过xxx.value操作数据
              }
              return {
                  count,
                  add,
              }
          }
      }
  </script>
  ```

  :::

- reactive:接收普通对象，返回该对象的响应式代理对象

  ::: demo

  ```vue
  <div>
      {{ `${user.name} is ${user.age}` }}
      <p>性别：{{ user.sex }}</p>
  <button @click="update">更新数据</button>
  </div>
  <script>
      import { ref, reactive } from "vue-demi";
      export default {
          name: "hello",
          setup() {
              const obj= {
                  name: "小甜甜",
                  age: 18,
              };
              let user = reactive(obj);//使用Proxy来实现响应式（数据劫持）, 并通过Reflect操作源对象内部的数据。
              //返回Proxy代理对象
              function update() {
                  user.name = "牛夫人"
                  user.age=19
                  user.sex = "女"
                  //需要使用代理对象更新属性值
              }
              return { user,update }
          },
      }
  </script>
  ```
  

​       :::

- toRefs

  ::: demo

  ```vue
  <template>
  <div>
      <img :src="img" style='width:100px'/>
      <p>{{ author }}</p>
      <p>{{ name }}</p>
      </div>
  <div id="ipt"></div>
  </template>
  <script>
      import { toRefs, reactive, h, createApp, nextTick, onMounted } from "vue-demi";
      export default {
          setup() {
              const book = reactive({
                  author: "HcySunYang",
                  name: "Vue.js设计与实现",
                  img: "https://img3.jarhu.com/goodimg/202202/151/di1644900399702.jpg",
              });
              let { author, name, img } = toRefs(book); //toRefs保持响应式
              const render = h("input", {
                  value: name.value,
                  onInput: e => {
                      name.value = e.target.value;
                  },
              });
              nextTick(() => {
                  createApp({
                      render: () => render,
                  }).mount("#ipt");
              });
              return { author, name, img };
          },
      };
  </script>
  ```

  :::

## 响应式原理

+ [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)配合[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)(静态方法)实现响应式。

  ```js
  var obj = {
      //目标对象
      name: "刘备",
      wife: {
          name: "孙尚香",
          age: 18,
      },
  };
  const proxyObj = new Proxy(obj, {
      //代理对象
      get(target, value) {
          //获取属性值
          console.log(value + "的get调用");
          return Reflect.get(target, value); //反射对象反射目标对象属性
      },
      set(target, prop, value) {
          //添加/修改属性值
          console.log(value + "的set调用");
          return Reflect.set(target, prop, value);
      },
      deleteProperty(target, prop) {
          //删除属性值
          console.log(prop + "的deleteProperty调用");
          return Reflect.set(target, prop);
      },
  });
  console.log(proxyObj.name); //通过代理对象获取目标对象属性值
  proxyObj.name = "孙策"; //通过代理对象更改目标对象属性值
  proxyObj.sex = "男"; //通过代理对象添加属性
  delete proxyObj.name; //通过代理对象删除属性
  proxyObj.wife.name = "大乔";
  console.log(obj);
  ```

---

## 生命周期钩子

+ 在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

  ::: demo

  ```vue
  <script>
  import { defineComponent,onMounted } from 'vue-demi'
  
  export default defineComponent({
    setup() {
      onMounted(()=>{
        // console.log('Component is mounted!')
      })
    },
  })
  </script>
  ```

  :::

---

## 独立的计算属性

+ 从 Vue 导入的 `computed` 函数

  ::: demo

  ```vue
  <script>
  import { ref, computed ,defineComponent} from 'vue-demi'
  
  export default defineComponent({
    setup() {
      const mun=ref(1)
      const mun1=computed(()=>mun.value*2)
      mun.value++
      //console.log(mun1.value)//4
    },
  });
  </script>
  ```

  :::

---

## 模板引用

+ ref

  ::: demo

  ```vue
  <template> 
    <div ref="demo">demo</div>
  </template>
  
  <script>
    import { ref, onMounted } from 'vue-demi'
  
    export default {
      setup() {
        const demo = ref(null)
  
        onMounted(() => {
          // DOM 元素将在初始渲染后分配给 ref
          //console.log(demo.value) // <div>demo</div>
        })
      }
    }
  </script>
  ```

  :::