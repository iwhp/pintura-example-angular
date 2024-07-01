import { CustomExampleComponent } from './custom-example/custom-example.component';
import { DefaultsExampleComponent } from './defaults-example/defaults-example.component';
import { FilepondExampleComponent } from './filepond-example/filepond-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { OverlayExampleComponent } from './overlay-example/overlay-example.component';
import { VideoExampleComponent } from './video-example/video-example.component';

export const routes = [
  { path: '', component: DefaultsExampleComponent },
  { path: 'custom-example', component: CustomExampleComponent },
  { path: 'defaults-example', component: DefaultsExampleComponent },
  { path: 'filepond-example', component: FilepondExampleComponent },
  { path: 'modal-example', component: ModalExampleComponent },
  { path: 'overlay-example', component: OverlayExampleComponent },
  { path: 'video-example', component: VideoExampleComponent },
];
