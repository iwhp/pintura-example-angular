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

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  @ViewChild('inlineEditor') inlineEditor?: PinturaEditorComponent<any> =
    undefined;

  constructor(private sanitizer: DomSanitizer) {}

  // editor generic state
  editorOptions: any = {
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    shapePreprocessor: createDefaultShapePreprocessor(),
    ...plugin_finetune_defaults,
    ...plugin_filter_defaults,
    ...markup_editor_defaults,
    locale: {
      ...LocaleCore,
      ...LocaleCrop,
      ...LocaleFinetune,
      ...LocaleFilter,
      ...LocaleAnnotate,
      ...LocaleMarkupEditor,
    },
  };

  // inline
  inlineSrc: string = 'assets/image.jpeg';
  inlineResult?: string = undefined;
  inlineCropAspectRatio = 1;

  handleInlineLoad($event: any) {
    console.log('inline load', $event);

    console.log('inline component ref', this.inlineEditor);

    console.log('inline editor instance ref', this.inlineEditor?.editor);

    console.log(
      'inline editor image state',
      this.inlineEditor?.editor?.imageState
    );
  }

  handleInlineProcess($event: any) {
    console.log('inline process', $event);

    const objectURL = URL.createObjectURL($event.dest);
    this.inlineResult = this.sanitizer.bypassSecurityTrustResourceUrl(
      objectURL
    ) as string;
  }

  // modal
  modalSrc: string = 'assets/image.jpeg';
  modalResult?: string = undefined;
  modalVisible: boolean = false;

  handleModalLoad($event: any) {
    console.log('modal load', $event);
  }

  handleModalProcess($event: any) {
    console.log('modal process', $event);
    const objectURL = URL.createObjectURL($event.dest);
    this.modalResult = this.sanitizer.bypassSecurityTrustResourceUrl(
      objectURL
    ) as string;
  }

  // overlay
  overlaySrc: string = 'assets/image.jpeg';
  overlayVisible: boolean = false;
  overlayResult?: string = undefined;
  overlayOptions: any = {
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter(),
    locale: {
      ...LocaleCore,
      ...LocaleCrop,
    },
  };

  handleOverlayLoad($event: any) {
    console.log('overlay load', $event);
  }

  handleOverlayProcess($event: any) {
    const objectURL = URL.createObjectURL($event.dest);
    this.overlayResult = this.sanitizer.bypassSecurityTrustResourceUrl(
      objectURL
    ) as string;
    this.overlayOptions = {
      ...this.overlayOptions,
      imageState: $event.imageState,
    };

    this.overlayVisible = false;
  }

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
