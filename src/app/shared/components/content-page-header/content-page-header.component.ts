import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { every, filter } from 'rxjs';
import { LucideAngularModule } from "lucide-angular";
import { Icons } from '../../icons/icons';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';


@Component({
  selector: 'app-content-page-header',
  imports: [LucideAngularModule, MatButtonModule, ButtonComponent],
  templateUrl: './content-page-header.component.html',
  styleUrl: './content-page-header.component.scss',
})
export class ContentPageHeaderComponent implements OnInit {
click($event: MouseEvent) {
  console.log($event);
}
  constructor(
    private router: Router,
  ){}
  icons = Icons;
  title = signal<string>('');
  description = signal<string>('');
  buttonLabel = signal<string>('');
  routerLink = signal<string>('');
  icon = signal<keyof typeof Icons>('Plus');
  exportable = signal<boolean>(false);

  ngOnInit() {
    this.updatePageInfo();

    this.router.events
    .pipe(
      filter((event: any): event is NavigationEnd => 
        event instanceof NavigationEnd
    )
  )
    .subscribe(() => {
      this.updatePageInfo();
    })
  }

  private updatePageInfo() {
     let route  = this.router.routerState.root;

      while(route.firstChild) {
        route = route.firstChild
      }

      this.title.set(route.snapshot.title ?? "");
      this.description.set(route.snapshot.data['description'] ?? '');
      this.buttonLabel.set(route.snapshot.data['buttonLabel'] ?? '');
      this.icon.set(route.snapshot.data['icon'] ?? '');
      this.routerLink.set(route.snapshot.data['routerLink'] ?? '');
      this.exportable.set(route.snapshot.data['exportable'] ?? false);
  }
}
