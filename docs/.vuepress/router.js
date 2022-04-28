import Test from './components/Test.vue'
import FocusTest from './example/focus/FocusTest.vue'
export const routers =
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
    ]
