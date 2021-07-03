import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ComponentType, useCallback, useEffect, useState } from 'react';
import Storyblok, { Story } from 'storyblok-js-client';
import SbEditable from 'storyblok-react';
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

export interface ButtonBlock {
  text: string
  url: string
}

export interface ExperienceBlock {
  employer: string
  url?: string
  periodStart: string
  periodEnd?: string
  jobTitle: string
  location: string
  description: string
  tags: Array<ParagraphBlock>
}

export interface ImageBlock {
  alt: string
  copyright: string
  fieldtype: 'asset'
  filename: string
  name: string
  title: string
}

export interface ParagraphBlock {
  text: string
}

export namespace CMS {
  export const client = new Storyblok({
    accessToken: environment.services.storyblock.accessToken,
    cache: {
      clear: 'auto',
      type: 'memory'
    }
  });

  export const getStory: ContextAwareStoryblok<'getStory'> = (slug, params, context) => {
    return client.getStory(slug, {
      ...params,
      version: context.preview ? "draft" : "published",
      cv: context.preview ? Date.now() : undefined,
      language: context.locale,
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
        revalidate: 3600
      }
    }
  }
}

export function useLiveStory<TContent extends Record<string, unknown>>(story: SpecificStory<TContent>['data']['story'], preview: boolean): SpecificStory<TContent>['data']['story'] {
  const [liveStory, setLiveStory] = useState(story);

  useEffect(
    () => {
      if (!preview) return;
      addBridge().then(addEventListeners);
    },
    [preview]
  );

  function addEventListeners() {
    const { StoryblokBridge } = window as any;

    if (typeof StoryblokBridge === "undefined") return;

    const storyblokInstance = new StoryblokBridge();

    storyblokInstance.on(["change", "published"], location.reload);

    storyblokInstance.on("input", (event: { story: SpecificStory<TContent>['data']['story'] }) => {
      if (event.story.content._uid !== liveStory.content._uid) return;
      setLiveStory(event.story);
    });

    storyblokInstance.on('enterEditmode', async (event: any) => {
      try {
        const response = await CMS.client.getStory(event.storyId, { version: "draft" });
        setLiveStory(response.data.story as SpecificStory<TContent>['data']['story']);
      } catch (error) {
        console.log(error);
      }
    });
  }

  function addBridge(): Promise<void> {
    const existingScript = document.getElementById("storyblokBridge");
    if (existingScript) return Promise.resolve();

    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
      script.id = "storyblokBridge";
      script.onload = () => resolve();

      document.body.appendChild(script);
    });
  }

  return liveStory;
}

export function withEditable<TProps extends StoryPageProps<any>>(Component: ComponentType<TProps>) {
  return function Editable({ story, preview, ...rest }: TProps) {
    const liveStory = useLiveStory(story, preview);

    return (
      <SbEditable content={liveStory.content}>
        <Component {...{ story: liveStory, preview, ...rest } as TProps} />
      </SbEditable>
    )
  }
}
