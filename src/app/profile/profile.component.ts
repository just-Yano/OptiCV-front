import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetProfilResponse } from '../../interfaces/GetProfilResponse';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public editorMode: boolean = false;
  public isLoggedIn: boolean = false;
  public errorMessage: string = '';
  public profile: GetProfilResponse  = {
    educations: [],
    experiences: [],
    certifications: [],
    hardSkills: [],
    softSkills: [],
    languages: [],
    projects: [],
    interests: [],
    summary: {
      summary: ''
    },
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
    }
  }; 
  
  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    if (!this.isLoggedIn) {
      setTimeout(() => {
      this.router.navigate(['/login']);}
      , 5000);
    }
    // TODO remove the parameter and use only the token
    fetch(`http://localhost:8080/api/user/getProfile?mail=${this.authService.getEmail()}`, { // TODO change the email to token
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (!response.ok) {
        return response.json().then(data => {
            throw new Error(data.responseMessage || 'Failed to fetch profile');
          });
        }
        return response.json(); // Read the body once for a successful response
      }).then((data : GetProfilResponse) => {
        // binding the data to the profile component HTML
        console.log(data);
        this.profile = data;
        this.profile.hardSkills = this.profile.hardSkills.sort((a, b) => a.level - b.level);
        this.profile.softSkills = this.profile.softSkills.sort((a, b) => a.level - b.level);
        this.profile.languages = this.profile.languages.sort((a, b) => a.level - b.level);
        console.log(this.profile);
      }).catch(error => {
        this.errorMessage = error.message || 'An error occurred while fetching the profile';
        // Handle the error as needed, e.g., show an error message to the user        
      });
  } 

getLanguageLevelName(level: number): string {
  if (level >= 5) return 'Native';
  if (level === 4) return 'Fluent';
  if (level === 3) return 'Advanced';
  if (level === 2) return 'Intermediate';
  if (level === 1) return 'Basic';
  return 'Unknown';
}

  
getSkillLevelLabel(level: number): string {
  if (level >= 4) return 'Expert';
  if (level === 3) return 'Advanced';
  if (level === 2) return 'Intermediate';
  if (level === 1) return 'Beginner';
  return 'Unknown';
}

getSkillLevelColor(level: number): string {
  if (level >= 4) return 'bg-green-600 text-white';
  if (level === 3) return 'bg-emerald-500 text-white';
  if (level === 2) return 'bg-yellow-400 text-white';
  if (level === 1) return 'bg-red-500 text-white';
  return 'bg-muted text-white';
}

getSkillLevelHexColor(level: number): string {
  if (level >= 4) return '#16A34A';  // green-600
  if (level === 3) return '#10B981';  // emerald-500
  if (level === 2) return '#FBBF24';  // yellow-400
  if (level === 1) return '#EF4444';  // red-500
  return '#9CA3AF';                   // muted / gray-400 fallback
}



getLanguageLevelColor(level: number): string {
  if (level >= 5) {
    return 'bg-purple-700';   // Native or higher
  } else if (level === 4) {
    return 'bg-blue-600';     // Fluent
  } else if (level === 3) {
    return 'bg-green-500';    // Advanced
  } else if (level === 2) {
    return 'bg-yellow-500';   // Intermediate
  } else if (level === 1) {
    return 'bg-red-500';      // Basic
  } else {
    return 'bg-gray-400';     // Unknown / fallback
  }
}


getLanguageLevelHexColor(level: number): string {
  if (level >= 5) return '#7C3AED';   // purple-700 (Native or higher)
  if (level === 4) return '#2563EB';  // blue-600 (Fluent)
  if (level === 3) return '#22C55E';  // green-500 (Advanced)
  if (level === 2) return '#F59E0B';  // yellow-500 (Intermediate)
  if (level === 1) return '#EF4444';  // red-500 (Basic)
  return '#9CA3AF';                   // gray-400 fallback (Unknown)
}

editProfile() {
  this.editorMode = !this.editorMode; 
}

saveChanges() {
  this.editProfile(); 
} 
cancelChanges() {
  this.editProfile();
}

// TODO implement the add, edit and delete methods for each section
editEducation(index: number) {}
deleteEducation(index: number) {}
addEducation() {}
}
