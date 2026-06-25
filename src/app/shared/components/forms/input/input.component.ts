import { Component, input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatHint } from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-input',
  imports: [MatFormField, MatLabel, MatHint, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  value = input.required<any>();
  label = input.required<string>();
  name = input.required<string>();
  placeholder = input.required<string>();
  hidden = input<boolean>();
  type = input.required<string>();
  id = input<string>();
}
