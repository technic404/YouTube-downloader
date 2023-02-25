const notifyType = {
    SUCCESS: "notify-success",
    DANGER: "notify-danger",
    INFO: "notify-info"
}

const animationDuration = 500; // ms
const notificationContainer = document.getElementById("notification-container");

function createNotification(notifyTitle, notifyDescription, notifyType) {
    /* Clear existing notifications */
    while(notificationContainer.firstChild) {
        notificationContainer.removeChild(notificationContainer.firstChild);
    }

    notificationContainer.insertAdjacentHTML(
        'beforeend',
        '' +
        '<div class="notification" id="temp-notify" onclick="deleteNotification();" style="visibility: visible;">\n' +
        '    <div class="notify-body ' + notifyType + '">\n' +
        '        <div class="notify-title">\n' +
        '            ' + notifyTitle + '\n' +
        '        </div>\n' +
        '        <div class="notify-description">\n' +
        '            ' + notifyDescription + '\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>'
    );

    const tempNotify = document.getElementById("temp-notify");

    tempNotify.classList.add("notify-show");
}

function deleteNotification() {
    const tempNotify = document.getElementById("temp-notify");

    tempNotify.classList.add("notify-hide");
    tempNotify.style.visibility = "hidden";
}

function createTempNotification(notifyTitle, notifyDescription, notifyType, notifyDurationShow = 5000) {
    createNotification(notifyTitle, notifyDescription, notifyType);

    setTimeout(() => {
        deleteNotification();
    }, notifyDurationShow);
}