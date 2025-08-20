import { Component } from '@angular/core';
import { Header } from './header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { MenuSideBar } from "./menu-side-bar/menu-side-bar";

@Component({
  selector: 'app-secure',
  imports: [Header, Footer, RouterOutlet, MenuSideBar],
  templateUrl: './secure.html',
  styleUrl: './secure.css'
})
export class Secure {

}
