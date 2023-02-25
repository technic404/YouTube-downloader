const APP_API_URL = `http://localhost:3000`;
const YOUTUBE_BASE_URL = `https://www.youtube.com/watch?v=`;
const YOUTUBE_FULL_VIDEO_URL_LENGHT = 43;

const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", async (e) => {
    if(input.value == "") { return createTempNotification("Error", "Link field is empty", notifyType.DANGER); }

    const url = (input.value.substring(0, YOUTUBE_FULL_VIDEO_URL_LENGHT));

    console.log(url);

    /* Frontend validation */
    const isLinkValid = (url.startsWith(YOUTUBE_BASE_URL) && url.length === YOUTUBE_FULL_VIDEO_URL_LENGHT);

    if(!isLinkValid) { return createTempNotification("Error", "Link is not valid", notifyType.DANGER); }

    /* Server validation */
    const response = await get(`${APP_API_URL}/validateVideoUrl?url=${url}`, true);
    
    if(!response.isValid) { return createTempNotification("Error", "Link is not valid", notifyType.DANGER); }

    window.location.replace(`${APP_API_URL}/getVideo?url=${url}`);
    
});