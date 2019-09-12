import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextEditorComponent } from './shared/components/text-editor/text-editor.component';


const routes: Routes = [
  {path: 'customers', loadChildren: './pages/customer/customer.module#CustomerModule'},
  {path: 'editor-text', component: TextEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
