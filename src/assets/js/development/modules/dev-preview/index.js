import { DevPreview } from './dev-preview';
import { DevPreviewFullscreen } from './dev-preview-fullscreen';

export const initDevPreview = () => {
  new DevPreview();
  new DevPreviewFullscreen();
};
