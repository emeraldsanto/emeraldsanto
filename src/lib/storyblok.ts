import Storyblok from 'storyblok-js-client';
import environment from './environment';

export const client = new Storyblok({
  accessToken: environment.services.storyblock.accessToken,
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});