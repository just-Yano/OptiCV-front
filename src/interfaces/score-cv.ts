export interface ScoreCV {
  id: number;
  createdAt: string; 
  atsScore: number;
  spellingGrammarScore: number;
  repetitionScore: number;
  quantifiedImpactScore: number;
  conciseBulletPointsScore: number;
  sectionCompletenessScore: number;
  contactInfoScore: number;
  professionalEmailScore: number;
  activeVoiceScore: number;
  buzzwordsScore: number;
  personalityScore: number;
  designScore: number;
  atsComment: string;
  spellingGrammarComment: string;
  repetitionComment: string;
  quantifiedImpactComment: string;
  conciseBulletPointsComment: string;
  sectionCompletenessComment: string;
  contactInfoComment: string;
  professionalEmailComment: string;
  activeVoiceComment: string;
  buzzwordsComment: string;
  personalityComment: string;
  designComment: string;
  cv: string | null;

[key: string]: any;

}
