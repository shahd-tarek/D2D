import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-privacy',
  imports: [],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class Privacy {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
