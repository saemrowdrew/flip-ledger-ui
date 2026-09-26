import { Routes } from '@angular/router';
import { ResaleCurrentInventory } from './resale-current-inventory/resale-current-inventory';
import { InventoryFormAdd } from './inventory-form-add/inventory-form-add';
import { PerformanceMetrics } from './performance-metrics/performance-metrics';
import { AuthLogin } from './auth/auth-login/auth-login';
import { Signup } from './auth/signup/signup';
import { UserProfile } from './user-profile/user-profile';
import { authGuard } from './guards/auth-guard'; 
import { SellItem } from './sell-item/sell-item';
import { ListItem } from './list-item/list-item'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'inventory', component: ResaleCurrentInventory },
  { path: 'add-inventory', component: InventoryFormAdd },
  { path: 'performance-metrics', component: PerformanceMetrics },
  { path: 'login', loadComponent: () => import('./auth/auth-login/auth-login').then((c) => c.AuthLogin)},
  { path: 'signup', loadComponent: () => import('./auth/signup/signup').then((c) => c.Signup) },
  { path: 'profile', loadComponent: () => import('./user-profile/user-profile').then((c) => c.UserProfile) },
  { path: 'sell-item', component: SellItem },
  { path: 'list-item', component: ListItem }
];
