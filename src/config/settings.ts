export const CONFIG = {
  // Timeouts (in milliseconds)
  TIMEOUTS: {
    PAGE_LOAD: 15000,
    ELEMENT_WAIT: 10000,
    POPUP_CLOSE: 15000,
    NETWORK_IDLE: 5000,
    STABILITY_CHECK: 1000,
  },

  // Retry settings
  RETRY: {
    LOGIN_ATTEMPTS: 2,
    MEMBER_EXTRACTION_ATTEMPTS: 2,
    BROWSER_LAUNCH_ATTEMPTS: 3,
  },

  // Screenshots
  SCREENSHOTS: {
    ENABLED: true,
    FULL_PAGE: true,
    PATH_PREFIX: 'members-screenshot',
  },

  // Browser settings
  BROWSER: {
    HEADLESS: false, // Set to true for production
    SLOW_MO: 100, // Slow down actions for debugging
  },
} as const;
