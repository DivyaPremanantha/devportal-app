const createGrid = () => {
    console.log("creategrid")
    const markup = '<div  id="container" >'
    var newElement = document.createElement('div');
    newElement.innerHTML = markup;

   
    document.body.appendChild(newElement)
}

const layoutGrid = (height, width) => {
    console.log("layout")

    const container = document.getElementById('container')
    console.log("layout")
    console.log(container);
    container.style.gridTemplateColumns = 'repeat(${width}, 1fr)'
    container.style.gridTemplateRows = 'repeat(${height}, 1fr)'
}

const fillGrid = (x, y, blockSize, numOfBlocks, color) => {
    console.log("fillgrid")

    const container = document.getElementById('container')
   
    const test = Array(numOfBlocks).keys()
    let markup = '<div class="components-inner-section"> <img loading="lazy" class="components-img" /> <div class="components-inner-section-bottom"> <div> <a href={"api/" + content.apiResources[index].apiInfo.apiName} > <img loading="lazy" srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&" class="ref-img" /> </a> </div> <div class="components-heading-section"> <div class="tile-heading">{content.apiResources[index].apiInfo.apiName}</div> </div> </div> </div>'
            for (i = 0; i < 3; ++i) {
                const colDiv = document.createElement('div');
                colDiv.className = 'components-div components-page'
                container.appendChild(colDiv)
                for (j = 0; j < 3; ++j) {
                    const div = document.createElement('div');
                    div.className="components-section";
                    div.innerHTML = markup;
        
                    colDiv.appendChild(div)
                    }
                    //container.innerHTML += markup
                }}


