import { BiHomeAlt } from 'react-icons/bi'
    ;
export default {
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    icon: BiHomeAlt,
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