import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClient } from '@angular/common/http';
import { MenuService } from '../menu.service'; // Ensure this path is correct
import { Observable } from 'rxjs';
//import { MenuItem } from '../menu-item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  imports: [FormsModule, CommonModule], // Include CommonModule here
})

export class PaymentComponent implements OnInit {
  tableItems: { table_id: number; availability: boolean}[] = [];
  sortOrder: string = '';
  apiUrl = 'http://localhost:3001/restaurant'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.http.get<{ table_id: number; availability: boolean }[]>(this.apiUrl)
      .subscribe(data => {
        this.tableItems = data;
      }, error => {
        console.error('Error fetching menu data:', error);
      });
  }  
}



