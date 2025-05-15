import { Component, OnInit } from '@angular/core';
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
  tailoringComment: string | null = null;

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
    ngOnInit() {
    const email = 'daniel@opti.com';
    this.fetchProfile(email);
  }

  fetchProfile(email: string) {
  fetch(`http://localhost:8080/api/user/getProfile?mail=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
.then(data => {
  this.userId = data.id;

  this.userData = {

    educations: data.educations || [],
    experiences: data.experiences || [],
    projects: data.projects || [],
    softSkills: data.softSkills || [],
    hardSkills: data.hardSkills || [],
    certifications: data.certifications || [],
    interests: data.interests?.map((i: { interest: any; }) => i.interest).filter(Boolean) || [],
    languages: data.languages || [],
    // your summary comes back wrapped in an object
    summary: data.summary?.summary || '',
    // if you need contactInfo downstream, you can pass it as well
    contactInfo: data.contactInfo || {}
  };

    });
  }

  onTemplateSelected(template: Template) {
    this.selectedTemplateId = template.id;
    
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
          console.log('PDF Blob:', blob);
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

    console.log('Payload:', payload);

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
        console.log('Tailored CV:', data.tailoredCV);
        console.log('Tailoring comment:', data.tailoringComment);
        this.userData = {
        // note: your backend uses "educations" not "education"
        education: data.tailoredCV.educations || [],
        experiences: data.tailoredCV.experiences || [],
        projects: data.tailoredCV.projects || [],
        softSkills: data.tailoredCV.softSkills || [],
        hardSkills: data.tailoredCV.hardSkills || [],
        certifications: data.tailoredCV.certifications || [],
        interests: data.tailoredCV.interests?.map((i: { interest: any; }) => i.interest).filter(Boolean) || [],
        languages: data.tailoredCV.languages || [],
        // your summary comes back wrapped in an object
        summary: data.tailoredCV.summary?.summary || '',
        // if you need contactInfo downstream, you can pass it as well
        contactInfo: data.tailoredCV.contactInfo || {}
      };
      this.tailoringComment = data.tailoringComment;

      })
      .catch(error => {
        console.error('Error calling tailorCV:', error);
        this.errorMessage = 'Unable to tailor CV at this time.';
      });
  }

}
