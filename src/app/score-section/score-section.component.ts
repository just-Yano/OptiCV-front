import { Component, Input } from '@angular/core';
import { ScoreCV } from '../../interfaces/score-cv';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-section',
  imports: [CommonModule],
  templateUrl: './score-section.component.html',
  styleUrl: './score-section.component.css'
})
export class ScoreSectionComponent {
  @Input() score : ScoreCV | null = null; 

  public scoreFields = [
    { label: 'ATS Score', scoreKey: 'atsScore', commentKey: 'atsComment' },
    { label: 'Spelling & Grammar Score', scoreKey: 'spellingGrammarScore', commentKey: 'spellingGrammarComment' },
    { label: 'Repetition Score', scoreKey: 'repetitionScore', commentKey: 'repetitionComment' },
    { label: 'Quantified Impact Score', scoreKey: 'quantifiedImpactScore', commentKey: 'quantifiedImpactComment' },
    { label: 'Concise Bullet Points Score', scoreKey: 'conciseBulletPointsScore', commentKey: 'conciseBulletPointsComment' },
    { label: 'Section Completeness Score', scoreKey: 'sectionCompletenessScore', commentKey: 'sectionCompletenessComment' },
    { label: 'Contact Info Score', scoreKey: 'contactInfoScore', commentKey: 'contactInfoComment' },
    { label: 'Professional Email Score', scoreKey: 'professionalEmailScore', commentKey: 'professionalEmailComment' },
    { label: 'Active Voice Score', scoreKey: 'activeVoiceScore', commentKey: 'activeVoiceComment' },
    { label: 'Buzzwords Score', scoreKey: 'buzzwordsScore', commentKey: 'buzzwordsComment' },
    { label: 'Personality Score', scoreKey: 'personalityScore', commentKey: 'personalityComment' },
    { label: 'Design Score', scoreKey: 'designScore', commentKey: 'designComment' }
  ]

}
