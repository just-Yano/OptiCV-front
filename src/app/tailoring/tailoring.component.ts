import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSectionComponent } from '../view-section/view-section.component';
import { TailoringResultComponent } from '../tailoring-result/tailoring-result.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tailoring',
  imports: [ViewSectionComponent, HeaderComponent, TailoringResultComponent, CommonModule],
  templateUrl: './tailoring.component.html',
  styleUrl: './tailoring.component.css'
})
export class TailoringComponent {

  buttonClicked: boolean = false;

  viewTemplates() {
    this.buttonClicked = true;
  }

}
