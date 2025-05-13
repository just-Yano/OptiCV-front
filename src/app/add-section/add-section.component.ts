import { Component } from '@angular/core';

@Component({
  selector: 'app-add-section',
  imports: [],
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.css'
})
export class AddSectionComponent {

  addHardSkill() {
    const skillName = (document.getElementById('hardSkillName') as HTMLInputElement).value;
    const skillLevel = (document.getElementById('hardSkillLevel') as HTMLInputElement).value;

    const params = new URLSearchParams({
      hardSkillName: skillName,
      level: skillLevel
    });

    fetch(`http://localhost:8080/api/hard-skills/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Skill added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addContactInfo() {
    const name = (document.getElementById('contactName') as HTMLInputElement).value;
    const email = (document.getElementById('contactEmail') as HTMLInputElement).value;
    const phone = (document.getElementById('contactPhone') as HTMLInputElement).value;
    const address = (document.getElementById('contactAddress') as HTMLInputElement).value;
    const linkedIn = (document.getElementById('contactLinkedIn') as HTMLInputElement).value;
    const gitHub = (document.getElementById('contactGitHub') as HTMLInputElement).value;
    const website = (document.getElementById('contactWebsite') as HTMLInputElement).value;
    const description = (document.getElementById('contactDescription') as HTMLTextAreaElement).value;

    const params = new URLSearchParams({
      name: name,
      email: email,
      phone: phone,
      address: address,
      linkedIn: linkedIn,
      github: gitHub,
      website: website,
      description: description
    });

    fetch(`http://localhost:8080/api/contactInfo/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Contact info added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addSummary() {
    const summary = (document.getElementById('summaryText') as HTMLTextAreaElement).value;

    const params = new URLSearchParams({
      summary: summary
    });

    fetch(`http://localhost:8080/api/summary/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Summary added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addEducation() {
    const title = (document.getElementById('educationTitle') as HTMLInputElement).value;
    const school = (document.getElementById('educationSchool') as HTMLInputElement).value;
    const startDate = (document.getElementById('educationStartDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('educationEndDate') as HTMLInputElement).value;
    const description = (document.getElementById('educationDescription') as HTMLInputElement).value;
    const logo = (document.getElementById('educationLogo') as HTMLInputElement).value;
    const location = (document.getElementById('educationLocation') as HTMLInputElement).value;
    
    const params = new URLSearchParams({
      degree: title,
      school: school,
      startDate: startDate,
      endDate: endDate,
      location: location,
      description: description,
      logo: logo
    });

    fetch(`http://localhost:8080/api/education/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Education added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addExperience() {
    const title = (document.getElementById('experienceTitle') as HTMLInputElement).value;
    const company = (document.getElementById('experienceCompany') as HTMLInputElement).value;
    const startDate = (document.getElementById('experienceStartDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('experienceEndDate') as HTMLInputElement).value;
    const location = (document.getElementById('experienceLocation') as HTMLInputElement).value;
    const description = (document.getElementById('experienceDescription') as HTMLTextAreaElement).value;

    const params = new URLSearchParams({
      jobTitle: title,
      company: company,
      startDate: startDate,
      endDate: endDate,
      location: location,
      description: description
    });

    fetch(`http://localhost:8080/api/experience/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Experience added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addCertification() {
    const name = (document.getElementById('certificationName') as HTMLInputElement).value;
    const institution = (document.getElementById('certificationInstitution') as HTMLInputElement).value;
    const dateObtained = (document.getElementById('certificationDateObtained') as HTMLInputElement).value;
    const expirationDate = (document.getElementById('certificationExpirationDate') as HTMLInputElement).value;

    const params = new URLSearchParams({
      name: name,
      institution: institution,
      dateObtained: dateObtained,
      expirationDate: expirationDate
    });

    fetch(`http://localhost:8080/api/certification/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Certification added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addProject() {
    const title = (document.getElementById('projectTitle') as HTMLInputElement).value;
    const description = (document.getElementById('projectDescription') as HTMLTextAreaElement).value;
    const link = (document.getElementById('projectLink') as HTMLInputElement).value;
    const startDate = (document.getElementById('projectStartDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('projectEndDate') as HTMLInputElement).value;

    const params = new URLSearchParams({
      title: title,
      description: description,
      link: link,
      startDate: startDate,
      endDate: endDate
    });

    fetch(`http://localhost:8080/api/project/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Project added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addSoftSkill() {
    const skillName = (document.getElementById('softSkillName') as HTMLInputElement).value;
    const skillLevel = (document.getElementById('softSkillLevel') as HTMLInputElement).value;

    const params = new URLSearchParams({
      name: skillName,
      level: skillLevel
    });

    fetch(`http://localhost:8080/api/soft-skills/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Soft skill added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addLanguage() {
    const languageName = (document.getElementById('languageName') as HTMLInputElement).value;
    const languageLevel = (document.getElementById('languageLevel') as HTMLInputElement).value;

    const params = new URLSearchParams({
      name: languageName,
      level: languageLevel
    });

    fetch(`http://localhost:8080/api/language/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Language added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  addInterest() {
    const interestName = (document.getElementById('interestName') as HTMLInputElement).value;

    const params = new URLSearchParams({
      interest: interestName
    });

    fetch(`http://localhost:8080/api/interest/add?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Interest added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}