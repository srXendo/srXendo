import { Component } from '@angular/core';
import { ExperienceService } from './experience.service';
import { ExperienceInterface } from './experience.interface';
import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  experiences$: Observable<ExperienceInterface[]>
  flag_order: boolean = true
  constructor(private experienceService: ExperienceService){
    this.experiences$ = this.experienceService.get_experiences()
  }
  formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // los meses son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  import_experience(){
    const input:string | null  = prompt('pega un json')
    if(!input|| input == ''){
      throw new Error('input de configuracion esta vacia') 
    }
    try{
      this.experiences$ = of(JSON.parse(input))
    }catch(err: any){
      console.error(new Error(err))
    }
  }
  export_experience(){
    const sub = this.experiences$.subscribe({
      next: (arr)=>{

          const blob = new Blob([JSON.stringify(arr)], { type: 'application/json' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = 'configuracion.json';
          link.click();

          window.URL.revokeObjectURL(url);
        sub.unsubscribe()
      },
      error: (err)=>{
        
      }
    })
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const res = JSON.parse(reader.result as string).map((row: ExperienceInterface)=>{
          row.start_date_experience = new Date(row.start_date_experience)
          row.end_date_experience = new Date(row.end_date_experience)
          return row

        })
        this.experiences$ = of(res);
      } catch (error) {
       console.error(new Error('Error al leer el JSON: ' + (error as Error).message)) 
      }
    };

    reader.readAsText(file);
  }
  order(){
    if(this.flag_order){
      this.experiences$ = this.experiences$.pipe(
        map(rows => [...rows].sort((a, b) => b.start_date_experience.getTime() - a.start_date_experience.getTime()))
      );
    }else{
      this.experiences$ = this.experiences$.pipe(
        map(rows => [...rows].sort((a, b) => a.start_date_experience.getTime() - b.start_date_experience.getTime()))
      );      
    }
    this.flag_order = !this.flag_order

  }
}
