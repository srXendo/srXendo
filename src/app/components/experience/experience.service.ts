import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExperienceInterface } from './experience.interface';
import { getExperienceMockup } from './experience.mockup';
@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  get_experiences(): Observable<ExperienceInterface[]>{
    return of(getExperienceMockup())
  }
}
