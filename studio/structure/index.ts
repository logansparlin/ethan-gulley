import S from '@sanity/desk-tool/structure-builder';
import { BiHomeAlt, BiBookContent } from 'react-icons/bi'

const Structure = () => (
    S.list()
        .title('Content')
        .items([
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
            S.divider(),
            S.listItem()
                .title('Pages')
                .schemaType('page')
                .icon(BiBookContent)
                .child(
                    S.documentTypeList('page')
                        .title('Page')
                        .child(documentId => (
                            S.document()
                                .documentId(documentId)
                                .schemaType('page')
                        ))
                )
        ])
)

export default Structure