import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy , OnChanges{


@Output() sideNavToggle = new EventEmitter<void>();
isAuth = false;
authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('ngOnInit isAuth:-');
    console.log(this.isAuth);
    this.authSubscription =  this.authService.authChange.subscribe(
      data => {
      this.isAuth  = data;
      console.log(this.isAuth);
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  toggleSideNav() {
    this.sideNavToggle.emit();
  }
  onLogOut() {
    this.authService.logOut();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
