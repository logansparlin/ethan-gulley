export default {
  title: 'Page Link',
  name: 'pageLink',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string'
    },
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [{ type: 'informationPage' }]
    }
  ],
  preview: {
    select: {
      title: 'label'
    },
    prepare({ title }) {
      return {
        title
      };
    }
  }
};
