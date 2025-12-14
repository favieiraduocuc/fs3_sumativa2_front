import { Routes } from '@angular/router';

// LAYOUTS
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
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
import { LabCreateComponent } from './features/labs/pages/lab-create/lab-create.component';

// RESULTADOS (JWT)
import { ResultadoListComponent } from './features/resultados/pages/resultado-list/resultado-list.component';

//  EXÁMENES
import { MisExamenesComponent } from './features/examenes/pages/mis-examenes/mis-examenes.component';

// PROFILE
import { ProfileEditComponent } from './features/profile/profile-edit/profile-edit.component';

// GUARD
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegisterComponent },
      { path: 'recuperar-clave', component: ForgotPasswordComponent }
    ]
  },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardHomeComponent },

      // LABS
      { path: 'laboratorios', component: LabListComponent },
      { path: 'laboratorios/nuevo', component: LabCreateComponent },

      // RESULTADOS / EXÁMENES
      { path: 'resultados', component: ResultadoListComponent }, // ✅ JWT OK
      { path: 'mis-examenes', component: MisExamenesComponent }, // ✅ NUEVO

      // PROFILE
      { path: 'perfil', component: ProfileEditComponent },
      { path: 'usuarios/registrar', component: RegisterComponent },

      // ADMIN
      {
        path: 'admin/usuarios',
        loadComponent: () =>
          import('./features/admin/pages/admin-usuarios/admin-usuarios.component')
            .then(m => m.AdminUsuariosComponent),
      },
    ]
  },

  { path: '**', redirectTo: 'login' }
];
