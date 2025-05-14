import { Education } from './education';
import { Experience } from './experience';
import { Certification } from './certification';
import { HardSkill } from './hard-skill';
import { SoftSkill } from './soft-skill';
import { Language } from './language';
import { Project } from './project';
import { Interest } from './interest';
import { ContactInfo } from './contact-info';
import { Summary } from './summary';


export interface GetProfilResponse {
    educations: Education[];
    experiences: Experience[];
    certifications: Certification[];
    hardSkills: HardSkill[];
    softSkills: SoftSkill[];
    languages: Language[];
    projects: Project[];
    interests: Interest[];
    summary: Summary;
    contactInfo: ContactInfo;
}
