import { BiBookContent } from 'react-icons/bi'
;
export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: BiBookContent,
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
            name: 'body',
            title: 'Body',
            type: 'blockContent'
        }
    ]
}