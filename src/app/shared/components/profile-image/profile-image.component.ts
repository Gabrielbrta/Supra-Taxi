import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  imports: [],
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss',
})
export class ProfileImageComponent {
  name = input.required<string>();
  typeColor = input.required<'Primary' | 'Simple'>();
  nameProfile: string = '';

  getName() {
    const nameParts: string[] = this.name()!.split(' ');
      this.nameProfile = '';
      this.nameProfile += nameParts[0][0];      
      this.nameProfile += nameParts[nameParts.length - 1][0];      
    return this.nameProfile;
  }
}
