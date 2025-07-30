import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ExperienceInterface } from '../experience/experience.interface';
import { ExperienceService } from '../experience/experience.service';
import { CommonModule } from '@angular/common';
import { IntroductionInterface } from '../introduction/introduction.interface';
import { prototype } from 'events';
import { HobbyInterface } from '../hobby/hobby.interface';
import { ContactInterface } from '../contact/contact.interface';

@Component({
  selector: 'app-tools-box',
  imports: [CommonModule],
  templateUrl: './tools-box.html',
  styleUrl: './tools-box.css'
})
export class ToolsBox {
  @Input() enable_order:Boolean = false
  @Input() arr_elements: ExperienceInterface[] | IntroductionInterface | HobbyInterface | ContactInterface | null = null;
  @Input() name_download: string = 'default'
  @Output('arrChange') changed = new EventEmitter<ExperienceInterface[] |IntroductionInterface>();
  flag_order: boolean = true;

  import_experience(){
    const input:string | null  = prompt('pega un json')
    if(!input|| input == ''){
      throw new Error('input de configuracion esta vacia') 
    }
    try{
      this.changed.emit(JSON.parse(input))
    }catch(err: any){
      console.error(new Error(err))
    }
  }
  export_experience(){
    const blob = new Blob([JSON.stringify(this.arr_elements)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.name_download}.json`;
    link.click();

    window.URL.revokeObjectURL(url);
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const res = JSON.parse(reader.result as string)
        this.changed.emit(res)
      } catch (error) {
       console.error(new Error('Error al leer el JSON: ' + (error as Error).message)) 
      }
    };

    reader.readAsText(file);
  }
  order(){
    if(  Array.isArray(this.arr_elements) &&
    this.arr_elements.length > 0 &&
    this.arr_elements[0].start_date_experience instanceof Date){
      if(this.flag_order){
        this.arr_elements = this.arr_elements.sort((a, b) => b.start_date_experience.getTime() - a.start_date_experience.getTime())
        this.changed.emit(this.arr_elements.sort((a, b) => b.start_date_experience.getTime() - a.start_date_experience.getTime()))
        
      }else{
        this.arr_elements = this.arr_elements = this.arr_elements.sort((a, b) => a.start_date_experience.getTime() - b.start_date_experience.getTime())
        this.changed.emit(this.arr_elements = this.arr_elements.sort((a, b) => a.start_date_experience.getTime() - b.start_date_experience.getTime()))
      }
      this.flag_order = !this.flag_order
    }

  }
}
