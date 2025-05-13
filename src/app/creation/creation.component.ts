import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Template } from '../../interfaces/template';
import { TemplateSelectorComponent } from '../template-selector/template-selector.component';
import { AddSectionComponent } from '../add-section/add-section.component';

@Component({
  selector: 'app-creation',
  imports: [HeaderComponent, CommonModule, TemplateSelectorComponent, AddSectionComponent],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css'
})
export class CreationComponent {
  templateChosen: boolean = false;
  template: Template = { 
    id: -1,
    name: '',
    description: '',
    thumbnail: '',
    safeThumbnail: ''
  };  

  receiveTemplate(template: Template) {
    this.templateChosen = true;
    this.template = template;
  }

  generate() {

    const latexCode = `%-------------------------
    % Resume in Latex
    % Author : Jake Gutierrez
    % Based off of: https://github.com/sb2nov/resume
    % License : MIT
    %------------------------

    \\documentclass[letterpaper,11pt]{article}

    \\usepackage{latexsym}
    \\usepackage[empty]{fullpage}
    \\usepackage{titlesec}
    \\usepackage{marvosym}
    \\usepackage[usenames,dvipsnames]{color}
    \\usepackage{verbatim}
    \\usepackage{enumitem}
    \\usepackage[hidelinks]{hyperref}
    \\usepackage{fancyhdr}
    \\usepackage[english]{babel}
    \\usepackage{tabularx}
    \\usepackage{fontawesome5}
    \\usepackage{multicol}
    \\setlength{\\multicolsep}{-3.0pt}
    \\setlength{\\columnsep}{-1pt}
    \\input{glyphtounicode}

    %----------FONT OPTIONS----------
    % sans-serif
    % \\usepackage[sfdefault]{FiraSans}
    % \\usepackage[sfdefault]{roboto}
    % \\usepackage[sfdefault]{noto-sans}
    % \\usepackage[default]{sourcesanspro}

    % serif
    % \\usepackage{CormorantGaramond}
    % \\usepackage{charter}

    \\pagestyle{fancy}
    \\fancyhf{} % clear all header and footer fields
    \\fancyfoot{}
    \\renewcommand{\\headrulewidth}{0pt}
    \\renewcommand{\\footrulewidth}{0pt}

    % Adjust margins
    \\addtolength{\\oddsidemargin}{-0.6in}
    \\addtolength{\\evensidemargin}{-0.5in}
    \\addtolength{\\textwidth}{1.19in}
    \\addtolength{\\topmargin}{-.7in}
    \\addtolength{\\textheight}{1.4in}

    \\urlstyle{same}

    \\raggedbottom
    \\raggedright
    \\setlength{\\tabcolsep}{0in}

    % Sections formatting
    \\titleformat{\\section}{
      \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
    }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

    % Ensure that generate pdf is machine readable/ATS parsable
    \\pdfgentounicode=1

    %-------------------------
    % Custom commands
    \\newcommand{\\resumeItem}[1]{
      \\item\\small{
        {#1 \\vspace{-2pt}}
      }
    }

    \\newcommand{\\classesList}[4]{
        \\item\\small{
            {#1 #2 #3 #4 \\vspace{-2pt}}
      }
    }

    \\newcommand{\\resumeSubheading}[4]{
      \\vspace{-2pt}\\item
        \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
          \\textbf{#1} & \\textbf{\\small #2} \\\\
          \\textit{\\small#3} & \\textit{\\small #4} \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeSubSubheading}[2]{
        \\item
        \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
          \\textit{\\small#1} & \\textit{\\small #2} \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeProjectHeading}[2]{
        \\item
        \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
          \\small#1 & \\textbf{\\small #2}\\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

    \\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
    \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

    \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
    \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
    \\newcommand{\\resumeItemListStart}{\\begin{itemize}}
    \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

    %-------------------------------------------
    %%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

    \\begin{document}

    %----------HEADING----------
    % \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
    %   \\textbf{\\href{http://sourabhbajaj.com/}{\\Large Sourabh Bajaj}} & Email : \\href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\\\
    %   \\href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\\\
    % \\end{tabular*}
    {\\Huge \\scshape First Last}\\\\ \\vspace{1pt}
    \\section{ContactInfo}
    \\begin{center}
        Address \\\\ \\vspace{1pt}
        \\small \\raisebox{-0.1\\height}\\faPhone\\ Telephone ~ \\href{mailto:x@x.x}{\\raisebox{-0.2\\height}\\faEnvelope\\  \\underline{Email}} ~ 
        \\href{https://linkedin.com/in//}{\\raisebox{-0.2\\height}\\faLinkedin\\ \\underline{LinkedIn}}  ~
        \\href{https://github.com/}{\\raisebox{-0.2\\height}\\faGithub\\ \\underline{Github}}
        \\vspace{-8pt}
    \\end{center}

    %-----------EDUCATION-----------
    \\section{Education}
      \\resumeSubHeadingListStart
        \\resumeSubheading
          {Location}{Month Year -- Month Year}
          {Degree}{City, State}
      \\resumeSubHeadingListEnd

    %------RELEVANT COURSEWORK-------
    \\section{SoftSkills}
        %\\resumeSubHeadingListStart
            \\begin{multicols}{4}
                \\begin{itemize}[itemsep=-5pt, parsep=3pt]
                    \\item Soft Skill
                \\end{itemize}
            \\end{multicols}
            \\vspace*{2.0\\multicolsep}
        %\\resumeSubHeadingListEnd

    %-----------EXPERIENCE-----------
    \\section{Experience}
      \\resumeSubHeadingListStart

        \\resumeSubheading
          {Company}{Month Year -- Month Year}
          {JobTitle}{City, State}
          \\resumeItemListStart
            \\resumeItem{Description}
          \\resumeItemListEnd
        
      \\resumeSubHeadingListEnd
    \\vspace{-16pt}

    %-----------PROJECTS-----------
    \\section{Projects}
        \\vspace{-5pt}
        \\resumeSubHeadingListStart
              \\resumeProjectHeading
              {\\textbf{Title} \\emph{}}{Month Year}
              \\resumeItemListStart
                \\resumeItem{Description}
              \\resumeItemListEnd 
              
        \\resumeSubHeadingListEnd
    \\vspace{-15pt}

    %-----------PROGRAMMING SKILLS-----------
    \\section{HardSkills}
        %\\resumeSubHeadingListStart
            \\begin{multicols}{4}
                \\begin{itemize}[itemsep=-5pt, parsep=3pt]
                    \\item Hard Skill
                \\end{itemize}
            \\end{multicols}
            \\vspace*{2.0\\multicolsep}
        %\\resumeSubHeadingListEnd

    \\end{document}`
    ;
  // You can dynamically build this from user inputs if needed
  
  
    fetch('http://localhost:8080/api/cvtemplate/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: latexCode
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to download PDF');
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Resume_OptiCV.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error:', error));
}


}
