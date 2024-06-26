import React from 'react';

export default function Tile({ content }) {

    const chunkArray = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };
    let userRoles = [];
    const data = chunkArray(content.apiResources, 4);
    return (
        <div class="components-div">
            {[...Array(data.length)].map((_, i) => {
                return (
                    <div class="components-page">
                        {data[i] !== undefined && data[i].length > 0 && i < content.apiResources.length && data[i].map((card, index) => {
                            index = index + (i * 4);
                            var auth = content.apiResources[index].apiInfo.authorizedRoles;
                            var authorized = false;
                            if (auth != undefined && auth.length > 0 && auth[0] !== "") {
                                userRoles = content.token.role.split(" ")
                            } else {
                                authorized = true;
                            }
                            for (const role of userRoles) {
                                if (auth.includes(role)) {
                                    authorized = true;
                                    break;
                                }
                            }
                            return (
                                <div class="components-section">
                                    {authorized ?
                                        <div class="components-inner-section">
                                            {process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV" ? (
                                                <img loading="lazy"
                                                    srcset={content.apiResources[index].apiInfo.apiArtifacts.apiImages["api-detail-page-image"]}
                                                    class="components-img" />
                                            ) : process.env.NEXT_PUBLIC_STORAGE === "DB" ? (
                                                <img loading="lazy"
                                                    srcset={process.env.NEXT_PUBLIC_METADATA_LOCAL_API_URL + content.apiResources[index].apiInfo.apiArtifacts.apiImages["api-detail-page-image"].split('/images/')[1] + "?orgName=" + content.orgName + "&apiID=" + content.apiResources[index].apiInfo.apiName}
                                                    class="components-img" />
                                            ) : (
                                                <img loading="lazy"
                                                    srcset={process.env.NEXT_PUBLIC_AWS_URL + content.orgName + content.apiResources[index].apiInfo.apiArtifacts.apiImages["api-detail-page-image"]}
                                                    class="components-img" />
                                            )
                                            }
                                            <div class="components-inner-section-bottom">
                                                <div>
                                                    <a href={"api/" + content.apiResources[index].apiInfo.apiName} >
                                                        <img loading="lazy"
                                                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                                                            class="ref-img"
                                                        />
                                                    </a>
                                                </div>

                                                <div class="components-heading-section">
                                                    <div class="tile-heading">{content.apiResources[index].apiInfo.apiName}</div>
                                                </div>
                                            </div>
                                        </div> : null
                                    }
                                </div>
                            )
                        }
                        )}
                    </div>
                )
            })}
        </div>
    )
}