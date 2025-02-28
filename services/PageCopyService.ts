/*
* FaqService.ts
* @2024 Digital Aid Seattle
*/

import { groq } from "next-sanity";
import { DASPageCopy } from "types";
import { sanityClient } from '../sanity/lib/client';

class PageCopyService {

    async getAll(): Promise<DASPageCopy[]> {
        return sanityClient()
            .fetch(groq`*[_type == "das-page-copy"] | order(orderRank)`);
    }

    async getByPage(page: string): Promise<DASPageCopy[]> {
        return sanityClient()
            .fetch(groq`*[_type == "das-page-copy" && page == "${page}" ]`);
    }

    async updateCopy(label: any, page: string): Promise<void> {
        return this.getByPage(page)
            .then(pageCopies => {
                Object.keys(label).forEach(key => {
                    const blurb = pageCopies.find(pc => pc.key === key)
                    if (blurb) {
                        label[key] = blurb.copy
                    }
                })

            })
    }
}

const pageCopyService = new PageCopyService();

export { pageCopyService };

