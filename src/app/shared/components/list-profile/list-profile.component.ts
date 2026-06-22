import { Component, input } from '@angular/core';
import { PageResult } from '../../models/table/Table';
import { DashboardRegistersQuery } from '../../models/dashboard/DashboardRegistersQuery';
import { BadgeComponent } from '../badge/badge.component';
import { ProfileImageComponent } from "../profile-image/profile-image.component";
import { DatePipe } from '@angular/common';
import { ShortNamePipe } from '../../pipes/text/short-name-pipe';
import { ChangeDataToBrasilPipe } from '../../pipes/text/change-data-to-brasil-pipe';


@Component({
  selector: 'app-list-profile',
  imports: [BadgeComponent, ProfileImageComponent, DatePipe, ShortNamePipe, ChangeDataToBrasilPipe],
  templateUrl: './list-profile.component.html',
  styleUrl: './list-profile.component.scss',
})
export class ListProfileComponent {
  dataSource = input.required<PageResult<DashboardRegistersQuery>>();

}
