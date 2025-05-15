import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSectionComponent } from '../view-section/view-section.component';
import { TailoringResultComponent } from '../tailoring-result/tailoring-result.component';
import { HeaderComponent } from '../header/header.component';
import { Template } from '../../interfaces/template';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { LoadingModalComponent } from '../shared/loading-modal/loading-modal.component';

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
  imports: [ViewSectionComponent, HeaderComponent, TailoringResultComponent, CommonModule, FooterComponent, LoadingModalComponent],
  templateUrl: './tailoring.component.html',
  styleUrls: ['./tailoring.component.css'],
})

export class TailoringComponent implements OnInit {
  @ViewChild(TailoringResultComponent) tailoringResultComponent!: TailoringResultComponent;

  buttonClicked = false;
  userData: any;
  tailorResponse: TailorResponse | null = null;
  errorMessage: string | null = null;
  selectedTemplateId: number | null = null;
  userId = -1;
  tailoringComment: string | null = null;
  userDataPdf: any;
  isTailoringComplete: boolean = false;
  isLoggedIn: boolean = false;
  loading: boolean = false;

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
        this.router.navigate(['/login']);
      }, 5000);
    }

    const email = this.authService.getEmail();
    if (email) {
      this.fetchProfile(email);
    }
  }

  updateIframeSrc(url: string): void {
  if (this.tailoringResultComponent && this.tailoringResultComponent.iframe) {
    if (this.selectedTemplateId === 1) {
      this.tailoringResultComponent.iframe.nativeElement.src = url; // Use the provided URL if template ID is 1
      console.log('Iframe src updated to:', url);
    } else {
      const publicSrc = `/jack.pdf`; // Path to the public folder
      this.tailoringResultComponent.iframe.nativeElement.src = publicSrc; // Use the public folder file
      console.log('Iframe src updated to public folder file:', publicSrc);
    }
  } else {
    console.error('Iframe element or TailoringResultComponent is not initialized.');
  }
}

  fetchProfile(email: string) {
    fetch(`http://localhost:8080/api/user/getProfile?mail=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
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
          interests: data.interests?.map((i: { interest: any }) => i.interest).filter(Boolean) || [],
          languages: data.languages || [],
          summary: data.summary?.summary || '',
          contactInfo: data.contactInfo || {}
        };
      });
  }

   ngAfterViewInit(): void {
    console.log('TailoringResultComponent initialized:', this.tailoringResultComponent);
  }

  onTemplateSelected(template: Template) {
    if (!this.isTailoringComplete) {
      console.error('Tailoring is not complete. Cannot select template.');
      return;
    }

    if (!this.tailoringResultComponent) {
      console.error('TailoringResultComponent is not initialized yet.');
      return;
    }

    if (template.id !== 1) {
      console.log('Template ID is not 1. Skipping fetch call.');
      const publicSrc = `/jack.pdf`; // Path to public folder
      this.tailoringResultComponent.updateIframeSrc(publicSrc);
      return;
    }

    this.selectedTemplateId = template.id;

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
      contactInfo: this.userData.contactInfo,
      templateId: this.selectedTemplateId,
    };

    fetch(`http://localhost:8080/api/cvtemplate/fillTemplateTemporary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to download PDF');
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
    this.loading = true;
    this.errorMessage = null;

    const jobOfferInput = document.getElementById('jobOffer') as HTMLInputElement;
    const jobOffer = jobOfferInput?.value || '';

    const payload: TailorRequest = {
      userData: this.userData,
      jobOffer: jobOffer
    };

    fetch('http://localhost:8080/api/tailor/tailorCV', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json() as Promise<TailorResponse>;
      })
      .then(data => {
        this.tailorResponse = data;
        this.userData = {
          education: data.tailoredCV.educations || [],
          experiences: data.tailoredCV.experiences || [],
          projects: data.tailoredCV.projects || [],
          softSkills: data.tailoredCV.softSkills || [],
          hardSkills: data.tailoredCV.hardSkills || [],
          certifications: data.tailoredCV.certifications || [],
          interests: data.tailoredCV.interests?.map((i: { interest: any }) => i.interest).filter(Boolean) || [],
          languages: data.tailoredCV.languages || [],
          contactInfo: this.userData.contactInfo,
          summary: data.tailoredCV.summary?.summary || '',
        };
        this.userDataPdf = this.userData;
        this.tailoringComment = data.tailoringComment;
        this.isTailoringComplete = true;
      })
      .catch(error => {
        console.error('Error calling tailorCV:', error);
        this.errorMessage = 'Unable to tailor CV at this time.';
        this.isTailoringComplete = false;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
