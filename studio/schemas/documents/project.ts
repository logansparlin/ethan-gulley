import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { string } from 'prop-types';

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    orderRankField({ type: 'project' }),
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'imgWithAlt'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', fields: [{ name: 'alt', title: 'Alt', type: 'string' }] }],
      options: { layout: 'grid' }
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial', value: 'editorial' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Personal', value: 'personal' }
        ]
      }
    },
    {
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Credit Item',
          name: 'item',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Title'
            },
            {
              name: 'name',
              title: 'Name',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'name',
                  title: 'Name',
                  fields: [
                    {
                      type: 'string',
                      name: 'name',
                      title: 'Name'
                    },
                    {
                      type: 'url',
                      name: 'url',
                      title: 'Link'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      images: 'images'
    },
    prepare({ title, image, images }) {
      return {
        title,
        media: images?.length >= 1 ? images[0] : image?.src
      };
    }
  }
}