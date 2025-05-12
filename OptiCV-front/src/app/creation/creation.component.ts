import { Component } from '@angular/core';

@Component({
  selector: 'app-creation',
  imports: [],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css'
})
export class CreationComponent {
  addSkill() {
    // http request on backend 8080 do a post take the values of the inputs

    // Assuming you have input fields bound to component properties, e.g., skillName and skillLevel
    const skillName = (document.querySelector('input[placeholder="hard skill"]') as HTMLInputElement)?.value || '';
    const skillLevel = (document.querySelector('input[placeholder="level"]') as HTMLInputElement)?.value || '';
    const params = new URLSearchParams({
      hardSkillName: skillName,
      level: skillLevel
    });

    fetch(`http://localhost:8080/api/hard-skills?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Skill added:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }

  generate() {
    const latexCode = `\\documentclass{article}
  \\begin{document}
  Hello from LaTeX!
  \\end{document}`;  // You can dynamically build this from user inputs if needed
  
  
    const params = new URLSearchParams({
      latexCode
    });
  
    fetch(`http://localhost:8080/api/cvtemplate/download?${params.toString()}`, {
      method: 'POST'
    })
    .then(response => {
      if (!response.ok) throw new Error("PDF generation failed");
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
    .catch(error => {
      console.error("Error generating PDF:", error);
    });
  }
  

}
