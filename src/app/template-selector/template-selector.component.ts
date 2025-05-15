import { Component, Output, EventEmitter } from '@angular/core';
import { Template } from '../../interfaces/template';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoadingModalComponent } from '../shared/loading-modal/loading-modal.component';

@Component({
  selector: 'app-template-selector',
  standalone: true,
  imports: [CommonModule, LoadingModalComponent],
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css']
})
export class TemplateSelectorComponent {
  templates: Template[] = [];
  pageSize = 8;
  currentPage = 1;
  loading: boolean = false;

  @Output() messageEvent = new EventEmitter<Template>();

  constructor(private sanitizer: DomSanitizer) {}

  get totalPages(): number {
    return Math.ceil(this.templates.length / this.pageSize);
  }

  get pagedTemplates(): Template[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.templates.slice(start, start + this.pageSize);
  }

  ngOnInit() {
    this.loading = true;

    fetch('http://localhost:8080/api/cvtemplate/getAllTemplates')
      .then(response => response.json())
      .then(data => {
        this.templates = data;
        this.templates.forEach(template => {
          template.safeThumbnail = this.sanitizer.bypassSecurityTrustHtml(template.thumbnail);
        });
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  sendTemplate(template: Template) {
    this.messageEvent.emit(template);
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
