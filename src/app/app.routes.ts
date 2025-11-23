import { Routes } from '@angular/router';

// LAYOUTS
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './features/dashboard/layout/dashboard-layout.component';

// HOME PÚBLICO
import { HomeComponent } from './features/public/home/home.component';

// AUTH
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';

// DASHBOARD
import { DashboardHomeComponent } from './features/dashboard/dashboard-home/dashboard-home.component';

// LABS
import { LabListComponent } from './features/labs/lab-list/lab-list.component';

// RESULTS
import { ResultListComponent } from './features/results/result-list/result-list.component';

// PROFILE
import { ProfileEditComponent } from './features/profile/profile-edit/profile-edit.component';

// GUARD
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ⬇️ AHORA la raíz muestra la página pública de bienvenida
  { path: '', component: HomeComponent },

  // Rutas públicas (sin sesión)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegisterComponent },
      { path: 'recuperar-clave', component: ForgotPasswordComponent }
    ]
  },

   // Rutas privadas (dashboard) con layout propio
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardHomeComponent },                 // /dashboard
      { path: 'laboratorios', component: LabListComponent },           // /dashboard/laboratorios
      { path: 'resultados', component: ResultListComponent },          // /dashboard/resultados
      { path: 'perfil', component: ProfileEditComponent },             // /dashboard/perfil
      { path: 'usuarios/registrar', component: RegisterComponent }     // /dashboard/usuarios/registrar
    ]
  },

  // Rutas no encontradas
  { path: '**', redirectTo: 'login' }
];