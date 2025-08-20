import { Component } from '@angular/core';
import { LoginService } from '../../../../services/shared/login-service';
import { Subscription } from 'rxjs';
import { Login } from "../login/login";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-dashboard',
  imports: [Login,CommonModule],
  templateUrl: './public-dashboard.html',
  styleUrl: './public-dashboard.css'
})
export class PublicDashboard {
  title = 'WeddingServices';
  services = [
    { title: 'Car Rental', desc: 'Luxury cars and transportation for your special day', icon: '🚗' },
    { title: 'Bus Service', desc: 'Comfortable bus services for guests transportation', icon: '🚌' },
    { title: 'Tent Decoration', desc: 'Beautiful tent setups and decorations for events', icon: '⛺' },
    { title: 'Marriage Hall', desc: 'Elegant marriage halls for your dream wedding', icon: '🏛️' },
    { title: 'Photography', desc: 'Professional photography to capture your moments', icon: '📷' },
    { title: 'Music & DJ', desc: 'Best music systems and DJ services', icon: '🎵' },
    { title: 'Catering', desc: 'Delicious catering services with variety of cuisines', icon: '🍽️' },
    { title: 'Vatika & Gardens', desc: 'Beautiful garden venues for outdoor celebrations', icon: '🌿' }
  ];

  showLogin = false;
  private sub: Subscription[]=[];
  constructor(private loginService: LoginService) {}
 ngOnInit() {
    this.sub.push(
     this.loginService.loginVisible$.subscribe(visible => {
      this.showLogin = visible;
    })
  );
  }
  openLogin() {
    this.showLogin = true;
  }

ngOnDestroy(){
  this.sub.forEach(sub=>sub.unsubscribe);
}
}
