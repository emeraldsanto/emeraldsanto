import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Storyblok, { Story } from 'storyblok-js-client';
import environment from './environment';

type ContextAwareStoryblok<TKey extends keyof Storyblok> = (...args: [...Parameters<Storyblok[TKey]>, GetStaticPropsContext]) => ReturnType<Storyblok[TKey]>;

export interface SpecificStory<TContent extends Record<string, unknown>> extends Story {
  data: {
    story: Story['data']['story'] & { content: TContent }
  }
}

export interface StoryPageProps<TContent extends Record<string, unknown>> {
  story: SpecificStory<TContent>['data']['story']
  preview: boolean
}

export namespace CMS {
  const client = new Storyblok({
    accessToken: environment.services.storyblock.accessToken,
    cache: {
      clear: 'auto',
      type: 'memory'
    }
  });

  export const getStory: ContextAwareStoryblok<'getStory'> = (slug, params, context) => {
    return client.getStory(slug, {
      version: context.preview ? "draft" : "published",
      cv: context.preview ? Date.now() : undefined,
      language: context.locale,
      ...params,
    });
  }

  export const getStaticProps = <TContent extends Record<string, unknown>>(...[slug, params]: Parameters<Storyblok['getStory']>) => {
    return async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<StoryPageProps<TContent>>> => {
      const response = await CMS.getStory(slug, params, context);

      return {
        props: {
          story: response.data.story as SpecificStory<TContent>['data']['story'],
          preview: context.preview ?? false,
        },
        revalidate: 10
      }
    }
  }
}
