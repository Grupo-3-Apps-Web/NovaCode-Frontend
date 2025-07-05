import {createRouter, createWebHistory} from "vue-router";
import {authenticationGuard} from "../iam/services/authentication.guard.js";
import VehicleManagementComponent from "../navigation/pages/vehicle-management.component.vue";
import UserManagementComponent from "../dashboard/pages/user-management.component.vue";
import PageNotFoundComponent from "../public/pages/page-not-found.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import PublicationPageComponent from "../publications/pages/publication-page.component.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
     routes : [
    {   path: '/navigation', name:'navigation' , component: VehicleManagementComponent,    meta: {title: 'Navigation'}},
    {   path: '/publications',           name: 'publication', component: PublicationPageComponent,       meta: {title: 'Publications'}},
    {   path: '/dashboard',           name: 'dashboard', component: UserManagementComponent,       meta: {title: 'Dashboard'}},
    {   path: '/:pathMatch(.*)*',       name: 'not-found',  component: PageNotFoundComponent,       meta: {title: 'Page not found'}},
    { path: '/sign-up', name: 'sign-up', component: SignUpComponent, meta: { title: 'Sign Up'}},
    { path: '/sign-in', name: 'sign-in', component: SignInComponent, meta: { title: 'Sign In'}},
    {   path: '/',                      name: 'default',    redirect: {name: 'dashboard'}},
]
})

router.beforeEach((to,from,next) => {
    let baseTitle = 'AutomovilUnite' ;
    document.title = `${baseTitle} | ${to.meta['title']}`;
    authenticationGuard(to, from, next)
});
export default router;