
const getAPIList = () => {
    console.log("apiList");

    console.log(Components.apiList);
    return Components.apiList;
}
//getAPIList();

const createGrid = () => {
    console.log("creategrid")
    const markup = '<div  id="container" >'
    var newElement = document.createElement('div');
    newElement.innerHTML = markup;


    document.body.appendChild(newElement)
}

const layoutGrid = (height, width) => {
    const container = document.getElementById('container')
    container.style.gridTemplateColumns = 'repeat(${width}, 1fr)'
    container.style.gridTemplateRows = 'repeat(${height}, 1fr)'
}

const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};

const fillGrid = (cols, apiList, mode, tile) => {

    console.log(mode)
    const data = chunkArray(apiList, cols, tile);
    const container = document.getElementById('container')
    for (i = 0; i < data.length; ++i) {
        const colDiv = document.createElement('div');
        colDiv.className = 'components-div components-page'
        container.appendChild(colDiv)
        for (j = 0; j < data[i].length; ++j) {
            let markup = `<div class="components-inner-section"> <img loading="lazy" srcset="${data[i][j].apiInfo.apiArtifacts.apiImages["api-detail-page-image"]}" class="components-img" /> <div class="components-inner-section-bottom">`+ 
            `<div> <a href= "api/${data[i][j].apiInfo.apiName}">`+ 
            `<img loading="lazy" srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&" class="ref-img" />`+
            `</a> </div> <div class="components-heading-section"> <div class="tile-heading">${data[i][j].apiInfo.apiName}</div> </div> </div> </div>`
            //let markup = tile;
            const apiTileDiv = document.createElement('div');
            apiTileDiv.className = "components-section";
            apiTileDiv.innerHTML = markup;
            colDiv.appendChild(apiTileDiv)
          
            // window.setTimeout(() => {
            //     console.log("This message is delayed by 2 seconds");
            //     if (document.getElementById(tileImage) !== null) {
            //         console.log("tileImage")
            //         const apiImage = document.getElementById(tileImage);
            //         var  imagePath = data[i][j].apiInfo.apiArtifacts.apiImages["api-detail-page-image"];
            //         apiImage.src = imagePath;
                   
            //     }
            // }, 10000);
           
        }
    }
}



