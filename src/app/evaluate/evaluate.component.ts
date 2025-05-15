import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCV } from '../../interfaces/score-cv';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ScoreSectionComponent } from '../score-section/score-section.component';
import { LoadingModalComponent } from '../shared/loading-modal/loading-modal.component';

@Component({
  selector: 'app-evaluate',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ScoreSectionComponent, LoadingModalComponent],
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent {
  public score: ScoreCV | null = null;
  public isLoggedIn: boolean = false;
  public loading: boolean = false;
  public selectedFile: File | null = null;
  public selectedFileName: string = '';
  public isDragging: boolean = false;

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

  onFileSelected(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' || file.size > 2 * 1024 * 1024) {
      alert('Veuillez sélectionner un fichier PDF valide de moins de 2 Mo.');
      this.selectedFile = null;
      this.selectedFileName = '';
      return;
    }

    this.selectedFile = file;
    this.selectedFileName = file.name;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files?.[0];

    if (!file || file.type !== 'application/pdf' || file.size > 2 * 1024 * 1024) {
      alert('Veuillez déposer un fichier PDF valide de moins de 2 Mo.');
      return;
    }

    this.selectedFile = file;
    this.selectedFileName = file.name;
  }

  evaluateCV() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.loading = true;
    this.score = null;

    fetch('http://localhost:8080/api/cv-score/evaluate-pdf', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error('Erreur lors de l’analyse du CV.');
        return response.json();
      })
      .then((data: ScoreCV) => {
        this.score = data;
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Impossible d’analyser le CV. Veuillez réessayer.');
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
