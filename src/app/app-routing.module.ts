import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component'
import { PostComponent } from './components/post/post.component'


const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'posts', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }