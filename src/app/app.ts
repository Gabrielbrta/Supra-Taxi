import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('motora-erp');
}
