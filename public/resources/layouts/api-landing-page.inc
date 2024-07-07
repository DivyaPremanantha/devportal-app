<nav class="navbar">
  <div class="navbar-container">
    <a id="org-logo" href="/ABCOrganization"><img src="/resources/images/logo.png" class="navbar-logo"></a>
    <div class="navbar-links" id="nav-bar">
      <a href="/ABCOrganization" class="navbar-link" id="org-home"> Home</a>
            <a href="/ABCOrganization/apis" class="navbar-link" id="org-apis"> APIs</a>
    </div>
  </div>
</nav>

<header>
  <div class="api-header">
    <h1>{{details.apiResources.apiInfo.openApiDefinition.info.title}}</h1>
  </div>
</header>
<main class="api-section">
    <section class="container">
      <div class="version">
        <p>Version: <span>{{details.apiResources.apiInfo.openApiDefinition.info.version}}</span></p>
      </div>
      <div class="url">
        <p>URL: <a href={{details.apiResources.serverUrl.productionUrl}}> {{details.apiResources.serverUrl.productionUrl}}
          </a></p>
      </div>
    </section>
    <section class="api-description-section">
      <img class="api-image" src={{details.apiImageSrc}}></img>
      <p class="api-description" id="api-description">{{details.apiResources.apiInfo.openApiDefinition.info.description}}
      </p>
    </section>
    <section>{{{details.apiPage}}}</section>
</main>


<footer>
  &copy; 2023 XYZ Organization. All rights reserved.
</footer>