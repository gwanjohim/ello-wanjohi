import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { WordDefinitionComponent } from './components/word-definition/word-definition.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo:'home'
  }, {
    path: 'home',
    component: BookComponent,
  }, {
    path: 'home/word',
    component: WordDefinitionComponent,
  }, {
    path: 'pages/*',
    redirectTo: 'home',
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
