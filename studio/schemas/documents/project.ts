export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
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
    }
  ]
}