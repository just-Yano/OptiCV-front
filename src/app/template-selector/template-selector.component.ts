import { Component, Output, EventEmitter } from '@angular/core';
import { Template } from '../../interfaces/template';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; 

@Component({
  selector: 'app-template-selector',
  imports: [CommonModule],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.css'
})
export class TemplateSelectorComponent {
  templates : Template[] = [];
  @Output() messageEvent = new EventEmitter<Template>();

  sendTemplate(template: Template) {
    this.messageEvent.emit(template);
  }

  constructor(private sanitizer: DomSanitizer) {}


  ngOnInit() { // TODO put back the fetch
    // getting the templates from the server
    fetch('http://localhost:8080/cvtemplates/getAllTemplates')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is an array of templates
        this.templates = data;
        this.templates.forEach(template => {
          // Sanitize the thumbnail SVG string
          template.safeThumbnail = this.sanitizer.bypassSecurityTrustHtml(template.thumbnail);
        });
      }
      )
      .catch(error => {
        console.error('Error fetching templates:', error);
      }
      );
  }

  trackById(index: number, template: Template): number {
    return template.id;
  }

}
