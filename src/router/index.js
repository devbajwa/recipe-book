import { createRouter, createWebHistory} from 'vue-router';
import RecipesView from '../views/RecipesView.vue';
import AddRecipeView from '../views/AddRecipeView.vue';
import AboutView from '../views/AboutView.vue';
import RecipeDetail from '../components/RecipeDetail.vue';
import NotFoundView from '../views/NotFoundView.vue';
import DEMO from '../components/DEMO.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/',
            name: 'recipes',
            component: RecipesView
        },
        {
            path:'/add-recipe',
            name: 'addRecipe',
            component: AddRecipeView
        },
        {
            path:'/recipe/:id',
            name: 'recipe',
            component: RecipeDetail
        },
        {
            path:'/about',
            name: 'about',
            component: AboutView
        },
        {
            path:'/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFoundView
        },
        {
            path:'/demo',
            name: 'DEMO',
            component: DEMO
        },
    ]
})

export default router;