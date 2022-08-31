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
            name: 'body',
            title: 'Body',
            type: 'blockContent'
        }
    ]
}