import {
    createClient,
    createImageUrlBuilder,
    createPortableTextComponent
} from 'next-sanity';

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production'
};

export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {}
})

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
