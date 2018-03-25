import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

interface MenuItem {
  value: string;
  icon: string;
  text: string;
}

@Component({
  selector: 'unpaper-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent {
  @Output() public close = new EventEmitter<void>();

  public menuItems: MenuItem[] = [
    { value: 'home', icon: 'home', text: 'Home' },
    // { value: 'popular', icon: 'star', text: 'Popular' },
    // { value: 'history', icon: 'history', text: 'History' },
    // { value: 'settings', icon: 'settings', text: 'Settings' },
    // { value: 'about', icon: 'info', text: 'About' },
  ];

  public onClose() {
    this.close.emit();
  }
}
