import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() userData: any; 
  @Output() templateSelected = new EventEmitter<Template>();

 templateChosen: boolean = false;
  template: Template = { 
    id: -1,
    name: '',
    description: '',
    thumbnail: '',
    safeThumbnail: ''
  };  

  receiveTemplate(template: Template) {
    console.log('Received template:', template);
    this.templateChosen = true;
    this.template = template;
    this.templateSelected.emit(template); // Emit the selected template
  }
}
