import { FiSettings } from 'react-icons/fi';

export default {
    name: 'headerSettings',
    title: 'Header Settings',
    type: 'document',
    icon: FiSettings,
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string'
        },
        {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [{ type: 'pageLink' }]
        }
    ]
}