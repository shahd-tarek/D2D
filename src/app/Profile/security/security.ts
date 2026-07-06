import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-security',
  imports: [],
  templateUrl: './security.html',
  styleUrl: './security.css',
})
export class Security {
   constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
