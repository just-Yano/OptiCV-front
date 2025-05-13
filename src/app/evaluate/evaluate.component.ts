import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ScoreCV } from '../../interface/score-cv';
import { ScoreSectionComponent } from '../score-section/score-section.component';

@Component({
  selector: 'app-evaluate',
  imports: [HeaderComponent, ScoreSectionComponent],
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.css'
})
export class EvaluateComponent {
  public score : ScoreCV | null = null; 

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
    });
}

}
