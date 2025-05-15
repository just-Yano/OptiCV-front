import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ScoreCV } from '../../interfaces/score-cv';
import { ScoreSectionComponent } from '../score-section/score-section.component';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingModalComponent } from '../shared/loading-modal/loading-modal.component';

@Component({
  selector: 'app-evaluate',
  standalone: true,
  imports: [HeaderComponent, ScoreSectionComponent, CommonModule, LoadingModalComponent],
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.css'
})
export class EvaluateComponent {
  public score: ScoreCV | null = null;
  public isLoggedIn: boolean = false;
  public loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    if (!this.isLoggedIn) {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    }
  }

  evaluateCV(fileInput: HTMLInputElement) {
    const file = fileInput.files?.[0];

    if (!file) {
      console.warn('No file selected');
      return;
    }

    if (file.type !== 'application/pdf') {
      console.warn('Please upload a PDF file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      console.warn('File exceeds 2MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.loading = true;
    this.score = null;

    fetch('http://localhost:8080/api/cv-score/evaluate-pdf', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to evaluate CV');
        }
        return response.json();
      })
      .then((data: ScoreCV) => {
        this.score = data;
      })
      .catch(error => {
        console.error('Error evaluating CV:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
