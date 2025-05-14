import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateSelectorComponent } from '../template-selector/template-selector.component';
import { ViewSectionComponent } from '../view-section/view-section.component';
import { Template } from '../../interfaces/template';

@Component({
  selector: 'app-tailoring-result',
  imports: [TemplateSelectorComponent, ViewSectionComponent, CommonModule],
  templateUrl: './tailoring-result.component.html',
  styleUrl: './tailoring-result.component.css'
})
export class TailoringResultComponent {
 templateChosen: boolean = false;
  template: Template = { 
    id: -1,
    name: '',
    description: '',
    thumbnail: '',
    safeThumbnail: ''
  };  

  receiveTemplate(template: Template) {
    this.templateChosen = true;
    this.template = template;
  }
}
