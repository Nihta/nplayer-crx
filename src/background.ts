chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        condition: {
          regexFilter: "^https?://.*\.m3u8.*",
          resourceTypes: ["main_frame"],
        },
        action: {
          type: "redirect",
          redirect: {
            regexSubstitution: `chrome-extension://${chrome.runtime.id}/index.html#\\0`,
          },
        },
      },
    ],
  });
});
