import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../services/navigation/navigation.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HeaderComponent, CommonModule, FooterComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  testimonials = [
    {
      name: 'Sophie Martin',
      role: 'Product Manager @ Capgemini',
      avatar: 'https://i.pravatar.cc/100?img=5',
      text: 'OptiCV helped me clearly identify what was missing in my resume. I had feedback in seconds.'
    },
    {
      name: 'James Liu',
      role: 'Full-Stack Developer @ Freelance',
      avatar: 'https://i.pravatar.cc/100?img=12',
      text: 'I used OptiCV to tailor my resume for Amazon, and it worked. Got my first tech interview in weeks.'
    },
    {
      name: 'Amira Bensalem',
      role: 'Data Analyst @ L’Oréal',
      avatar: 'https://i.pravatar.cc/100?img=32',
      text: 'I love how actionable the insights are. It’s like having a recruiter whispering in your ear.'
    },
    {
      name: 'David Lopez',
      role: 'UX Designer @ Freelance',
      avatar: 'https://i.pravatar.cc/100?img=3',
      text: 'Clean interface, fast feedback, and smart scoring. Can’t ask for more.'
    },
    {
      name: 'Olivia Chen',
      role: 'Marketing Specialist @ Publicis',
      avatar: 'https://i.pravatar.cc/100?img=11',
      text: 'I had no clue my CV was unreadable by ATS. OptiCV fixed that instantly.'
    },
    {
      name: 'Rami Haddad',
      role: 'Backend Engineer @ Orange',
      avatar: 'https://i.pravatar.cc/100?img=21',
      text: 'Even as a developer, writing a CV was hard. OptiCV made it feel like solving a ticket.'
    },
    {
      name: 'Léa Fournier',
      role: 'Consultant @ EY',
      avatar: 'https://i.pravatar.cc/100?img=9',
      text: 'The tailoring feature is gold. I matched 3 job offers in a few clicks.'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Cloud Architect @ AWS Partner',
      avatar: 'https://i.pravatar.cc/100?img=18',
      text: 'This tool is better than half the resume services I paid for.'
    },
    {
      name: 'Nina Schmidt',
      role: 'Graduate Student @ INSA Lyon',
      avatar: 'https://i.pravatar.cc/100?img=6',
      text: 'As a student, it gave me confidence and a direction. Also very fast!'
    },
    {
      name: 'Hassan El Amrani',
      role: 'Cybersecurity Analyst @ BNP Paribas',
      avatar: 'https://i.pravatar.cc/100?img=25',
      text: 'Very professional, very focused. Saved me hours.'
    },
    {
      name: 'Emma Dubois',
      role: 'Junior Project Manager @ EDF',
      avatar: 'https://i.pravatar.cc/100?img=29',
      text: 'It felt like someone had read my CV out loud and just said “fix this, this, and this.” Loved it.'
    },
    {
      name: 'Mickael Leroy',
      role: 'HR Intern @ Thales',
      avatar: 'https://i.pravatar.cc/100?img=30',
      text: 'We now recommend this tool to our own applicants. That says a lot.'
    }
  ];

  currentGroupIndex = 0;
  groupSize = 3;
  intervalId: any;

  get currentGroup() {
    const start = this.currentGroupIndex * this.groupSize;
    return this.testimonials.slice(start, start + this.groupSize);
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextGroup();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  nextGroup() {
    this.currentGroupIndex = (this.currentGroupIndex + 1) % Math.ceil(this.testimonials.length / this.groupSize);
  }

  prevGroup() {
    this.currentGroupIndex =
      (this.currentGroupIndex - 1 + Math.ceil(this.testimonials.length / this.groupSize)) %
      Math.ceil(this.testimonials.length / this.groupSize);
  }

  constructor(private navigationService: NavigationService) {}

  navigateToCreation() {
    this.navigationService.navigateToCreation();
  }

  navigateToTailoring() {
    this.navigationService.navigateToTailoring();
  }

  navigateToEvaluation() {
    this.navigationService.navigateToEvaluation();
  }
}
