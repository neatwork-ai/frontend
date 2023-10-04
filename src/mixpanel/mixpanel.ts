import mixpanel from "mixpanel-browser";

const NEXT_PUBLIC_MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Ensures Mixpanel is only initialized on the client side.
if (typeof window !== "undefined") {
  mixpanel.init(NEXT_PUBLIC_MIXPANEL_TOKEN!, { track_pageview: true });
}

if (process.env.NODE_ENV !== "production") {
  mixpanel.disable();
}

export const trackEvent = (eventName: string, properties?: object) => {
  mixpanel.track(eventName, properties);
};
