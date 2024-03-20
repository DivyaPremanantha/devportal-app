import React from 'react';

export default function Tile({ content }) {

    const chunkArray = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
          chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
      };
    
    const data = chunkArray(content.apiResources, 4);
    return (
        <div class="components-div">
            {[...Array(data.length)].map((_, i) => {
                return (
                <div class="components-div-4">                    
                    {data[i] !== undefined && data[i].length > 0 && i < content.apiResources.length && data[i].map((card, index) => {
                        index = index + (i * 4);
                        return (
                            <div class="components-div-3">
                                <div class="components-div-5">
                                    <a href={"api/" + content.apiResources[index].apiInfo.apiName}>
                                        <img loading="lazy"
                                            srcset={content.apiResources[index].apiInfo.apiArtifacts.apiImages["api-components-page-image"]}
                                            class="components-img" />
                                    </a>
                                    <div class="components-div-6">
                                        <img loading="lazy"
                                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                                            class="components-img-2" />
                                        <div class="components-div-7">
                                            <div class="components-div-8">{content.apiResources[index].apiInfo.apiName}</div>
                                            <img loading="lazy"
                                                srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                                                class="components-img-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    )}
                </div>
          )})} 
        </div>
    )
}