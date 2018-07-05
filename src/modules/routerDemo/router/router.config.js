import demoA from "../components/demoA.vue";
import demoB from "../components/demoB.vue"

export default {
    routes: [
        {
            path: "/demoA",
            component: demoA
        },
        {
            path: "/demoB",
            component: demoB
        },
        {
            path: "*",
            redirect: "/demoA"
        }
    ]
};
