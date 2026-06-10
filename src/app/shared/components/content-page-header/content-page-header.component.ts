import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LucideAngularModule } from "lucide-angular";
import { Icons } from '../../icons/icons';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-content-page-header',
  imports: [LucideAngularModule, LucideAngularModule, MatButtonModule],
  templateUrl: './content-page-header.component.html',
  styleUrl: './content-page-header.component.scss',
})
export class ContentPageHeaderComponent implements OnInit {
  constructor(
    private router: Router,
  ){}
  icons = Icons;
  title = signal('');
  description = signal('');
  buttonLabel = signal('');
  icon = signal<keyof typeof Icons>('Plus');
  exportable = signal(false);

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
      this.exportable.set(route.snapshot.data['exportable'] ?? false);
  }
}
