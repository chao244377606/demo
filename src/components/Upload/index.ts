import { withInstall } from '/@/utils';
import basicUpload from './src/BasicUpload.vue';
import picUpload from './src/PicUpload.vue';

export const BasicUpload = withInstall(basicUpload);
export const PicUpload = withInstall(picUpload);
