import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateTo(path: string) {
    console.log(`Navigating to ${path}`);
    this.router.navigate([path]);
  }
  navigateToMenu() {
    this.router.navigate(['/menu']);
  }
}
