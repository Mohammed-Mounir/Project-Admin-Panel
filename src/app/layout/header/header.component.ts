import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SideBarService } from 'src/app/_services/side-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isToggled: boolean = false;

  constructor(private sideBarService: SideBarService) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isToggled = !this.isToggled;
    this.sideBarService.isToggledClick.emit(this.isToggled);
  }
}
