import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit {
@Output() closeSideNav = new EventEmitter<void>();
authSubscription: Subscription;
isAuth;
  constructor(private authService: AuthService) { }

  ngOnInit() {this.authService.authChange.subscribe(authStatus => {
    this.isAuth = authStatus;
  });
  }
  onClose() {
    this.closeSideNav.emit();
  }
  onLogOut() {
    this.authService.logOut();
    this.onClose();
  }
}
