class FocusManagerCode {
    constructor() {
        this.scope = {};//当前域
        this.nodeList = [];//焦点管控的组件
        this.index = -1;//当前元素
        this.currentNode = {}
        this.predictIndex = -1;//预测元素
        this.predictNode = {},
            this.cycleMap = { // 生命周期状态
                0: {
                    name: 'preFocus',
                    handler: this.previousGetFocus.bind(this)
                },
                1: {
                    name: 'focus',
                    handler: this.getFocus.bind(this)
                },
                2: {
                    name: 'preLost',
                    handler: this.previousLostFocus.bind(this)
                },
                3: {
                    name: 'lost',
                    handler: this.lostFocus.bind(this)
                },
                4: {
                    name: 'final',
                    handler: this.finalCycle.bind(this)
                }
            };
    }
    init(scope) {
        this.scope = scope
        this.getList(scope)//this.nodeList.reverse()
        this.softList()
        this.predictIndex = this.index + 1;
        this.predictNode = this.nodeList[this.predictIndex] || null
        this.proxyEvent(scope)
        this.lifeCycle()
    }
    //获取nodeList
    getList(root) {//没考虑插槽,vue3废除$children,使用slots()获取子组件
        root.$children.forEach(component => {
            const { domain } = component.$options
            if (domain) {
                const node = {
                    element: component,
                    state: 0,
                    elementTop: component.$el.getBoundingClientRect().top + component.$el.scrollTop,//滚动条+元素左上角位置
                    elementLeft: component.$el.getBoundingClientRect().left + component.$el.scrollLeft
                }
                this.nodeList.push(node)
            }
        })
    }
    //nodeList排序,从左到右，从上到下
    softList() {
        this.nodeList.sort((a, b) => a.elementLeft - b.elementLeft)
        this.nodeList.sort((a, b) => a.elementTop - b.elementTop)
        console.log(this.nodeList)
    }
    //事件代理
    proxyEvent(component) {
        //未绑定this,this为事件源(component.$el),绑定为FocusManagerCode实例
        component.$el.addEventListener('mousedown', this.mousedownEvent.bind(this));
        component.$el.addEventListener('mouseup', this.mouseupEvent.bind(this));
        component.$el.addEventListener('keydown', this.keydownEvent.bind(this));
    }
    //beforeDestroy解绑事件
    detach() {
        component.$el.removeEventListener('mousedown', this.mousedownEvent);
        component.$el.removeEventListener('mouseup', this.mouseupEvent);
        component.$el.removeEventListener('keydown', this.keydownEvent);
    }
    //鼠标按下
    mousedownEvent(e) {
        const el = e.target.closest(`[data-focus-type]`)
        if (!el) return //没点击到焦点元素
        e.stopPropagation()
        e.preventDefault()
        //参考http://cubicspot.blogspot.com/2020/05/when-to-actually-use-preventdefault.html
        //直接阻止click无效，通过阻止mousedown事件阻止click
        const index = this.findIndex(el)
        console.log(index)
        this.predictNode = this.nodeList[index]
        this.predictIndex = index
    }
    //鼠标抬起
    mouseupEvent(e) {
        //点击
        const el = e.target.closest(`[data-focus-type]`)
        if (!el) return //没点击到焦点元素
        const index = this.findIndex(el)
        if (this.nodeList[index] === this.predictNode) {
            console.log('click')
            this.lifeCycle()
        }
    }
    //按键
    keydownEvent(e) {
        //previousGetFocus==》getFocus
        //previousLostFocus==》lostFocus=》预测元素生命周期
        //13回车 32空格 37左 38上 39右 40下 9tab
        let codeList = [9, 13, 37, 38, 39, 40]
        if (!codeList.includes(e.keyCode)) return;
        // 左，上 向前
        if ([37, 38].includes(e.keyCode)) {
            if (this.index === 0) return
            this.predictIndex = this.index - 1
            this.predictNode = this.nodeList[this.predictIndex];
        }// 回车，右，下 向后
        if ([13, 39, 40].includes(e.keyCode)) {
            if (this.index === this.nodeList.length - 1) return
            this.predictIndex = this.index + 1
            this.predictNode = this.nodeList[this.predictIndex];
        }
        this.lifeCycle()
    }
    //生命周期
    getCycle(node, predict) {
        console.log('getCycle', node, this.currentNode)
        const state = Object.keys(node).length ? node.state : predict.state
        return this.cycleMap[state]
    }
    lifeCycle(node) {
        let currentCycle = node ? this.getCycle(node) : this.getCycle(this.currentNode, this.predictNode)
        let current = Object.keys(this.currentNode).length === 0 ? false : this.currentNode //currentNode为空对象
        return currentCycle.handler(node || current || this.predictNode)
    }
    //获取焦点前，state: 0
    async previousGetFocus(node) {
        //验证之前的栏位，判断是否可以获取焦点
        const index = this.findIndex(node.element)
        let flag = await this.resetFocus(node, index)
        console.log('flag', flag)
        if (typeof flag === 'number') {//未通过栏位获取焦点     
            console.log('未校验通过栏位获取焦点' + flag)
            this.currentNode = this.nodeList[flag]
            this.currentNode.state = 1;
            this.currentNode.ableFocus = true;
            return this.lifeCycle(this.currentNode)
        } else {
            node.state = 1;
            return this.lifeCycle(node);
        }
    }
    //是否可获取焦点
    async resetFocus(node, index) {
        for (let i = 0; i < index; i++) {
            const item = this.nodeList[i];
            const res = await item.element.check()
            if (!res.valid) return i
        }
        return true
    }
    //获取焦点，state: 1
    getFocus(node) {
        const vm = node.element
        vm.focus && vm.focus()
        this.index = this.findIndex(node.element)
        console.log(this.index, '获取焦点')
        node.state = 2;
        this.currentNode = node
    }
    findIndex(component) {
        const el = component.$el || component//解决点击获取index
        return this.nodeList.findIndex(i => i.element.$el === el)
    }
    //previousLostFocus 2
    async previousLostFocus(node) {
        const res = await node.element.check()
        if (!res.valid) return
        node.state = 3
        this.lifeCycle()
    }
    //失去焦点，state: 3
    lostFocus(node) {
        node.element.blur()
        node.state = 4
        this.lifeCycle()
    }
    //结束生命周期重置  state: 4
    finalCycle(node) {
        node.state = 0//按键上左重新获取焦点时重走生命周期
        console.log('预测焦点', this.findIndex(this.predictNode))
        this.lifeCycle(this.predictNode);//走预测焦点
    }
}
export {
    FocusManagerCode
}