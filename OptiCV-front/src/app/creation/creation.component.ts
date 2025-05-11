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

}
