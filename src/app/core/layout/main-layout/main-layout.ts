import { Component } from '@angular/core';
import { Header } from "../partials/header/header";
import { Sidebar } from "../partials/sidebar/sidebar";
import { Footer } from "../partials/footer/footer";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  imports: [Header, Sidebar, Footer, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

}
