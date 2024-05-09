import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      <meta name="theme-color" content="#dd1f26"/>

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-32x32.png")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />


      {/* Preconnects dos requests */}
      <link rel='preconnect' href='https://shopinfo.vteximg.com.br'/>

      <link rel='preconnect' href='https://shopinfo.vtexcommercerstable.com.br'/>

      <link rel='preconnect' href='https://api.shopinfo.com.br'/>

      {/* Swiper CSS */}
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'/>
    </Head>
  );
}

export default GlobalTags;
