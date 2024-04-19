import { PageProps } from '$fresh/server.ts'
import GlobalTags from 'deco-sites/fashion/components/GlobalTags.tsx'
import DesignSystem from 'deco-sites/fashion/sections/DesignSystem.tsx'

const sw = () =>
  addEventListener("load", () => {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  });

function App(props: PageProps) {
  return (
    <>

      {/* Include default fonts and css vars */}
      <DesignSystem />

      {/* Include Icons and manifest */}
      <GlobalTags />

      {/* Rest of Preact tree */}
      <props.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  )
}

export default App
