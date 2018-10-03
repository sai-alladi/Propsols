import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'propsols-app';
  images=["assets/bgimage1.jpg","assets/bgimage2.jpg","assets/bgimage3.jpg","assets/bgimage.jpg"];
  showNavigationArrows = false;
  showNavigationIndicators = true;
}
