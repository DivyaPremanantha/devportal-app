import '../components.css';
import Navbar from '../../app/Navbar';
import Footer from '../../app/Footer';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { LoadCSS } from '../util';

export async function getServerSideProps(context) {
  const content = {}
  content.orgName = context.params.orgName;

  var yamlRef;

  if (process.env.NEXT_PUBLIC_DEPLOYMENT === "DEV") {
    yamlRef = process.env.NEXT_PUBLIC_HOST + "resources/content/theme.json"

  }

  const yamlResponse = await fetch(yamlRef)
  const yamlContent = await yamlResponse.json()
  content.orgContent = yamlContent.orgLandingPageContent;
  content.theme = yamlContent.style;
  
  // Pass data to the page via props
  return { props: { content } }
}

export default function Components({ content }) {
  const router = useRouter();
  router.asPath = "/" + content.orgName;

  useEffect(() => {
    LoadCSS(content);
  }, []);

  return (
    <>
      <div class="components-div">
        <Navbar />
        <div class="components-div">
          <div class="components-div-2">
            <div class="components-column">
              <div class="components-div-3">
                <div class="components-div-4">
                  <div class="components-column-2">
                    <div class="components-div-5">
                      <a href={"api/accommodationAPI"}>
                        <img
                          loading="lazy"
                          srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/280ba45fb7b58e9ada2553c4153bd7f4d22b6d4b565caccc591ad7e230a1c021?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/280ba45fb7b58e9ada2553c4153bd7f4d22b6d4b565caccc591ad7e230a1c021?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/280ba45fb7b58e9ada2553c4153bd7f4d22b6d4b565caccc591ad7e230a1c021?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/280ba45fb7b58e9ada2553c4153bd7f4d22b6d4b565caccc591ad7e230a1c021?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/280ba45fb7b58e9ada2553c4153bd7f4d22b6d4b565caccc591ad7e230a1c021?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/280ba45fb7b58e9ada2553c4153bd7f4d22b6d4b565caccc591ad7e230a1c021?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/280ba45fb7b58e9ada2553c4153bd7f4d22b6d4b565caccc591ad7e230a1c021?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/280ba45fb7b58e9ada2553c4153bd7f4d22b6d4b565caccc591ad7e230a1c021?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                          class="components-img"
                        />
                      </a>
                      <div class="components-div-6">
                        <img
                          loading="lazy"
                          srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                          class="components-img-2"
                        />
                        <div class="components-div-7">
                          <div class="components-div-8">Accommodation</div>
                          <img
                            loading="lazy"
                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                            class="components-img-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="components-column-3">
                    <div class="components-div-9">
                      <img
                        loading="lazy"
                        srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/51325e089ee8c42aea5e67a08a0bd8d1a4851cff844cb6755d4de5845b2555d8?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/51325e089ee8c42aea5e67a08a0bd8d1a4851cff844cb6755d4de5845b2555d8?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/51325e089ee8c42aea5e67a08a0bd8d1a4851cff844cb6755d4de5845b2555d8?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/51325e089ee8c42aea5e67a08a0bd8d1a4851cff844cb6755d4de5845b2555d8?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/51325e089ee8c42aea5e67a08a0bd8d1a4851cff844cb6755d4de5845b2555d8?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/51325e089ee8c42aea5e67a08a0bd8d1a4851cff844cb6755d4de5845b2555d8?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/51325e089ee8c42aea5e67a08a0bd8d1a4851cff844cb6755d4de5845b2555d8?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/51325e089ee8c42aea5e67a08a0bd8d1a4851cff844cb6755d4de5845b2555d8?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                        class="components-img-4"
                      />
                      <div class="components-div-6">
                        <img
                          loading="lazy"
                          srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                          class="components-img-2"
                        />
                        <div class="components-div-7">
                          <div class="components-div-8">Leisure Activities</div>
                          <img
                            loading="lazy"
                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                            class="components-img-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="components-column-3">
                    <div class="components-div-9">
                      <img
                        loading="lazy"
                        srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/bf18845dd52f47533fbf04f74920b38fcb531da8472a7aac4c66a2404da92fbf?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf18845dd52f47533fbf04f74920b38fcb531da8472a7aac4c66a2404da92fbf?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf18845dd52f47533fbf04f74920b38fcb531da8472a7aac4c66a2404da92fbf?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf18845dd52f47533fbf04f74920b38fcb531da8472a7aac4c66a2404da92fbf?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf18845dd52f47533fbf04f74920b38fcb531da8472a7aac4c66a2404da92fbf?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf18845dd52f47533fbf04f74920b38fcb531da8472a7aac4c66a2404da92fbf?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf18845dd52f47533fbf04f74920b38fcb531da8472a7aac4c66a2404da92fbf?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bf18845dd52f47533fbf04f74920b38fcb531da8472a7aac4c66a2404da92fbf?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                        class="components-img-4"
                      />
                      <div class="components-div-6">
                        <img
                          loading="lazy"
                          srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                          class="components-img-2"
                        />
                        <div class="components-div-7">
                          <div class="components-div-8">Famous attractions</div>
                          <img
                            loading="lazy"
                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                            class="components-img-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="components-div-3">
                <div class="components-div-4">
                  <div class="components-column-2">
                    <div class="components-div-5">
                      <img
                        loading="lazy"
                        srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/1aa82de89597dc94791f447ec46a1e4b963246897f6449d17e01912901687d5a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aa82de89597dc94791f447ec46a1e4b963246897f6449d17e01912901687d5a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aa82de89597dc94791f447ec46a1e4b963246897f6449d17e01912901687d5a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aa82de89597dc94791f447ec46a1e4b963246897f6449d17e01912901687d5a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aa82de89597dc94791f447ec46a1e4b963246897f6449d17e01912901687d5a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aa82de89597dc94791f447ec46a1e4b963246897f6449d17e01912901687d5a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aa82de89597dc94791f447ec46a1e4b963246897f6449d17e01912901687d5a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aa82de89597dc94791f447ec46a1e4b963246897f6449d17e01912901687d5a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                        class="components-img-4"
                      />
                      <div class="components-div-6">
                        <img
                          loading="lazy"
                          srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                          class="components-img-2"
                        />
                        <div class="components-div-7">
                          <div class="components-div-8">Authentic Food</div>
                          <img
                            loading="lazy"
                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                            class="components-img-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="components-column-3">
                    <div class="components-div-9">
                      <img
                        loading="lazy"
                        srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/f361daf86477ac12dfa0e94f14834c99182ab21ea9dba0ec88f1a98529ffef99?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f361daf86477ac12dfa0e94f14834c99182ab21ea9dba0ec88f1a98529ffef99?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f361daf86477ac12dfa0e94f14834c99182ab21ea9dba0ec88f1a98529ffef99?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f361daf86477ac12dfa0e94f14834c99182ab21ea9dba0ec88f1a98529ffef99?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f361daf86477ac12dfa0e94f14834c99182ab21ea9dba0ec88f1a98529ffef99?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f361daf86477ac12dfa0e94f14834c99182ab21ea9dba0ec88f1a98529ffef99?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f361daf86477ac12dfa0e94f14834c99182ab21ea9dba0ec88f1a98529ffef99?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f361daf86477ac12dfa0e94f14834c99182ab21ea9dba0ec88f1a98529ffef99?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                        class="components-img-4"
                      />
                      <div class="components-div-6">
                        <img
                          loading="lazy"
                          srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                          class="components-img-2"
                        />
                        <div class="components-div-7">
                          <div class="components-div-8">Road Travel</div>
                          <img
                            loading="lazy"
                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5afaca97e163c8c98644ade3a14b57cf90a3733f081692147df3f518d2d7ac98?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                            class="components-img-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="components-column-3">
                    <div class="components-div-9">
                      <img
                        loading="lazy"
                        srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/e8d39e4f9b1d844af1046535280af3e56c7fe319ac10d063e8ed4517bdac02d7?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e8d39e4f9b1d844af1046535280af3e56c7fe319ac10d063e8ed4517bdac02d7?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e8d39e4f9b1d844af1046535280af3e56c7fe319ac10d063e8ed4517bdac02d7?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e8d39e4f9b1d844af1046535280af3e56c7fe319ac10d063e8ed4517bdac02d7?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e8d39e4f9b1d844af1046535280af3e56c7fe319ac10d063e8ed4517bdac02d7?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e8d39e4f9b1d844af1046535280af3e56c7fe319ac10d063e8ed4517bdac02d7?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e8d39e4f9b1d844af1046535280af3e56c7fe319ac10d063e8ed4517bdac02d7?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e8d39e4f9b1d844af1046535280af3e56c7fe319ac10d063e8ed4517bdac02d7?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                        class="components-img"
                      />
                      <div class="components-div-6">
                        <img
                          loading="lazy"
                          srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                          class="components-img-2"
                        />
                        <div class="components-div-7">
                          <div class="components-div-8">Local Festivals</div>
                          <img
                            loading="lazy"
                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                            class="components-img-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="components-column-3">
                    <div class="components-div-9">
                      <img
                        loading="lazy"
                        srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/1f386f94eb6d730b575ea10f7134243dc34df6e40edb81a6baa9358cc92c0926?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f386f94eb6d730b575ea10f7134243dc34df6e40edb81a6baa9358cc92c0926?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f386f94eb6d730b575ea10f7134243dc34df6e40edb81a6baa9358cc92c0926?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f386f94eb6d730b575ea10f7134243dc34df6e40edb81a6baa9358cc92c0926?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f386f94eb6d730b575ea10f7134243dc34df6e40edb81a6baa9358cc92c0926?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f386f94eb6d730b575ea10f7134243dc34df6e40edb81a6baa9358cc92c0926?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f386f94eb6d730b575ea10f7134243dc34df6e40edb81a6baa9358cc92c0926?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1f386f94eb6d730b575ea10f7134243dc34df6e40edb81a6baa9358cc92c0926?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                        class="components-img-4"
                      />
                      <div class="components-div-6">
                        <img
                          loading="lazy"
                          srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9e36320710efb2e55281c303545f10439ec511a9f954d0feba84c5287d41c8a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                          class="components-img-2"
                        />
                        <div class="components-div-7">
                          <div class="components-div-8">Hotel Availability</div>
                          <img
                            loading="lazy"
                            srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25ae74c3419e5f7f4371c01e41b72787e88664c97030ff81594a903630a35f9?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                            class="components-img-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="components-column-4">
              <div class="components-div-16">
                <div class="components-div-17">
                  Explore All Components
                  <br />
                </div>
                <div class="components-div-18">
                  <div class="components-div-19">Watch a Demo for more details</div>
                  <img
                    loading="lazy"
                    srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/dc949d492e95ee533a871d858f4b526718daf0e06fbd51cd550c2d168082219a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc949d492e95ee533a871d858f4b526718daf0e06fbd51cd550c2d168082219a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc949d492e95ee533a871d858f4b526718daf0e06fbd51cd550c2d168082219a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc949d492e95ee533a871d858f4b526718daf0e06fbd51cd550c2d168082219a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc949d492e95ee533a871d858f4b526718daf0e06fbd51cd550c2d168082219a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc949d492e95ee533a871d858f4b526718daf0e06fbd51cd550c2d168082219a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc949d492e95ee533a871d858f4b526718daf0e06fbd51cd550c2d168082219a?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/dc949d492e95ee533a871d858f4b526718daf0e06fbd51cd550c2d168082219a?apiKey=5054b86bb369459e857ad81bc8b6e736&"
                    class="components-img-10"
                  />
                  <div class="components-div-20">Watch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

}