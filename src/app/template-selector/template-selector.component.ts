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


  ngOnInit() { // TODO put back the fetch
    // getting the templates from the server
    // fetch('http://localhost:8080/cvtemplates/getAllTemplates')
    //   .then(response => response.json())
    //   .then(data => {
    //     // Assuming the data is an array of templates
    //     this.templates = data;
    //     this.templates.forEach(template => {
    //       // Sanitize the thumbnail SVG string
    //       template.safeThumbnail = this.sanitizer.bypassSecurityTrustHtml(template.thumbnail);
    //     });
    //   }
    //   )
    //   .catch(error => {
    //     console.error('Error fetching templates:', error);
    //   }
    //   );

    // Sample data TODO remove
    this.templates = [
      { id: 1, name: 'Modern Website', description: 'A sleek and modern website template.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>" , safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 2, name: 'E-Commerce Store', description: 'Perfect template for online stores with shopping cart functionality.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>", safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 3, name: 'Portfolio', description: 'Showcase your work and skills with this stylish portfolio template.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>", safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 4, name: 'Blog', description: 'Simple and clean template for a personal blog.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>", safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 5, name: 'Business Landing Page', description: 'A professional template for business landing pages.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>", safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 6, name: 'Photography Gallery', description: 'Perfect for photographers to showcase their work with a grid gallery.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>" ,   safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 7, name: 'News Website', description: 'Template for online news with an article layout and multimedia content.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>", safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 8, name: 'Restaurant Menu', description: 'Beautiful template designed for restaurant websites with menus and ordering functionality.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>", safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 9, name: 'Creative Agency', description: 'A modern and vibrant template for creative agencies and digital studios.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>", safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
      { id: 10, name: 'Educational Platform', description: 'Perfect template for educational institutions and online learning platforms.', thumbnail: "<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>", safeThumbnail: this.sanitizer.bypassSecurityTrustHtml("<svg><rect x='0' y='0' width='100' height='100' stroke='black' fill='white' stroke-width='2'/></svg>") },
    ];
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
