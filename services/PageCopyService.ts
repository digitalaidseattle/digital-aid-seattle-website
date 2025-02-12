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

}

const pageCopyService = new PageCopyService();

export { pageCopyService };

