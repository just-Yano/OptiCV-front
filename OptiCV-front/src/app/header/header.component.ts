import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router : Router) {
    router = router;
   }

  navigateTo(route: string) {
    // Use the router to navigate to the specified route
    this.router.navigate([route]);
  }
}
