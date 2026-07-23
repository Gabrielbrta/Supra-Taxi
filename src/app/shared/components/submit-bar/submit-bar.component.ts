import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-submit-bar',
  imports: [],
  templateUrl: './submit-bar.component.html',
  styleUrl: './submit-bar.component.scss',
})
export class SubmitBarComponent {
  isShowing = signal<boolean>(false);
  formValid = input<boolean>(false);

  constructor() {
    effect(() => {
      if(this.formValid() === true) {
        this.isShowing.set(true);
      } else {
        this.isShowing.set(false);
      }
    })
  }

  show(){ this.isShowing.set(true)} 
  hide(){ 
    if(this.formValid() === true) {
      this.show();
    } 
    else {
      this.isShowing.set(false)
    }

  } 
}
