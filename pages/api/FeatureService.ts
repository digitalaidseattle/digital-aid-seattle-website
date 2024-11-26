/*
* FeatureService.ts
* @2024 Digital Aid Seattle
*/

import { groq } from "next-sanity";
import { useEffect, useRef, useState } from "react";
import { DASFeature } from "types";
import { sanityClient } from '../../sanity/lib/client';

const useFeature = (name: string) => {
    const cache: any = useRef({});
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState<boolean>();

    useEffect(() => {
        const fetchData = async () => {
            setStatus('fetching');
            if (cache[name]) {
                const data = cache[name];
                setData(data);
                setStatus('fetched');
            } else {

                const response = await sanityClient()!
                    .fetch(groq`*[_type == "das-feature"]`)
                response.forEach((feature: DASFeature) => {
                    cache[feature.name] = feature.enabled
                })
                setData(cache[name]);
                setStatus('fetched');
            }
        };

        fetchData();
    }, [name]);

    return { status, data };
};

export { useFeature };
