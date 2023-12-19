import { createRouter, createWebHistory } from 'vue-router'
import RecipesView from '../views/RecipesView.vue'
import AddRecipeView from '../views/AddRecipeView.vue'
import UpdateRecipeView from '../views/UpdateRecipeView.vue'
import AboutView from '../views/AboutView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import DEMO from '../components/DEMO.vue'
import MyRecipesView from '../views/MyRecipesView.vue'
import { useUserStore } from "../stores/UserStore";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'recipes',
            component: RecipesView
        },
        {
            path: '/add-recipe',
            name: 'addRecipe',
            component: AddRecipeView
        },
        {
            path: '/update-recipe/:id',
            name: 'updateRecipe',
            component: UpdateRecipeView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/recipe/:id',
            name: 'recipe',
            component: RecipeDetailView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFoundView
        },
        {
            path: '/demo',
            name: 'demo',
            component: DEMO
        },
        {
            path: '/my-recipes',
            name: 'myRecipes',
            component: MyRecipesView,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    /* Store */
    const store = useUserStore()
    const { getCurrentUser, handleSignInGoogle, handleSignOutGoogle } = store
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        }
        else {
            next("/")
        }
    } else {
        next();
    }
})

export default router;