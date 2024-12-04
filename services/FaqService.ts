/*
* FaqService.ts
* @2024 Digital Aid Seattle
*/

import { groq } from "next-sanity";
import { DASFaq } from "types";
import { sanityClient } from '../sanity/lib/client';

class FaqService {

    async getAll(): Promise<DASFaq[]> {
        return sanityClient()
            .fetch(groq`*[_type == "das-faq"] | order(orderRank)`);
    }

}

const faqService = new FaqService();

export { faqService };

