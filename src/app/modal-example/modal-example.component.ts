import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PinturaEditorOptions, getEditorDefaults } from '@pqina/pintura';

@Component({
  selector: 'app-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.css'],
})
export class ModalExampleComponent {
  constructor(private sanitizer: DomSanitizer) {}

  editorOptions = getEditorDefaults() as PinturaEditorOptions;

  src: string = 'assets/image.jpeg';
  result?: string = undefined;
  visible: boolean = false;

  handleLoad($event: any) {
    console.log('load', $event);
  }

  handleProcess($event: any) {
    console.log('process', $event);
    const objectURL = URL.createObjectURL($event.dest);
    this.result = this.sanitizer.bypassSecurityTrustResourceUrl(
      objectURL
    ) as string;
  }
}
