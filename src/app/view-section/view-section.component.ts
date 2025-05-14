import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-section.component.html',
  styleUrl: './view-section.component.css'
})
export class ViewSectionComponent {

  // Sample data for the view section. TODO fetch from backend
  contact = [
    {
      name: 'John Doe',
      email: 'johndoe@insa-lyon.fr',
      phone: '+33 6 12 34 56 78',
      address: '123 Main St, Lyon, France',
      website: 'https://johndoe.com',
      linkedIn: 'https://www.linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      description: 'Software engineer with a passion for technology and data science.',
    }
  ];
  summary = [
    {
      summary: 'Experienced software engineer with a strong background in web development and data analysis. Proficient in JavaScript, Python, and SQL. Excellent problem-solving skills and a team player.'
    }
  ];
  experience = [
    {
      jobTitle: 'Software Engineer',
      company: 'Tech Company',
      startDate: '2020-01-01',
      endDate: '2021-01-01',
      location: 'New York, NY',
      description: 'Developed web applications using Angular and Node.js.',
      logo: 'https://example.com/logo.png',
      id: 1
    },
    {
      jobTitle: 'Data Analyst',
      company: 'Data Corp',
      startDate: '2019-01-01',
      endDate: '2020-01-01',
      location: 'San Francisco, CA',
      description: 'Analyzed data using Python and SQL.',
      logo: 'https://example.com/logo2.png',
      id: 2
    },
    {
      jobTitle: 'Intern',
      company: 'Startup Inc.',
      startDate: '2018-01-01',
      endDate: '2018-12-31',
      location: 'Los Angeles, CA',
      description: 'Assisted in software development and testing.',
      logo: 'https://example.com/logo3.png',
      id: 3
    },
    {
      jobTitle: 'Research Assistant',
      company: 'University Lab',
      startDate: '2017-01-01',
      endDate: '2017-12-31',
      location: 'Los Angeles, CA',
      description: 'Conducted research on machine learning algorithms.',
      logo: 'https://example.com/logo4.png',
      id: 4
    }
  ];
  education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Example',
      startDate: '2015-01-01',
      endDate: '2019-01-01',
      location: 'Los Angeles, CA',
      description: 'Studied computer science with a focus on software development.',
      logo: 'https://example.com/logo3.png',
      id: 1
    },  
    {
      degree: 'Master of Science in Data Science',
      institution: 'University of Example',
      startDate: '2019-01-01',
      endDate: '2021-01-01',
      location: 'Los Angeles, CA',
      description: 'Studied data science with a focus on machine learning.',
      logo: 'https://example.com/logo4.png',
      id: 2
    }
  ];
  certifications = [
    {
      certificationName: 'Certified Data Scientist',
      institution: 'Data Science Institute',
      dateObtained: '2021-01-01',
      expirationDate: '2023-01-01',
      id: 1
    },
    {
      certificationName: 'Certified Software Engineer',
      institution: 'Software Engineering Institute',
      dateObtained: '2020-01-01',
      expirationDate: '2022-01-01',
      id: 2
    },
  ];
  projects = [
    {
      title: 'Personal Portfolio Website',
      description: 'Developed a personal portfolio website using Angular and Bootstrap.',
      startDate: '2021-01-01',
      endDate: '2021-06-01',
      logo: 'https://example.com/logo5.png',
      link: 'https://example.com/portfolio',
      id: 1
    },
    {
      title: 'Data Analysis Project',
      description: 'Analyzed a dataset using Python and created visualizations.',
      startDate: '2020-01-01',
      endDate: '2020-06-01',
      logo: 'https://example.com/logo6.png',
      link: 'https://example.com/data-analysis',
      id: 2
    },
  ];
  hardSkills = [
    {
      name: 'JavaScript',
      logo: 'https://example.com/logo7.png',
      level: 5,
      id: 1
    },
    {
      name: 'Python',
      logo: 'https://example.com/logo8.png',
      level: 4,
      id: 2
    },
    {
      name: 'Java',
      logo: 'https://example.com/logo9.png',
      level: 3,
      id: 3
    },
    {
      name: 'C++',
      logo: 'https://example.com/logo10.png',
      level: 2,
      id: 4
    }
  ];
  softSkills = [
    {
      name: 'Communication',
      logo: 'https://example.com/logo11.png',
      level: 5,
      id: 1
    },
    {
      name: 'Teamwork',
      logo: 'https://example.com/logo12.png',
      level: 4,
      id: 2
    },
    {
      name: 'Problem Solving',
      logo: 'https://example.com/logo13.png',
      level: 3,
      id: 3
    },
    {
      name: 'Time Management',
      logo: 'https://example.com/logo14.png',
      level: 2,
      id: 4
    }
  ];
  languages = [
    {
      name: 'English',
      level: 5,
      id: 1
    },
    {
      name: 'Spanish',
      level: 4,
      id: 2
    },
    {
      name: 'French',
      level: 3,
      id: 3
    },
    {
      name: 'German',
      level: 2,
      id: 4
    }
  ];
  interests = [
    {
      id: 1,
      interest: 'Technology'
    },
    {
      id: 2,
      interest: 'Data Science'
    },
    {
      id: 3,
      interest: 'Software Development'
    },
    {
      id: 4,
      interest: 'Machine Learning'
    }
  ];

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
    const idx = this.contact.findIndex(c => c.email === this.selectedContact.email);
    if (idx !== -1) this.contact[idx] = { ...this.selectedContact };
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
    const idx = this.education.findIndex(e => e.id === this.selectedEducation.id);
    if (idx !== -1) this.education[idx] = { ...this.selectedEducation };
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
    const idx = this.experience.findIndex(e => e.id === this.selectedExperience.id);
    if (idx !== -1) this.experience[idx] = { ...this.selectedExperience };
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
  
}

