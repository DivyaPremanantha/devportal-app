import React from 'react';

export default function Tile({ content }) {
    const length = content.apiArtifacts.length / 4;
    console.log(length);
    return (
        <div class="components-div-2">
            {/* {[...Array(length)].map((_, i) => { */}
                <div class="components-div-4">
                    {content.apiArtifacts.map((card, index) => {
                        return (
                            <div class="components-div-3">
                                <div class="components-div-5">
                                    <a href="api/accommodationAPI">
                                        <img loading="lazy"
                                            srcset={content.apiArtifacts[index].apiInfo.apiArtifacts.apiImages["api-components-page-image"]}
                                            class="components-img" />
                                    </a>
                                    <div class="components-div-6">
                                        <img loading="lazy"
                                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                                            class="components-img-2" />
                                        <div class="components-div-7">
                                            <div class="components-div-8">{content.apiArtifacts[index].apiInfo.apiName}</div>
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
         {/* })} */}
        </div>
    )
}