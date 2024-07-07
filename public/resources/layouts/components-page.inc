<nav class="navbar">
    <div class="navbar-container">
        <a id="org-logo" href="/ABCOrganization"><img src="/resources/images/logo.png" class="navbar-logo"></a>
        <div class="navbar-links" id="nav-bar">
            <a href="/ABCOrganization" class="navbar-link" id="org-home"> Home</a>
            <a href="/ABCOrganization/apis" class="navbar-link" id="org-apis"> APIs</a>
        </div>
    </div>
</nav>

<main class="components-page">
    {{#details.apiList}}
    <section class="components-inner-section">
        <img class="components-img" src={{apiInfo.imagePath}}></img>
        <div class="components-inner-section-bottom">
            <div>
                <a href=api/{{apiInfo.apiName}}>
                    <img loading="lazy"
                        srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                        class="ref-img" />
                </a>
            </div>
            <div class="components-heading-section">
                <div class="tile-heading"> {{apiInfo.apiName}}</div>
            </div>
        </div>
    </section>
    {{/details.apiList}}
</main>

<footer>
    &copy; 2023 XYZ Organization. All rights reserved.
</footer>