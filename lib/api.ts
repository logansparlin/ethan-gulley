import { groq } from 'next-sanity';
import { sanityClient } from '@lib/sanity';

export async function getHomePage() {
    const query = groq`
        *[_type == "homePage"][0] {
            title,
            body
        }
    `

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
