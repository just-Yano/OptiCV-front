import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('resumeIframe') iframe!: ElementRef<HTMLIFrameElement>; // Reference to the iframe
  @Input() userData: any; 
  @Input() tailoringComment: string | null = null;
  @Output() templateSelected = new EventEmitter<Template>();

   updateIframeSrc(url: string): void {
    if (this.iframe) {
      this.iframe.nativeElement.src = url; // Update the iframe's src
      console.log('Iframe src updated to:', url);
    } else {
      console.error('Iframe element not found');
    }
  }

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
