import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  activeItem: string = 'questions'

  constructor() {
    if (window.location.pathname.includes('questions')) {
      this.activeItem = 'questions'
    } else {
      this.activeItem = 'users'
    }
  }

  ngOnInit(): void {
    if (!JSON.parse(localStorage.getItem('token'))) {
      window.location.href = "/login"
    }
  }

}
