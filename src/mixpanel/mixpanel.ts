import mixpanel from "mixpanel-browser";

const NEXT_PUBLIC_MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Ensures Mixpanel is only initialized on the client side.
if (typeof window !== "undefined" && mixpanel && process.env.NODE_ENV == "production") {
  mixpanel.init(NEXT_PUBLIC_MIXPANEL_TOKEN!, { track_pageview: true });
}

export const trackEvent = (eventName: string, properties?: object) => {
  mixpanel.track(eventName, properties);
};
