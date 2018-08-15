import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
// import { AuthGuard } from './auth/auth.guard';
// import { RecipeModule } from './recipe/recipe.module';

const routes: Routes = [
  { path: 'auth', children: [
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent }

  ] },
  // { path: 'recipes', loadChildren: () => RecipeModule, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/auth/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }