import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilePondOptions } from 'filepond';
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
    selector: 'app-filepond-example',
    templateUrl: './filepond-example.component.html',
    styleUrls: ['./filepond-example.component.css'],
    standalone: false
})
export class FilepondExampleComponent {
  // filepond
  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Drop files here...',
    // FilePond Image Editor plugin properties
    imageEditor: {
      // Maps legacy data objects to new imageState objects (optional)
      legacyDataToImageState: legacyDataToImageState,

      // Used to create the editor (required)
      createEditor: openEditor,

      // Used for reading the image data. See JavaScript installation for details on the `imageReader` property (required)
      imageReader: [
        createDefaultImageReader,
        {
          // createDefaultImageReader options here
        },
      ],

      // Can leave out when not generating a preview thumbnail and/or output image (required)
      imageWriter: [
        createDefaultImageWriter,
        {
          // We'll resize images to fit a 512 × 512 square
          targetSize: {
            width: 512,
            height: 512,
          },
        },
      ],

      // Used to generate poster images, runs an invisible "headless" editor instance. (optional)
      imageProcessor: processImage,

      // Pintura Image Editor options
      editorOptions: {
        // The markup editor default options, tools, shape style controls
        ...markup_editor_defaults,

        // The finetune util controls
        ...plugin_finetune_defaults,

        // This handles complex shapes like arrows / frames
        shapePreprocessor: createDefaultShapePreprocessor(),

        // This will set a square crop aspect ratio
        imageCropAspectRatio: 1,

        // The icons and labels to use in the user interface (required)
        locale: {
          ...LocaleCore,
          ...LocaleCrop,
          ...LocaleFinetune,
          ...LocaleFilter,
          ...LocaleAnnotate,
          ...LocaleMarkupEditor,
        },
      },
    },
  };

  pondFiles: FilePondOptions['files'] = ['assets/image.jpeg'];

  pondHandleInit() {
    console.log('FilePond has initialised');
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  pondHandlePrepareFile(event: any) {
    console.log('A file was prepared', event);
    // Append output image to page for testing
    // const url = URL.createObjectURL(event.output);
    // const img = new Image();
    // img.src = url;
    // document.body.append(img);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event);
  }
}
