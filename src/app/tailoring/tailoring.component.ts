import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSectionComponent } from '../view-section/view-section.component';
import { TailoringResultComponent } from '../tailoring-result/tailoring-result.component';
import { HeaderComponent } from '../header/header.component';
import { Template } from '../../interfaces/template';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';

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
export class TailoringComponent implements OnInit {
  @ViewChild(TailoringResultComponent) tailoringResultComponent!: TailoringResultComponent;

  buttonClicked = false;
  userData: any; // Your full CV JSON
  tailorResponse: TailorResponse | null = null;
  errorMessage: string | null = null;
  selectedTemplateId: number | null = null;
  userId = -1;
  tailoringComment: string | null = null;
  userDataPdf: any;
  isTailoringComplete: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.userData = {
      experiences: [],
      education: [],
      projects: [],
      softSkills: [],
      hardSkills: [],
      certifications: [],
      interests: [],
      languages: [],
      contactInfo: {},
      summary: ''
    };
    this.isLoggedIn = this.authService.isLoggedIn();
  }
    ngOnInit() {
      if (!this.isLoggedIn) {
      setTimeout(() => {
      this.router.navigate(['/login']);}
      , 5000);
    }
    const email = this.authService.getEmail();
    if (email) {
      this.fetchProfile(email);
    }
    
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

  console.log('User Data on init:', this.userData);

    });
  }

  onTemplateSelected(template: Template) {
    if(!this.isTailoringComplete) {
      console.error('Tailoring is not complete. Cannot select template.');
      return;
    }
    
    console.log('onTemplateSelected called with template:', template);
    this.selectedTemplateId = template.id;
    
    console.log(this.userDataPdf);

    const payload = {
      educations: this.userDataPdf.education,
      experiences: this.userDataPdf.experiences,
      projects: this.userDataPdf.projects,
      softSkills: this.userDataPdf.softSkills,
      hardSkills: this.userDataPdf.hardSkills,
      certifications: this.userDataPdf.certifications,
      interests: this.userDataPdf.interests,
      languages: this.userDataPdf.languages,
      summary: this.userDataPdf.summary,
      contactInfo: this.userData.contactInfo, // contact info stays from init
      templateId: this.selectedTemplateId,
    }

    console.log('Payload for PDF generation:', payload);


    // api call
    fetch(`http://localhost:8080/api/cvtemplate/fillTemplateTemporary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Failed to download PDF');
      }
      return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        this.tailoringResultComponent.updateIframeSrc(url);

    })
    .catch(error => {
      console.error('Error:', error);
    });

  }

  startTailoring(): void {
    console.log('Start tailoring button clicked');
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
        // keep the same contact info
        contactInfo: this.userData.contactInfo,
        // your summary comes back wrapped in an object
        summary: data.tailoredCV.summary?.summary || '',
      };
      console.log('User Data:', this.userData);
      this.userDataPdf = this.userData;
      console.log('User Data PDF:', this.userDataPdf);

      this.tailoringComment = data.tailoringComment;
      this.isTailoringComplete = true; // Set the flag to true when tailoring is complete
      })
      .catch(error => {
        console.error('Error calling tailorCV:', error);
        this.errorMessage = 'Unable to tailor CV at this time.';
        this.isTailoringComplete = false; // Set the flag to false if there's an error
      });
  }

}
