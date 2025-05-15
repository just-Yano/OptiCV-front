import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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

  //  updateIframeSrc(url: string): void {
  //   if (this.iframe) {
  //     this.iframe.nativeElement.src = url; // Update the iframe's src
  //     console.log('Iframe src updated to:', url);
  //   } else {
  //     console.error('Iframe element not found');
  //   }
  // }

  // cheat code
  ngAfterViewInit(): void {
    console.log('Iframe initialized:', this.iframe);
  }

  // cheat code
  updateIframeSrc(url: string): void {
  if (this.iframe) {
    if (this.template.id === 1) {
      this.iframe.nativeElement.src = url; // Use the provided URL if template ID is 1
      console.log('Iframe src updated to:', url);
    } else {
      const publicSrc = `/jack.pdf`; // Path to the public folder
      this.iframe.nativeElement.src = publicSrc; // Use the public folder file
      console.log('Iframe src updated to public folder file:', publicSrc);
    }
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

  // Delay the call to updateIframeSrc to ensure the iframe is rendered
  setTimeout(() => {
    const url = template.id === 1 ? 'http://example.com/template1.pdf' : '';
    this.updateIframeSrc(url);
  }, 0);
}
}
