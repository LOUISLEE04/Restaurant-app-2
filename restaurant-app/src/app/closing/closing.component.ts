// closing.component.ts
// closing.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.scss']
})
export class ClosingComponent {
  denominations = [
    { label: '$100 Bills', value: 100, count: 0, count2: 0, count3: 0},
    { label: '$50 Bills', value: 50, count: 0, count2: 0, count3: 0 },
    { label: '$20 Bills', value: 20, count: 0, count2: 0, count3: 0 },
    { label: '$10 Bills', value: 10, count: 0, count2: 0, count3: 0 },
    { label: '$5 Bills', value: 5, count: 0, count2: 0, count3: 0 },
    { label: '$1 Bills', value: 1, count: 0, count2: 0, count3: 0 },
    { label: 'Quarters', value: 0.25, count: 0, count2: 0, count3: 0 },
    { label: 'Dimes', value: 0.10, count: 0, count2: 0, count3: 0 },
    { label: 'Nickels', value: 0.05, count: 0, count2: 0, count3: 0 },
    { label: 'Pennies', value: 0.01, count: 0, count2: 0, count3: 0 },
  ];
  totalNotes = 0;
  totalCoins = 0;
  totalCash = 0;


  updateCount(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (!isNaN(value) && value >= 0) {
      this.denominations[index].count = value;
      
      if (this.denominations[index].value <1){//this is a coin, count2
        this.denominations[index].count2 = value;
        this.denominations[index].count3 = 0;
      }
      else{ //this is a note
        this.denominations[index].count2 = 0;
        this.denominations[index].count3 = value;
      }

      this.calculateTotalCash();
      this.calculateTotalCoins();
      this.calculateTotalNotes();
    }
  }

  calculateTotalNotes(){
    this.totalNotes = this.denominations.reduce(
      (sum, denom) => sum + denom.count3 * denom.value,
      0
    );
  }

  calculateTotalCoins(){
    this.totalCoins = this.denominations.reduce(
      (sum, denom) => sum + denom.count2 * denom.value,
      0
    );
  }
  calculateTotalCash() {
    this.totalCash = this.denominations.reduce(
      (sum, denom) => sum + denom.value * denom.count,
      0
    );
  }
  
  getFormattedTotalCash(): string {
    return this.totalCash.toFixed(2); // Formats total to two decimal places
  }

  getFormattedTotalNotes(): string { //Formats total notes to two decimal places
    return this.totalNotes.toFixed(2);
  }

  getFormattedTotalCoins(): string { //Formats total coins to two decimal places
    return this.totalCoins.toFixed(2)
  }
  resetCalculator(){
    this.denominations.forEach(denom => {
      denom.count = 0;
      denom.count2 = 0;
      denom.count3 = 0;
    });
      this.totalNotes = 0;
      this.totalCoins = 0;
      this.totalCash = 0;
  }
}

