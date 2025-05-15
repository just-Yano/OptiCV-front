import { Component, Input } from '@angular/core';
import { CV } from '../../interfaces/cv';
import { Education } from '../../interfaces/education';
import { Experience } from '../../interfaces/experience';
import { Certification } from '../../interfaces/certification';
import { HardSkill } from '../../interfaces/hard-skill';
import { SoftSkill } from '../../interfaces/soft-skill';
import { Language } from '../../interfaces/language';
import { Project } from '../../interfaces/project';
import { Interest } from '../../interfaces/interest';
import { ContactInfo } from '../../interfaces/contact-info';

@Component({
  selector: 'app-add-section',
  imports: [],
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.css'
})
export class AddSectionComponent {
  @Input() cvTemplateId: number = -1;
  cv: CV = {
    education: [],
    experience: [],
    certifications: [],
    hardSkills: [],
    softSkills: [],
    languages: [],
    projects: [],
    interests: [],
    summary: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      github: '',
      website: '',
      photo: '',
      description: '',
      id: 0,	
    },
  id: 0,
  };

  /*
  // Called in each method to send the CV to the backend
  sendCvToBackend(cv: CV, cvTemplateId: number, userId: number) {
  fetch(`http://localhost:8080/api/cvtemplate/fillTemplateTemporary?userId=${userId}&cvTemplateId=${cvTemplateId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.cv),
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
    */

  sendCvToBackend(cv: CV, cvTemplateId: number, userId: number) {
    console.log("Preparing to send CV to backend...");
    console.log(cv);

    const requestBody = {
      templateId: cvTemplateId,
      userEmail: "daniel@opti.com",
      educations: cv.education,
      experiences: cv.experience,
      hardSkills: cv.hardSkills,
      softSkills: cv.softSkills,
      projects: cv.projects,
      contactInfo: cv.contactInfo,
      languages: cv.languages,
      certifications: cv.certifications,
      interests: cv.interests,
      summary: cv.summary,
    };

    fetch(`http://localhost:8080/api/cvtemplate/fillTemplateTemporary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
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

  addHardSkill() {
    // API CALL 1 - ADD SECTION
    const skillName = (document.getElementById('hardSkillName') as HTMLInputElement).value;
    const skillLevel = (document.getElementById('hardSkillLevel') as HTMLInputElement).value;

    const requestBody = {
      hardSkillName: skillName,
      level: skillLevel,
      email: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/hard-skills/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Skill added:', data);
    })
    .catch(error => {
        console.error('Error:', error);
      });

    // API CALL 2 - SEND CV
    const hs: HardSkill = {
      name: (document.getElementById('hardSkillName') as HTMLInputElement).value,
      level: parseInt((document.getElementById('hardSkillLevel') as HTMLInputElement).value),
      logo: null,
      id: null,
    };

    this.cv.hardSkills.push(hs);

    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId)

  }

  addContactInfo() {
    // API CALL 1 - ADD SECTION
    const name = (document.getElementById('contactName') as HTMLInputElement).value;
    const email = (document.getElementById('contactEmail') as HTMLInputElement).value;
    const phone = (document.getElementById('contactPhone') as HTMLInputElement).value;
    const address = (document.getElementById('contactAddress') as HTMLInputElement).value;
    const linkedIn = (document.getElementById('contactLinkedIn') as HTMLInputElement).value;
    const gitHub = (document.getElementById('contactGitHub') as HTMLInputElement).value;
    const website = (document.getElementById('contactWebsite') as HTMLInputElement).value;
    const description = (document.getElementById('contactDescription') as HTMLTextAreaElement).value;
    const requestBody = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      linkedIn: linkedIn,
      github: gitHub,
      website: website,
      description: description,
      senderEmail: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/contactInfo/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Contact info added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    const contactInfo: ContactInfo = {
      name: (document.getElementById('contactName') as HTMLInputElement).value,
      email: (document.getElementById('contactEmail') as HTMLInputElement).value,
      phone: (document.getElementById('contactPhone') as HTMLInputElement).value,
      address: (document.getElementById('contactAddress') as HTMLInputElement).value,
      linkedIn: (document.getElementById('contactLinkedIn') as HTMLInputElement).value,
      github: (document.getElementById('contactGitHub') as HTMLInputElement).value,
      website: (document.getElementById('contactWebsite') as HTMLInputElement).value,
      photo: (document.getElementById('contactPhoto') as HTMLInputElement).value,
      description: (document.getElementById('contactDescription') as HTMLTextAreaElement).value,
      id: 0,
    };

    this.cv.contactInfo = contactInfo;
    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

  addSummary() {
    const summary = (document.getElementById('summaryText') as HTMLTextAreaElement).value;

    const requestBody = {
      summary: summary,
      email: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/summary/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Summary added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    this.cv.summary = (document.getElementById('summaryText') as HTMLTextAreaElement).value;
    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

  addEducation() {
    const title = (document.getElementById('educationTitle') as HTMLInputElement).value;
    const school = (document.getElementById('educationSchool') as HTMLInputElement).value;
    const startDate = (document.getElementById('educationStartDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('educationEndDate') as HTMLInputElement).value;
    const description = (document.getElementById('educationDescription') as HTMLInputElement).value;
    const logo = (document.getElementById('educationLogo') as HTMLInputElement).value;
    const location = (document.getElementById('educationLocation') as HTMLInputElement).value;
    
    const requestBody = {
      degree: title,
      school: school,
      startDate: startDate,
      endDate: endDate,
      location: location,
      description: description,
      logo: logo,
      email: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/education/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Education added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    const education: Education = {
      degree: (document.getElementById('educationTitle') as HTMLInputElement).value,
      school: (document.getElementById('educationSchool') as HTMLInputElement).value,
      startDate: (document.getElementById('educationStartDate') as HTMLInputElement).value,
      endDate: (document.getElementById('educationEndDate') as HTMLInputElement).value,
      location: (document.getElementById('educationLocation') as HTMLInputElement).value,
      description: (document.getElementById('educationDescription') as HTMLInputElement).value,
      logo: (document.getElementById('educationLogo') as HTMLInputElement).value,
      id: 0,
    };

    this.cv.education.push(education);
    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

  addExperience() {
    const title = (document.getElementById('experienceTitle') as HTMLInputElement).value;
    const company = (document.getElementById('experienceCompany') as HTMLInputElement).value;
    const startDate = (document.getElementById('experienceStartDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('experienceEndDate') as HTMLInputElement).value;
    const location = (document.getElementById('experienceLocation') as HTMLInputElement).value;
    const description = (document.getElementById('experienceDescription') as HTMLTextAreaElement).value;

    const requestBody = {
      jobTitle: title,
      company: company,
      startDate: startDate,
      endDate: endDate,
      location: location,
      description: description,
      senderEmail: "daniel@opti.com",
      logo: null // Assuming logo is not provided in the UI
    };

    fetch('http://localhost:8080/api/experience/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Experience added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    const experience: Experience = {
      jobTitle: (document.getElementById('experienceTitle') as HTMLInputElement).value,
      company: (document.getElementById('experienceCompany') as HTMLInputElement).value,
      startDate: (document.getElementById('experienceStartDate') as HTMLInputElement).value,
      endDate: (document.getElementById('experienceEndDate') as HTMLInputElement).value,
      location: (document.getElementById('experienceLocation') as HTMLInputElement).value,
      description: (document.getElementById('experienceDescription') as HTMLTextAreaElement).value,
      logo: (document.getElementById('experienceLogo') as HTMLInputElement).value,
      id: 0,
    };

    this.cv.experience.push(experience);
    const userId = 0;

    console.log("Chouf chou 3am jarrib a3mil la hayda l projet")

    console.log(this.cv.experience);

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

  addCertification() {
    const name = (document.getElementById('certificationName') as HTMLInputElement).value;
    const institution = (document.getElementById('certificationInstitution') as HTMLInputElement).value;
    const dateObtained = (document.getElementById('certificationDateObtained') as HTMLInputElement).value;
    const expirationDate = (document.getElementById('certificationExpirationDate') as HTMLInputElement).value;

    const requestBody = {
      name: name,
      institution: institution,
      dateObtained: dateObtained,
      expirationDate: expirationDate,
      email: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/certification/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Certification added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    const certification: Certification = {
      certificationName: (document.getElementById('certificationName') as HTMLInputElement).value,
      institution: (document.getElementById('certificationInstitution') as HTMLInputElement).value,
      dateObtained: (document.getElementById('certificationDateObtained') as HTMLInputElement).value,
      expirationDate: (document.getElementById('certificationExpirationDate') as HTMLInputElement).value,
      id: 0,
    };
    this.cv.certifications.push(certification);
    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

  addProject() {
    const title = (document.getElementById('projectTitle') as HTMLInputElement).value;
    const description = (document.getElementById('projectDescription') as HTMLTextAreaElement).value;
    const link = (document.getElementById('projectLink') as HTMLInputElement).value;
    const startDate = (document.getElementById('projectStartDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('projectEndDate') as HTMLInputElement).value;

    const requestBody = {
      title: title,
      description: description,
      link: link,
      startDate: startDate,
      endDate: endDate,
      email: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/project/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Project added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    const project: Project = {
      title: (document.getElementById('projectTitle') as HTMLInputElement).value,
      description: (document.getElementById('projectDescription') as HTMLTextAreaElement).value,
      link: (document.getElementById('projectLink') as HTMLInputElement).value,
      startDate: (document.getElementById('projectStartDate') as HTMLInputElement).value,
      endDate: (document.getElementById('projectEndDate') as HTMLInputElement).value,
      logo: null,
      id: 0,
    };
    this.cv.projects.push(project);
    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

  addSoftSkill() {
    const skillName = (document.getElementById('softSkillName') as HTMLInputElement).value;
    const skillLevel = (document.getElementById('softSkillLevel') as HTMLInputElement).value;

    const requestBody = {
      name: skillName,
      level: skillLevel,
      email: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/soft-skills/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Soft skill added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    const softSkill: SoftSkill = {
      name: (document.getElementById('softSkillName') as HTMLInputElement).value,
      level: parseInt((document.getElementById('softSkillLevel') as HTMLInputElement).value),
      id: 0,
      logo: null,
    };
    this.cv.softSkills.push(softSkill);
    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

  addLanguage() {
    const languageName = (document.getElementById('languageName') as HTMLInputElement).value;
    const languageLevel = (document.getElementById('languageLevel') as HTMLInputElement).value;

    const requestBody = {
      name: languageName,
      level: languageLevel,
      email: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/language/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Language added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    const language: Language = {
      name: (document.getElementById('languageName') as HTMLInputElement).value,
      level: parseInt((document.getElementById('languageLevel') as HTMLInputElement).value),
      id: null,
    };
    this.cv.languages.push(language);
    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

  addInterest() {
    const interestName = (document.getElementById('interestName') as HTMLInputElement).value;

    const requestBody = {
      interest: interestName,
      email: "daniel@opti.com"
    };

    fetch('http://localhost:8080/api/interest/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Interest added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // API CALL 2 - SEND CV
    const interest: Interest = {
      interest: (document.getElementById('interestName') as HTMLInputElement).value,
      id: 0,
    };
    this.cv.interests.push(interest);
    const userId = 0;

    this.sendCvToBackend(this.cv, this.cvTemplateId, userId);
  }

}