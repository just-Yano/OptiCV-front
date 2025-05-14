import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSectionComponent } from '../view-section/view-section.component';
import { TailoringResultComponent } from '../tailoring-result/tailoring-result.component';
import { HeaderComponent } from '../header/header.component';
import { Template } from '../../interfaces/template';

interface TailorRequest {
  userData: any;
  jobOffer: string;
}

interface TailorResponse {
  tailoredCV: any;
  tailoringComment: string;
}

@Component({
  selector: 'app-tailoring',
  standalone: true,
  imports: [ViewSectionComponent, HeaderComponent, TailoringResultComponent, CommonModule],
  templateUrl: './tailoring.component.html',
  styleUrls: ['./tailoring.component.css']
})
export class TailoringComponent {

  buttonClicked = false;
  userData: any; // Your full CV JSON
  tailorResponse: TailorResponse | null = null;
  errorMessage: string | null = null;
  selectedTemplateId: number | null = null;
  userId = -1;

  constructor() {
    this.userData = {
      experiences: [],
      education: [],
      projects: [],
      softSkills: [],
      hardSkills: [],
      certifications: [],
      interests: [],
      languages: [],
      summary: ''
    };
  }

  onTemplateSelected(template: Template) {
    this.selectedTemplateId = template.id;
    console.log('Selected template ID:', this.selectedTemplateId);
    
    // api call
    fetch(`http://localhost:8080/api/cvtemplate/fillTemplateTemporary?userId=${this.userId}&cvTemplateId=${this.selectedTemplateId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.userData),
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
          a.download = "refresh.pdf";
          a.click();
          window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }

  startTailoring(): void {
    this.buttonClicked = true;
    this.errorMessage = null;

    const jobOfferInput = document.getElementById('jobOffer') as HTMLInputElement;
    const jobOffer = jobOfferInput?.value || '';
  // TODO: populate this.userData with the actual CV data

    const payload: TailorRequest = {
      userData: this.userData,
      jobOffer: jobOffer
    };

    fetch('http://localhost:8080/api/tailor/tailorCV', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<TailorResponse>;
      })
      .then(data => {
        this.tailorResponse = data;
      })
      .catch(error => {
        console.error('Error calling tailorCV:', error);
        this.errorMessage = 'Unable to tailor CV at this time.';
      });
  }

}
