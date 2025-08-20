import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-public',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './public.html',
  styleUrl: './public.css'
})
export class Public {

}
