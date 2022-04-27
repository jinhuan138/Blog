

##### setup 

- setup：新的 option，所有的组合 API 函数都在此使用

  ```vue
  <div class="hello">{{ msg }}</div>
  <script lang="ts">
    export default {
      setup(props, context) {
        //组合api入口函数，只会触发一次
        //如果返回对象，可以在模板中使用
        const msg: string = "Hello vue3";
        console.log(context); //包括attrs、emit、slots属性
        console.log(props); //包含props配置的属性
        console.log(context.attrs); //没有在props配置属性对象
        return { msg };
      },
    };
  </script>
  ```

- setup script语法糖

  ```vue
  <div>
      <input @input="change($event)" :value="user" />
      {{user}}
  </div>
  <script lang="ts" setup>
      import { ref,useSlots, defineProps, useAttrs } from "vue";  
      //defineEmit,defineProps,defineExpose定义属性、事件...,useContext弃用
      const user = ref("小明");//不需要return
      function change(e: any) {
          user = e.target.value;
          console.log(user);
      }
      const solt:any =useSlots()//获取插槽
      console.log(solt.default())
      console.log(useAttrs())//获取属性与事件
  </script>
  ```

- ref：定义一个基本类型响应式数据

  ```vue
  <div>
    {{ count }}
    <el-button type="" @click="count++">加1</el-button>
    <!-- html中不需使用.value写法 -->
    <!-- vue3中使用的是element-plus -->
    <el-button type="" @click="add">加1</el-button>
  </div>
  <script lang="ts">
    import { ref, defineComponent } from "vue";
    export default defineComponent({
      name: "hello",
      setup() {
        let a = 0; //此时a不是响应式的
        let count = ref(a);
        function add() {
          count.value++;
          // 通过xxx.value操作数据
        }
        return {
          count,
          add,
        };
      },
    });
  </script>
  ```

- reactive:接收普通对象，返回该对象的响应式代理对象

  ```vue
  <div>
      {{ `${user.name} is ${user.age}` }}
      p>性别：{{ user.sex }}</p>
  <el-button type="" @click="update">更新数据</el-button>
  </div>
  <script lang="ts">
  import { ref, defineComponent, reactive } from "vue";
  export default defineComponent({
          name: "hello",
          setup() {
              const obj: any= {
                  name: "小甜甜",
                  age: 18,
              };
              let user = reactive(obj);
              //返回Proxy代理对象
              function update(): void {
                  console.log(user)
                  user.name = "牛夫人";
              user.age=19
              ser.sex = "女";
              //需要使用代理对象更新属性值
          }
          return { user,update };
      },
  });
  </script>
  ```

- 响应式原理

  [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)配合[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)(静态方法)实现响应式。

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
