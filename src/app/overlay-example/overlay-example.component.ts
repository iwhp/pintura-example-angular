import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PinturaEditorComponent } from '@pqina/angular-pintura';

// pintura
import {
  LocaleCore,
  LocaleCrop,
  LocaleFinetune,
  LocaleFilter,
  LocaleAnnotate,
  LocaleMarkupEditor,
} from '@pqina/pintura/locale/en_GB';

import {
  // editor
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_finetune,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_defaults,
  plugin_annotate,
  markup_editor_defaults,

  // filepond
  legacyDataToImageState,
  openEditor,
  processImage,
} from '@pqina/pintura';

@Component({
  selector: 'app-overlay-example',
  templateUrl: './overlay-example.component.html',
  styleUrls: ['./overlay-example.component.css'],
})
export class OverlayExampleComponent {
  // @ViewChild('editorRef') editorRef?: PinturaEditorComponent<any> = undefined;

  constructor(private sanitizer: DomSanitizer) {}

  // overlay
  src: string = 'assets/image.jpeg';
  visible: boolean = false;
  result?: string = undefined;
  editorOptions: any = {
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    locale: {
      ...LocaleCore,
      ...LocaleCrop,
    },
  };

  handleLoad($event: any) {
    console.log('overlay load', $event);
  }

  handleProcess($event: any) {
    const objectURL = URL.createObjectURL($event.dest);
    this.result = this.sanitizer.bypassSecurityTrustResourceUrl(
      objectURL
    ) as string;
    this.editorOptions = {
      ...this.editorOptions,
      imageState: $event.imageState,
    };

    this.visible = false;
  }
}
