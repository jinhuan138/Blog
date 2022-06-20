import Test from './components/Test.vue'
import FocusTest from './example/focus/FocusTest.vue'
import Reader from './components/library/Reader.vue'
import Library from './components/library/Library.vue'
const routers =
    [
        {
            name: "Test",
            path: "/test",
            component: Test,
        },
        {
            name: "Focus",
            path: "/focus",
            component: FocusTest,
        },
        {
            name: "Reader",
            path: "/reader",
            component: Reader,
        },
        {
            name: "Library",
            path: "/library",
            component: Library,
        },
    ]
export default routers