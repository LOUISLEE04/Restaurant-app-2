import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { TableComponent } from './table/table.component';
import { PaymentComponent } from './payment/payment.component';
import { ClosingComponent } from './closing/closing.component'; // Import your ClosingComponent
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route
  { path: 'menu', component: MenuComponent },
  { path: 'table', component: TableComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'closing', component: ClosingComponent },
  { path: '**', redirectTo: '' } // Redirect unknown paths to home
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      FormsModule, // Import FormsModule here
    ],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
