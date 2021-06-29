import { withNestedPage } from "@/helpers/routerUtils";
const loadView = withNestedPage('post');

export const postRoutes = [
    {
        path: "/posts",
        component: {
            render: (h) => h('router-view')
        },
        children: [
            {
                name: "posts",
                path: "list",
                component: loadView('index')
            },
            {
                name: "form",
                path: "add",
                component: loadView("form"),
                meta: {
                    isEditButton: false
                }
            },
            {
                name: "edit-post",
                path: "edit/:id",
                component: loadView('form'),
                meta: {
                    isEditButton: true
                }
            }
        ]
    }
]
