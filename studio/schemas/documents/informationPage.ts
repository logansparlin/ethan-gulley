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
        {
            name: 'contact',
            title: 'Contact',
            type: 'blockContent'
        },
        {
            name: 'credits',
            title: 'Credits',
            type: 'array',
            of: [{
                name: 'credit',
                title: 'Credit',
                type: 'object',
                fields: [
                    {
                        name: 'role',
                        title: 'Role',
                        type: 'string'
                    },
                    {
                        name: 'name',
                        title: 'Name',
                        type: 'string'
                    },
                    {
                        name: 'url',
                        title: 'URL',
                        type: 'url'
                    }
                ]
            }]
        },
        {
            name: 'clients',
            title: 'Select Clients',
            type: 'array',
            of: [{
                name: 'client',
                title: 'Client',
                type: 'object',
                fields: [
                    {
                        name: 'name',
                        title: 'Name',
                        type: 'string'
                    }
                ]
            }]
        },
        {
            name: 'publications',
            title: 'Select Publications',
            type: 'array',
            of: [{
                name: 'publication',
                title: 'Publication',
                type: 'object',
                fields: [
                    {
                        name: 'name',
                        title: 'Name',
                        type: 'string'
                    },
                    {
                        name: 'url',
                        title: 'URL',
                        type: 'url'
                    }
                ]
            }]
        },
        {
            name: 'selfPublications',
            title: 'Self Publications',
            type: 'array',
            of: [{
                name: 'publication',
                title: 'Publication',
                type: 'object',
                fields: [
                    {
                        name: 'name',
                        title: 'Name',
                        type: 'string'
                    },
                    {
                        name: 'url',
                        title: 'URL',
                        type: 'url'
                    }
                ]
            }]
        },
        {
            name: 'exhibitions',
            title: 'Exhibitions',
            type: 'array',
            of: [{
                name: 'exhibition',
                title: 'Exhibition',
                type: 'object',
                fields: [{
                    name: 'details',
                    title: 'Details',
                    type: 'blockContent'
                }],
                preview: {
                    prepare() {
                        return {
                            title: 'Exhibition'
                        }
                    }
                }
            }]
        }
    ]
}