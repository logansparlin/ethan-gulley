import { IoMdInformationCircleOutline } from 'react-icons/io';

export default {
    name: 'informationPage',
    title: 'Information',
    type: 'document',
    icon: IoMdInformationCircleOutline,
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
    ]
}