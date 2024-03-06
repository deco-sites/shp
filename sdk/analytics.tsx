import { GA4Events } from "deco-sites/shp/types/types.ts";

export const sendEvent = <E extends GA4Events>(event: E) => {
  console.log(JSON.stringify(event, null, 2));
  globalThis.window.DECO.events.dispatch(event);
};