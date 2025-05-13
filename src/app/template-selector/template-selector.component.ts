import { Component, Output, EventEmitter } from '@angular/core';
import { Template } from '../../interfaces/template';
import { CommonModule } from '@angular/common';

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

  ngOnInit() {
    // TODO: Fetch from server
    // fetch('http://localhost:8080/cvtemplates/getAllTemplates')
    //   .then(res => res.json())
    //   .then(data => this.templates = data)
    //   .catch(err => console.error('Error fetching templates:', err));

    // Sample data
    this.templates = [
      { id: 1, name: 'Modern Website', description: 'A sleek and modern website template.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 2, name: 'E-Commerce Store', description: 'Perfect template for online stores with shopping cart functionality.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 3, name: 'Portfolio', description: 'Showcase your work and skills with this stylish portfolio template.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 4, name: 'Blog', description: 'Simple and clean template for a personal blog.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 5, name: 'Business Landing Page', description: 'A professional template for business landing pages.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 6, name: 'Photography Gallery', description: 'Perfect for photographers to showcase their work with a grid gallery.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 7, name: 'News Website', description: 'Template for online news with an article layout and multimedia content.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 8, name: 'Restaurant Menu', description: 'Beautiful template designed for restaurant websites with menus and ordering functionality.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 9, name: 'Creative Agency', description: 'A modern and vibrant template for creative agencies and digital studios.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" },
      { id: 10, name: 'Educational Platform', description: 'Perfect template for educational institutions and online learning platforms.', thumbnail: "<rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/>" }
    ];
  }

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

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  trackById(index: number, template: Template): number {
    return template.id;
  }
}
