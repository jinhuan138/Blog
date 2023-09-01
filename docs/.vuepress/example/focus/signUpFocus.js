import { FocusManagerCode } from './focus-manager'
const FocusManager = {
    data() {
        return {
            focusManager: new FocusManagerCode(),
        };
    },
    mounted() {
        console.log('激活焦点')
        this.focusManager.init(this);
    },
    provide() {
        return {
            focusManager: this.focusManager,
        };
    },
    updated() {
        // this.focusManager.getList()
        // this.focusManager.softList()
    },
    beforeDestroy() {
        this.focusManager.detach();
    },
}
export {
    FocusManager
}
