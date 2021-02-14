import { Component, Input, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/_services/side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  isToggled: boolean;
  // isToggled: boolean = false;

  constructor(private sideBarService: SideBarService) {}

  ngOnInit(): void {
    this.sideBarService.isToggledClick.subscribe(
      (res) => {
        this.isToggled = res;
      },
      () => {},
      () => {}
    );
  }

  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }
}
