## JSX

+ 列表循环

  ```react
  import { useState } from "react";
  function List() {
      const [list] = useState([
          "零化域的缺失之环",
          "闭时曲线的碑文",
          "对偶福音的规约",
          "模糊像散的孤独",
          "二律背反的双重人格",
          "永劫回归的潘多拉",
          "回折叙唱的鹅妈妈",
          "盟誓的文艺复兴",
      ]);
      return (
          <ul>
              {list.map((i, index) => 
                        <li key={index}>{i}</li>
                       )}
          </ul>
      );
  }
  export default List;
  ```

+ 传递属性

  ```react
  function Son(props){
        return <>{props.msg}</>
  }
  
  function Father() {
  	return  <Son msg='hello'/>
  }
  
  export default Father;
  ```

+ 事件

  ```react
  import { useState } from "react";
  function Button() {
      const [count, setCount] = useState(0);
      //使用useState Hook
      //count用于保存渲染间的数据。
      //setCount函数 更新变量并触发 React 再次渲染组件。
      return (
          <button
              onClick={() => {
                  setCount(count + 1);
              }}
              >
              {count}
          </button>
      );
  }
  
  export default Button;
  ```

## Hook

+ ref

  ```react
  //使用 ref 引用值
  import { useRef } from "react";
  export default function App() {
  	let ref = useRef(0);
  	//useRef 返回一个这样的对象{
  	// current: 0 // 你向 useRef 传入的值
  	//}
  	function handleClick() {
      //组件不会在每次递增时重新渲染
  		ref.current = ref.current + 1;
      console.log(ref.current)
  	}
  
  	return <button onClick={handleClick}>button</button>;
  }
  ```

  ```react
  //使用 ref 操作 DOM
  import { useRef } from "react";
  
  export default function App() {
  	const inputRef = useRef(null);
  	function handleClick() {
  		inputRef.current.focus();
  	}
  
  	return (
  		<>
  			<input ref={inputRef} />
  			<button onClick={handleClick}>focus</button>
  		</>
  	);
  }
  ```

+ Effect 

  ```
  
  ```