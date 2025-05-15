import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  standalone: true,
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent {
  @Input() message: string = 'Chargement en cours...';
}
