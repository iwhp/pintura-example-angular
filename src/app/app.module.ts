import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';

import { AngularPinturaModule } from '@pqina/angular-pintura';

import { FilePondModule, registerPlugin } from 'ngx-filepond';

import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor';

import { VideoExampleComponent } from './video-example/video-example.component';
import { FilepondExampleComponent } from './filepond-example/filepond-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { OverlayExampleComponent } from './overlay-example/overlay-example.component';
import { DefaultsExampleComponent } from './defaults-example/defaults-example.component';
import { CustomExampleComponent } from './custom-example/custom-example.component';

registerPlugin(FilePondPluginFilePoster, FilePondPluginImageEditor);

@NgModule({
  declarations: [
    AppComponent,
    VideoExampleComponent,
    FilepondExampleComponent,
    ModalExampleComponent,
    OverlayExampleComponent,
    DefaultsExampleComponent,
    CustomExampleComponent,
  ],
  imports: [
    BrowserModule,
    RouterLink,
    RouterOutlet,
    AngularPinturaModule,
    FilePondModule,
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
