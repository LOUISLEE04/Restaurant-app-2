// src/app/menu/menu.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClient } from '@angular/common/http';
import { MenuService } from '../menu.service'; // Ensure this path is correct
import { Observable } from 'rxjs';
//import { MenuItem } from '../menu-item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Include CommonModule here
})
export class MenuComponent implements OnInit {
  menuItems: { item_id: number; name: string; item_price: number; category: string }[] = [];
  searchQuery: string = '';
  sortOrder: string = '';
  apiUrl = 'http://localhost:3001/menu'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    this.http.get<{ item_id: number; name: string; item_price: number; category: string }[]>(this.apiUrl)
      .subscribe(data => {
        this.menuItems = data;
      }, error => {
        console.error('Error fetching menu data:', error);
      });
  }

  searchMenu(): void {
    const url = this.searchQuery ? `${this.apiUrl}?search=${this.searchQuery}` : this.apiUrl;
    this.http.get<{ item_id: number; name: string; item_price: number; category: string }[]>(url)
      .subscribe(data => {
        this.menuItems = data;
      }, error => {
        console.error('Error fetching menu data:', error);
      });
  }

  sortMenu(): void {
    console.log("Sorting by:", this.sortOrder); // Add this line for debugging
    const url = `${this.apiUrl}?sort=${this.sortOrder}`;
    this.http.get<{ item_id: number; name: string; item_price: number; category: string }[]>(url)
      .subscribe(data => {
        this.menuItems = data;
      }, error => {
        console.error('Error fetching sorted menu data:', error);
      });
}

  
}


