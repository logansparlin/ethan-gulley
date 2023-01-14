import { groq } from 'next-sanity';
import { sanityClient } from '@lib/sanity';

export async function getHomePage() {
    const query = groq`
        *[_type == "homePage"][0] {
            title,
            "projects": *[_type == "project"]|order(orderRank) {
                ...,
                image {
                    src,
                    alt,
                    "lqip": src.asset -> metadata.lqip,
                    "metadata": src.asset -> metadata
                },
                images[] {
                    ...,
                    "lqip": asset -> metadata.lqip,
                    "metadata": asset -> metadata
                },
            },
            "site": *[_type == "headerSettings"][0] {
                title,
                links[] {
                    label,
                    page ->,
                    _key,
                    _type
                }
            }
        }
    `

    const data = await sanityClient.fetch(query);

    return {
        data,
        query
    }
}

export async function getProject(slug: string) {
    const query = groq`
        *[_type == "project" && slug.current match '${slug}'][0] {
            ...,
            image {
                src,
                alt,
                "lqip": src.asset -> metadata.lqip,
                "metadata": src.asset -> metadata
            },
            images[] {
                ...,
                "lqip": asset -> metadata.lqip,
                "metadata": asset -> metadata
            },
            "site": *[_type == "headerSettings"][0] {
                title,
                links[] {
                    label,
                    page ->,
                    _key,
                    _type
                }
            },
            "projects": *[_type == "project"]|order(orderRank) {
                ...,
                image {
                    src,
                    alt,
                    "lqip": src.asset -> metadata.lqip,
                    "metadata": src.asset -> metadata
                },
                images[] {
                    ...,
                    "lqip": asset -> metadata.lqip,
                    "metadata": asset -> metadata
                },
            },
        }
    `;

    const data = await sanityClient.fetch(query);

    return {
        data,
        query
    }
}

export async function getPage(slug: string) {
    const query = groq`
        *[_type == "page" && slug.current match '${slug}'][0] {
            title,
            slug,
            body
        }
    `

    const data = await sanityClient.fetch(query);

    return {
        data,
        query
    }
}

export async function getProjectPaths() {
    const query = groq`
        *[_type == "project" && defined(slug)] {
            "params": { "slug": slug.current }
        }
    `;

    const data = await sanityClient.fetch(query);

    return {
        data,
        query
    };
}
