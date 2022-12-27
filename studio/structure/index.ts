import S from '@sanity/desk-tool/structure-builder';
import { BiHomeAlt, BiBookContent } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const Structure = () => (
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Header Settings')
                .child(
                    S.document()
                        .title('Header Settings')
                        .id('headerSettings')
                        .documentId('headerSettings')
                        .schemaType('headerSettings')
                )
                .icon(FiSettings),
            S.divider(),
            S.listItem()
                .title('Home')
                .child(
                    S.document()
                        .title('Home Page')
                        .id('homePage')
                        .documentId('homePage')
                        .schemaType('homePage')
                )
                .icon(BiHomeAlt),
            S.listItem()
                .title('Information')
                .child(
                    S.document()
                        .title('Information Page')
                        .id('informationPage')
                        .documentId('informationPage')
                        .schemaType('informationPage')
                )
                .icon(IoMdInformationCircleOutline),
            S.divider(),
            orderableDocumentListDeskItem({
                type: 'project',
                title: 'Projects',
                params: {
                    lang: 'en_US'
                },
                icon: () => '📷'
            }),
        ])
)

export default Structure