import { AppProps } from "$fresh/server.ts";
import GlobalTags from "deco-sites/fashion/components/GlobalTags.tsx";
import DesignSystem from "deco-sites/fashion/sections/DesignSystem.tsx";
import HeaderSHP from "deco-sites/shp/sections/HeaderSHP.tsx";
import type { Props } from "deco-sites/shp/sections/HeaderSHP.tsx";

function App(props: AppProps, properties: Props) {
  return (
    <>
      <HeaderSHP {...properties} />

      {/* Include default fonts and css vars */}
      <DesignSystem />

      {/* Include Icons and manifest */}
      <GlobalTags />

      {/* Rest of Preact tree */}
      <props.Component />
    </>
  );
}

export default App;
