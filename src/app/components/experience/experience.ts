import { Component } from '@angular/core';
import { ExperienceService } from './experience.service';
import { ExperienceInterface } from './experience.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  experiences$: Observable<ExperienceInterface[]>
  constructor(private experienceService: ExperienceService){
    this.experiences$ = this.experienceService.get_experiences()
    this.experiences$.subscribe({
      next: (exp =>{
        console.log(exp)
      })
    })
  }
  formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // los meses son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
