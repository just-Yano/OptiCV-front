import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Template } from '../../interfaces/template';
import { TemplateSelectorComponent } from '../template-selector/template-selector.component';
import { AddSectionComponent } from '../add-section/add-section.component';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-creation',
  imports: [HeaderComponent, CommonModule, TemplateSelectorComponent, AddSectionComponent, FooterComponent],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css'
})
export class CreationComponent {
  templateChosen: boolean = false;
  public isLoggedIn: boolean = false;
  template: Template = { 
    id: -1,
    name: '',
    description: '',
    thumbnail: '',
    safeThumbnail: ''
  };  

  constructor(private authService: AuthService, private router : Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    if (!this.isLoggedIn) {
      setTimeout(() => {
      this.router.navigate(['/login']);}
      , 5000);
    }
  }
  
  receiveTemplate(template: Template) {
    this.templateChosen = true;
    this.template = template;

    fetch(`http://localhost:8080/api/cvtemplate/getEmptyTemplate?cvTemplateId=${this.template.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const iframe = document.querySelector('iframe'); // Select the iframe element
      if (iframe) {
        iframe.src = url; // Set the blob URL as the iframe's src
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });


  }


  // TODO : check what to do 
  generate() {

    const latexCode = ``;  // TODO : get the final cv to download
  // You can dynamically build this from user inputs if needed
  
  
    fetch('http://localhost:8080/api/cvtemplate/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: latexCode
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to download PDF');
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Resume_OptiCV.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error:', error));
}


}
