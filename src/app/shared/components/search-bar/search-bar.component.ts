import { Component } from '@angular/core';
import { InputComponent } from "../forms/input/input.component";

@Component({
  selector: 'app-search-bar',
  imports: [InputComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {

}
