export const LoadAndRenderHTML = (targetElementId, assertsFilePath) => {

    fetch(assertsFilePath)
        .then(response => response.text())
        .then(htmlContent => {
            if (document.getElementById(targetElementId) !== null) {
                document.getElementById(targetElementId).innerHTML = htmlContent;
                return htmlContent;
            }
        })
        .catch(error => console.error('Error loading stylesheet file:', error));
}


export const LoadAndRenderCSS = (assertsFilePath) => {

    fetch(assertsFilePath)
        .then(response => response.text())
        .then(styleSheetContent => {
            const styleElement = document.createElement('style');
            styleElement.innerHTML = styleSheetContent;
            document.head.appendChild(styleElement);
        })

}

export const LoadAPIContent = (filePath) => {
    fetch(filePath)
        .then(response => response.json())
        .then(apiData => {
            var data = apiData.apiInfo.additionalProperties;
            console.log(data);
            if (data !== null) {
                for (const [key, value] of Object.entries(data)) {
                    if (document.getElementById(key) !== null) {
                        document.getElementById(key).innerHTML = value;
                    }
                }
            }
            return apiData;
        })
}


