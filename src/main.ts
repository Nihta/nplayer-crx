import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import "./style.css";
import { defineCustomElements } from "vidstack/elements";
defineCustomElements();
import HLS from "hls.js";

const player = document.querySelector("media-player")!;
player.addEventListener("provider-change", (event: any) => {
  const provider = event.detail;
  if (provider?.type === "hls") {
    provider.library = HLS;
  }
});

const url = window.location.href.split("#")[1];
player.setAttribute("src", url);
