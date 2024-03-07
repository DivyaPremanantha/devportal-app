import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <div className="nav-bar">
        <div className="nav-bar-element"> <a href= {router.asPath} > Home</a></div>
        <div className="nav-bar-element">  <a href={router.asPath + "/components"} > Components </a></div>
        <div className="nav-bar-element">Solution</div>
        <div className="nav-bar-element">Community</div>
        <div className="nav-bar-element">Monetization</div>
        <div className="nav-bar-element">Support</div>
        <div className="nav-bar-element">Login</div>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/276ba13412807b0e9591eaf29b8f0cb956283c318d06ec86db686186efcbbf96?apiKey=5054b86bb369459e857ad81bc8b6e736&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/276ba13412807b0e9591eaf29b8f0cb956283c318d06ec86db686186efcbbf96?apiKey=5054b86bb369459e857ad81bc8b6e736&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/276ba13412807b0e9591eaf29b8f0cb956283c318d06ec86db686186efcbbf96?apiKey=5054b86bb369459e857ad81bc8b6e736&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/276ba13412807b0e9591eaf29b8f0cb956283c318d06ec86db686186efcbbf96?apiKey=5054b86bb369459e857ad81bc8b6e736&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/276ba13412807b0e9591eaf29b8f0cb956283c318d06ec86db686186efcbbf96?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/276ba13412807b0e9591eaf29b8f0cb956283c318d06ec86db686186efcbbf96?apiKey=5054b86bb369459e857ad81bc8b6e736&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/276ba13412807b0e9591eaf29b8f0cb956283c318d06ec86db686186efcbbf96?apiKey=5054b86bb369459e857ad81bc8b6e736&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/276ba13412807b0e9591eaf29b8f0cb956283c318d06ec86db686186efcbbf96?apiKey=5054b86bb369459e857ad81bc8b6e736&"
          className="nav-bar-img"
        />
      </div>
    </>
  )
}