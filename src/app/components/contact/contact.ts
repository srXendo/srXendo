import { Component } from '@angular/core';
import { ToolsBox } from '../tools-box/tools-box';

@Component({
  selector: 'app-contact',
  imports: [ToolsBox],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  getImgBoxStyle(img: string) {
    return { 'background-image': 'url(' + img + ')' };
  }
  change_arr($event: any){
    console.log('import data contact', $event)
  }
}
