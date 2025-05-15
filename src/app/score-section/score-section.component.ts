import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../services/navigation/navigation.service';
@Component({
  selector: 'app-score-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-section.component.html'
})
export class ScoreSectionComponent implements OnChanges {
  @Input() score: any;
  constructor(private navigationService: NavigationService) {}
  public scoreFields = [
    {
      label: 'ATS Score',
      scoreKey: 'atsScore',
      commentKey: 'atsComment',
      tooltip: 'Measures if your resume is readable by ATS (Applicant Tracking Systems).'
    },
    {
      label: 'Spelling & Grammar Score',
      scoreKey: 'spellingGrammarScore',
      commentKey: 'spellingGrammarComment',
      tooltip: 'Checks for spelling and grammar issues.'
    },
    {
      label: 'Repetition Score',
      scoreKey: 'repetitionScore',
      commentKey: 'repetitionComment',
      tooltip: 'Detects repeated words or phrases across your content.'
    },
    {
      label: 'Quantified Impact Score',
      scoreKey: 'quantifiedImpactScore',
      commentKey: 'quantifiedImpactComment',
      tooltip: 'Evaluates how well you use numbers to show impact.'
    },
    {
      label: 'Concise Bullet Points Score',
      scoreKey: 'conciseBulletPointsScore',
      commentKey: 'conciseBulletPointsComment',
      tooltip: 'Analyzes clarity and brevity of your bullet points.'
    },
    {
      label: 'Section Completeness Score',
      scoreKey: 'sectionCompletenessScore',
      commentKey: 'sectionCompletenessComment',
      tooltip: 'Checks if all key resume sections are present.'
    },
    {
      label: 'Contact Info Score',
      scoreKey: 'contactInfoScore',
      commentKey: 'contactInfoComment',
      tooltip: 'Verifies whether essential contact details are included.'
    },
    {
      label: 'Professional Email Score',
      scoreKey: 'professionalEmailScore',
      commentKey: 'professionalEmailComment',
      tooltip: 'Checks if your email address looks professional.'
    },
    {
      label: 'Active Voice Score',
      scoreKey: 'activeVoiceScore',
      commentKey: 'activeVoiceComment',
      tooltip: 'Analyzes use of active verbs instead of passive constructions.'
    },
    {
      label: 'Buzzwords Score',
      scoreKey: 'buzzwordsScore',
      commentKey: 'buzzwordsComment',
      tooltip: 'Checks for strong, relevant technical keywords.'
    },
    {
      label: 'Personality Score',
      scoreKey: 'personalityScore',
      commentKey: 'personalityComment',
      tooltip: 'Measures how well your CV reflects personality and initiative.'
    },
    {
      label: 'Design Score',
      scoreKey: 'designScore',
      commentKey: 'designComment',
      tooltip: 'Evaluates visual clarity, spacing, and formatting.'
    }
  ];
  finalScore: number = 0;

  ngOnChanges(): void {
    console.log('ScoreFields:', this.scoreFields);
    console.log('Score from parent:', this.score);
    if (this.score) {
      const total = this.scoreFields
        .map(field => this.score[field.scoreKey])
        .reduce((sum, value) => sum + value, 0);
      this.finalScore = Math.round(total / this.scoreFields.length);
    }
  }

  getScoreColor(score: number): string {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-400 text-black';
    return 'bg-red-500';
  }
  goToCreation() {
    this.navigationService.navigateToCreation();
  }
  
  goToTailoring() {
    this.navigationService.navigateToTailoring();
  }
}
