import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { DesignerDashboard } from "./designer/designer-dashboard/designer-dashboard";
import { BrowseDesigns } from "./browse-designs copy/browse-designs/browse-designs";
import { ProducerPortfolio } from "./producer/portfolio/producer-portfolio/producer-portfolio";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DesignerDashboard, BrowseDesigns, ProducerPortfolio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('D2D');
}
