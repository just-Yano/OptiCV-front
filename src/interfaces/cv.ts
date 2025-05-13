// import interfaces for CV
import { Education } from './education';
import { Experience } from './experience';
import { Certification } from './certification';
import { HardSkill } from './hard-skill';
import { SoftSkill } from './soft-skill';
import { Language } from './language';
import { Project } from './project';
import { Interest } from './interest';
import { ContactInfo } from './contact-info';


export interface CV {
    id: number;
    education: Education[];
    experience: Experience[];
    certifications: Certification[];
    hardSkills: HardSkill[];
    softSkills: SoftSkill[];
    languages: Language[];
    projects: Project[];
    interests: Interest[];
    summary: string;
    contactInfo: ContactInfo;
}
