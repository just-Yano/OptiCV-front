import { Component, Output, EventEmitter } from '@angular/core';
import { Template } from '../../interfaces/template';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; 

@Component({
  selector: 'app-template-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css']
})
export class TemplateSelectorComponent {
  templates: Template[] = [];
  pageSize = 8;
  currentPage = 1;

  @Output() messageEvent = new EventEmitter<Template>();


  get totalPages(): number {
    return Math.ceil(this.templates.length / this.pageSize);
  }

  get pagedTemplates(): Template[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.templates.slice(start, start + this.pageSize);
  }

  sendTemplate(template: Template) {
    this.messageEvent.emit(template);
  }

  constructor(private sanitizer: DomSanitizer) {}


  ngOnInit() {
    // getting the templates from the server
    fetch('http://localhost:8080/api/cvtemplate/getAllTemplates')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is an array of templates
        this.templates = data;
        console.log(data);
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

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  trackById(index: number, template: Template): number {
    return template.id;
  }
}
