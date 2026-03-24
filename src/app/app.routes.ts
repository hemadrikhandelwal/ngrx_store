import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { Products } from './pages/products/products';

export const routes: Routes = [
    {   path:'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
        title:'Login Page'
    },
    {
        path:'register',
        loadComponent:()=> import('./pages/register/register').then(m=>m.Register),
    },
    {
        path:'',
        loadComponent:()=>import('./pages/main-layout').then(m=> m.MainLayout),
        children:[
            {
                path:'products',
                loadComponent:()=> import('./pages/products/products').then(m=>m.Products)
            },
            {
                path:'cart',
                loadComponent:()=> import ('./pages/cart/cart').then(m=>m.Cart)
            },
            {
                path:'profile',
                loadComponent:()=>import('./pages/profile/profile').then(m => m.Profile)
            }
        ]
    }


  


];
