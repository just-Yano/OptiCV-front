import { CV } from './cv';
import { Education } from './education';
import { Experience } from './experience';
import { HardSkill } from './hard-skill';
import { SoftSkill } from './soft-skill';
import { Project } from './project';
import { ContactInfo } from './contact-info';
import { Language } from './language';
import { Certification } from './certification';
import { Interest } from './interest';

export interface User {
  username: string;
  email: string;
  cvs: CV[];
  educations: Education[];
  experiences: Experience[];
  hardSkills: HardSkill[];
  softSkills: SoftSkill[];
  projects: Project[];
  contactInfo: ContactInfo;
  summary: string;
  languages: Language[];
  certifications: Certification[];
  interest: Interest[];
}
