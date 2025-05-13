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

  sanitizedSvg(template : Template): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(template.thumbnail);
  }

  ngOnInit() { // TODO put back the fetch
  //   // getting the templates from the server
  //   fetch('http://localhost:8080/cvtemplates/getAllTemplates')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Assuming the data is an array of templates
  //       this.templates = data;
  //     }
  //     )
  //     .catch(error => {
  //       console.error('Error fetching templates:', error);
  //     }
  //     );
  // }
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

  trackById(index: number, template: Template): number {
    return template.id;
  }

}