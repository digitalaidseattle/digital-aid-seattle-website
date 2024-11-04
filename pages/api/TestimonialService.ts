/*
* @2023 Digital Aid Seattle
*/

import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity/lib/client';
import { DASTestimonial, OSEvent } from 'types';

class TestimonialService {

  async getActiveTestimonials(): Promise<DASTestimonial[]> {
    return sanityClient()
      .fetch(groq`*[_type == "das-testimonial" && active == true]`);
  }

}

const testimonialService = new TestimonialService();

export { testimonialService };
