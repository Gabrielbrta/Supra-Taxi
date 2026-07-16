import { Component, computed, input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProgressItem } from '../../models/forms/ProgressItem';
@Component({
  selector: 'app-profile-panel',
  imports: [MatProgressBarModule],
  templateUrl: './profile-panel.component.html',
  styleUrl: './profile-panel.component.scss',
})
export class ProfilePanelComponent {

  progressItems = input.required<ProgressItem[]>();
  profileImage = input<File | null>(null);

  fotoUrl = computed(() => {
    const file = this.profileImage()

    if(!file) {
      return 'https://placehold.co/1280x720'
    }
    
    if(file.type !== "image/jpeg" && file.type !== "image/png") {
      return 'https://placehold.co/1280x720'
    }

    return URL.createObjectURL(file);
  })
}
