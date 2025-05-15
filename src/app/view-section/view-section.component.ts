import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetProfilResponse } from '../../interfaces/GetProfilResponse';
import { ContactInfo } from '../../interfaces/contact-info';
import { Experience } from '../../interfaces/experience';
import { Education } from '../../interfaces/education';
import { Certification } from '../../interfaces/certification';
import { Project } from '../../interfaces/project';
import { HardSkill } from '../../interfaces/hard-skill';
import { SoftSkill } from '../../interfaces/soft-skill';
import { Language } from '../../interfaces/language';
import { Interest } from '../../interfaces/interest';
import { Summary } from '../../interfaces/summary';
import { AuthService } from '../services/authentication/auth.service';


@Component({
  selector: 'app-view-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-section.component.html',
  styleUrl: './view-section.component.css'
})
export class ViewSectionComponent implements OnInit, OnChanges {
  @Input() showAddButton: boolean = false;
  @Input() userData: any = null; // Input parameter for userData

  constructor(private authService: AuthService) {}

  contactInfo: ContactInfo[] = [];
  summary: Summary[] = [];
  experiences: Experience[] = [];
  educations: Education[] = [];
  hardSkills: HardSkill[] = [];
  softSkills: SoftSkill[] = [];
  projects: Project[] = [];
  languages: Language[] = [];
  certifications: Certification[] = [];
  interests: Interest[] = [];
  
  email: string = '';

  ngOnInit() {
    this.email = this.authService.getEmail() ?? '';
    
    if (!this.email) {
      console.error('Email is empty. Cannot fetch profile.');
      return; // Stop further execution if email is empty
    }
    console.log('Email:', this.email); // Debug print

    // If userData is not passed, fetch it from the API
    if (!this.userData) {
      console.log('userData not passed, fetching from API...');
      this.fetchProfile(this.email);
    }

    // set contact info
    fetch(`http://localhost:8080/api/user/getProfile?mail=${encodeURIComponent(this.email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then((data: GetProfilResponse) => {
        console.log('Profile data:', data); // Debug print
        this.contactInfo = data.contactInfo ? [data.contactInfo] : [];
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });

  }

  ngOnChanges() {
    // If userData is passed, process it
    if (this.userData) {
      console.log('Received userData as input:', this.userData);
      this.processUserData(this.userData);
    }
  }

  processUserData(data: any) {
    // this.contactInfo = data.contactInfo ? [data.contactInfo] : [];
  // Wrap the summary string in another object
  this.summary = data.summary
    ? [{ summary: data.summary.summary || data.summary }]
    : [];
    this.educations = data.education || [];
    this.experiences = data.experiences || [];
    this.hardSkills = data.hardSkills || [];
    this.softSkills = data.softSkills || [];
    this.projects = data.projects || [];
    this.languages = data.languages || [];
    this.certifications = data.certifications || [];
    this.interests = data.interests || [];
  }

  fetchProfile(email: string) {
    fetch(`http://localhost:8080/api/user/getProfile?mail=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then((data: GetProfilResponse) => {
        console.log('Profile data:', data); // Debug print

        this.educations = data.educations || [];
        this.experiences = data.experiences || [];
        this.hardSkills = data.hardSkills || [];
        this.softSkills = data.softSkills || [];
        this.projects = data.projects || [];
        this.contactInfo = data.contactInfo ? [data.contactInfo] : [];
        this.summary = data.summary ? [data.summary] : [];
        this.languages = data.languages || [];
        this.certifications = data.certifications || [];
        this.interests = data.interests || [];
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }





  // “selected” holders for each section:
  selectedContact: any = null;
  selectedSummary: any = null;
  selectedEducation: any = null;
  selectedExperience: any = null;
  selectedCertification: any = null;
  selectedProject: any = null;
  selectedHardSkill: any = null;
  selectedSoftSkill: any = null;
  selectedLanguage: any = null;
  selectedInterest: any = null;

  // 1) CONTACT
  openModifyContactModal(item: any) {
    this.selectedContact = { ...item };
    (document.getElementById('modalContactModify') as HTMLDialogElement).showModal();
  }
  saveContact() {
    const idx = this.contactInfo.findIndex(c => c.email === this.selectedContact.email);
    if (idx !== -1) this.contactInfo[idx] = { ...this.selectedContact };
    (document.getElementById('modalContactModify') as HTMLDialogElement).close();
  }
  closeModifyContactModal() {
    const modal = document.getElementById('modalContactModify') as HTMLDialogElement;
    modal.close();
  }

  // 2) SUMMARY
  openModifySummaryModal(item: any) {
    this.selectedSummary = { ...item };
    (document.getElementById('modalSummaryModify') as HTMLDialogElement).showModal();
  }
  saveSummary() {
    const idx = this.summary.findIndex(s => s.summary === this.selectedSummary.summary);
    if (idx !== -1) this.summary[idx] = { ...this.selectedSummary };
    (document.getElementById('modalSummaryModify') as HTMLDialogElement).close();
  }
  closeModifySummaryModal() {
    const modal = document.getElementById('modalSummaryModify') as HTMLDialogElement;
    modal.close();
  }

  // 3) EDUCATION
  openModifyEducationModal(item: any) {
    this.selectedEducation = { ...item };
    (document.getElementById('modalEducationModify') as HTMLDialogElement).showModal();
  }
  saveModifiedEducation() {
    const idx = this.educations.findIndex(e => e.id === this.selectedEducation.id);
    if (idx !== -1) this.educations[idx] = { ...this.selectedEducation };
    (document.getElementById('modalEducationModify') as HTMLDialogElement).close();
  }

  closeEducationModal() {
  const modal = document.getElementById('modalEducation') as HTMLDialogElement;
  modal.close();
}

  closeModifyEducationModal() {
    const modal = document.getElementById('modalEducationModify') as HTMLDialogElement;
    modal.close();
  }

  // 4) EXPERIENCE
  openModifyExperienceModal(item: any) {
    this.selectedExperience = { ...item };
    (document.getElementById('modalExperienceModify') as HTMLDialogElement).showModal();
  }
  saveModifiedExperience() {
    const idx = this.experiences.findIndex(e => e.id === this.selectedExperience.id);
    if (idx !== -1) this.experiences[idx] = { ...this.selectedExperience };
    (document.getElementById('modalExperienceModify') as HTMLDialogElement).close();
  }
  closeModifyExperienceModal() {
    const modal = document.getElementById('modalExperienceModify') as HTMLDialogElement;
    modal.close();
  }
  closeExperienceModal() {
    const modal = document.getElementById('modalExperience') as HTMLDialogElement;
    modal.close();
  }

  // 5) CERTIFICATIONS
  openModifyCertificationModal(item: any) {
    this.selectedCertification = { ...item };
    (document.getElementById('modalCertificationModify') as HTMLDialogElement).showModal();
  }
  saveModifiedCertification() {
    const idx = this.certifications.findIndex(c => c.id === this.selectedCertification.id);
    if (idx !== -1) this.certifications[idx] = { ...this.selectedCertification };
    (document.getElementById('modalCertificationModify') as HTMLDialogElement).close();
  }
  closeModifyCertificationModal() {
    const modal = document.getElementById('modalCertificationModify') as HTMLDialogElement;
    modal.close();
  }
  closeCertificationModal() {
    const modal = document.getElementById('modalCertification') as HTMLDialogElement;
    modal.close();
  }

  // 6) PROJECTS
  openModifyProjectModal(item: any) {
    this.selectedProject = { ...item };
    (document.getElementById('modalProjectModify') as HTMLDialogElement).showModal();
  }
  saveModifiedProject() {
    const idx = this.projects.findIndex(p => p.id === this.selectedProject.id);
    if (idx !== -1) this.projects[idx] = { ...this.selectedProject };
    (document.getElementById('modalProjectModify') as HTMLDialogElement).close();
  }
  closeModifyProjectModal() {
    const modal = document.getElementById('modalProjectModify') as HTMLDialogElement;
    modal.close();
  }
  closeProjectModal() {
    const modal = document.getElementById('modalProject') as HTMLDialogElement;
    modal.close();
  }

  // 7) HARD SKILLS
  openModifyHardSkillModal(item: any) {
    this.selectedHardSkill = { ...item };
    (document.getElementById('modalHardSkillModify') as HTMLDialogElement).showModal();
  }
  saveModifiedHardSkill() {
    const idx = this.hardSkills.findIndex(s => s.id === this.selectedHardSkill.id);
    if (idx !== -1) this.hardSkills[idx] = { ...this.selectedHardSkill };
    (document.getElementById('modalHardSkillModify') as HTMLDialogElement).close();
  }
  closeModifyHardSkillModal() {
    const modal = document.getElementById('modalHardSkillModify') as HTMLDialogElement;
    modal.close();
  }
  closeHardSkillModal() {
    const modal = document.getElementById('modalHardSkill') as HTMLDialogElement;
    modal.close();
  }

  // 8) SOFT SKILLS
  openModifySoftSkillModal(item: any) {
    this.selectedSoftSkill = { ...item };
    (document.getElementById('modalSoftSkillModify') as HTMLDialogElement).showModal();
  }
  saveModifiedSoftSkill() {
    const idx = this.softSkills.findIndex(s => s.id === this.selectedSoftSkill.id);
    if (idx !== -1) this.softSkills[idx] = { ...this.selectedSoftSkill };
    (document.getElementById('modalSoftSkillModify') as HTMLDialogElement).close();
  }
  closeModifySoftSkillModal() {
    const modal = document.getElementById('modalSoftSkillModify') as HTMLDialogElement;
    modal.close();
  }
  closeSoftSkillModal() {
    const modal = document.getElementById('modalSoftSkill') as HTMLDialogElement;
    modal.close();
  }

  // 9) LANGUAGES
  openModifyLanguageModal(item: any) {
    this.selectedLanguage = { ...item };
    (document.getElementById('modalLanguageModify') as HTMLDialogElement).showModal();
  }
  saveModifiedLanguage() {
    const idx = this.languages.findIndex(l => l.id === this.selectedLanguage.id);
    if (idx !== -1) this.languages[idx] = { ...this.selectedLanguage };
    (document.getElementById('modalLanguageModify') as HTMLDialogElement).close();
  }
  closeModifyLanguageModal() {
    const modal = document.getElementById('modalLanguageModify') as HTMLDialogElement;
    modal.close();
  }
  closeLanguageModal() {
    const modal = document.getElementById('modalLanguage') as HTMLDialogElement;
    modal.close();
  }

  // 10) INTERESTS
  openModifyInterestModal(item: any) {
    this.selectedInterest = { ...item };
    (document.getElementById('modalInterestModify') as HTMLDialogElement).showModal();
  }
  saveModifiedInterest() {
    const idx = this.interests.findIndex(i => i.id === this.selectedInterest.id);
    if (idx !== -1) this.interests[idx] = { ...this.selectedInterest };
    (document.getElementById('modalInterestModify') as HTMLDialogElement).close();
  }
  closeModifyInterestModal() {
    const modal = document.getElementById('modalInterestModify') as HTMLDialogElement;
    modal.close();
  }
  closeInterestModal() {
    const modal = document.getElementById('modalInterest') as HTMLDialogElement;
    modal.close();
  }


  // Helper to close dialogs
private closeDialog(id: string) {
  const dlg = document.getElementById(id) as HTMLDialogElement;
  dlg?.close();
}

// 1) Education
saveEducation(): void {
  const id = 'modalEducation';
  const dlg = document.getElementById(id) as HTMLDialogElement;

  const degree      = dlg.querySelector<HTMLInputElement>('input[name="degree"]')!.value;
  const school      = dlg.querySelector<HTMLInputElement>('input[name="school"]')!.value;
  const startDate   = dlg.querySelector<HTMLInputElement>('input[name="startDate"]')!.value;
  const endDate     = dlg.querySelector<HTMLInputElement>('input[name="endDate"]')!.value;
  const location    = dlg.querySelector<HTMLInputElement>('input[name="location"]')!.value;
  const description = dlg.querySelector<HTMLTextAreaElement>('textarea[name="description"]')!.value;
  const logoFile    = dlg.querySelector<HTMLInputElement>('input[type="file"]')!.files?.[0]?.name || '';

  const payload = { degree, school, startDate, endDate, location, description, logo: logoFile, email: this.email };

  fetch('http://localhost:8080/api/education/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(() => this.fetchProfile(this.email))
    .catch(err => console.error('Education add error:', err))
    .finally(() => this.closeDialog(id));
}

// 2) Experience
saveExperience(): void {
  const id = 'modalExperience';
  const dlg = document.getElementById(id) as HTMLDialogElement;

  const jobTitle    = dlg.querySelector<HTMLInputElement>('input[name="jobTitle"]')!.value;
  const company     = dlg.querySelector<HTMLInputElement>('input[name="company"]')!.value;
  const startDate   = dlg.querySelector<HTMLInputElement>('input[name="startDate"]')!.value;
  const endDate     = dlg.querySelector<HTMLInputElement>('input[name="endDate"]')!.value;
  const location    = dlg.querySelector<HTMLInputElement>('input[name="location"]')!.value;
  const description = dlg.querySelector<HTMLTextAreaElement>('textarea[name="description"]')!.value;
  const logoFile    = dlg.querySelector<HTMLInputElement>('input[type="file"]')!.files?.[0]?.name || '';

  const payload = { jobTitle, company, startDate, endDate, location, description, logo: logoFile, senderEmail: this.email };

  fetch('http://localhost:8080/api/experience/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(() => this.fetchProfile(this.email))
    .catch(err => console.error('Experience add error:', err))
    .finally(() => this.closeDialog(id));
}

// 3) Certification
saveCertification(): void {
  const id = 'modalCertification';
  const dlg = document.getElementById(id) as HTMLDialogElement;

  const certificationName = dlg.querySelector<HTMLInputElement>('input[name="certificationName"]')!.value;
  const institution       = dlg.querySelector<HTMLInputElement>('input[name="institution"]')!.value;
  const dateObtained      = dlg.querySelector<HTMLInputElement>('input[name="dateObtained"]')!.value;
  const expirationDate    = dlg.querySelector<HTMLInputElement>('input[name="expirationDate"]')!.value;

  const payload = { certificationName, institution, dateObtained, expirationDate, email: this.email };

  fetch('http://localhost:8080/api/certification/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(() => this.fetchProfile(this.email))
    .catch(err => console.error('Certification add error:', err))
    .finally(() => this.closeDialog(id));
}

// 4) Project
saveProject(): void {
  const id = 'modalProject';
  const dlg = document.getElementById(id) as HTMLDialogElement;

  const title       = dlg.querySelector<HTMLInputElement>('input[name="projectTitle"]')!.value;
  const description = dlg.querySelector<HTMLTextAreaElement>('textarea[name="description"]')!.value;
  const projectLink = dlg.querySelector<HTMLInputElement>('input[name="projectLink"]')!.value;
  const logoFile    = dlg.querySelector<HTMLInputElement>('input[type="file"]')!.files?.[0]?.name || '';
  const startDate   = dlg.querySelector<HTMLInputElement>('input[name="startDate"]')!.value;
  const endDate     = dlg.querySelector<HTMLInputElement>('input[name="endDate"]')!.value;

  const payload = { title, description, link: projectLink, logo: logoFile, startDate, endDate, email: this.email };

  fetch('http://localhost:8080/api/project/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(() => this.fetchProfile(this.email))
    .catch(err => console.error('Project add error:', err))
    .finally(() => this.closeDialog(id));
}

// 5) Hard Skill
saveHardSkill(): void {
  const id = 'modalHardSkill';
  const dlg = document.getElementById(id) as HTMLDialogElement;

  const hardSkillName  = dlg.querySelector<HTMLInputElement>('input[name="skillName"]')!.value;
  const level = +dlg.querySelector<HTMLInputElement>('input[name="skillLevel"]')!.value;

  const payload = { hardSkillName, level, email: this.email };

  fetch('http://localhost:8080/api/hard-skills/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(() => this.fetchProfile(this.email))
    .catch(err => console.error('Hard skill add error:', err))
    .finally(() => this.closeDialog(id));
}

// 6) Soft Skill
saveSoftSkill(): void {
  const id = 'modalSoftSkill';
  const dlg = document.getElementById(id) as HTMLDialogElement;

  const name  = dlg.querySelector<HTMLInputElement>('input[name="skillName"]')!.value;
  const level = +dlg.querySelector<HTMLInputElement>('input[name="skillLevel"]')!.value;

  const payload = { name, level, email: this.email };

  fetch('http://localhost:8080/api/soft-skills/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(() => this.fetchProfile(this.email))
    .catch(err => console.error('Soft skill add error:', err))
    .finally(() => this.closeDialog(id));
}

// 7) Language
saveLanguage(): void {
  const id = 'modalLanguage';
  const dlg = document.getElementById(id) as HTMLDialogElement;

  const name  = dlg.querySelector<HTMLInputElement>('input[name="languageName"]')!.value;
  const level = +dlg.querySelector<HTMLInputElement>('input[name="languageLevel"]')!.value;

  const payload = { name, level, email: this.email };

  fetch('http://localhost:8080/api/language/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(() => this.fetchProfile(this.email))
    .catch(err => console.error('Language add error:', err))
    .finally(() => this.closeDialog(id));
}

// 8) Interest
saveInterest(): void {
  const id = 'modalInterest';
  const dlg = document.getElementById(id) as HTMLDialogElement;

  const interest = dlg.querySelector<HTMLInputElement>('input[name="interestName"]')!.value;

  const payload = { interest, email: this.email };

  fetch('http://localhost:8080/api/interest/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(() => this.fetchProfile(this.email))
    .catch(err => console.error('Interest add error:', err))
    .finally(() => this.closeDialog(id));
}

}
