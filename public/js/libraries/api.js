async function get(requestUrl, parseToJson = false) {
    return await new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: `${requestUrl}`,
            success: function (data) {
                resolve((parseToJson ? JSON.parse(data) : data));
            }
        });
    });
}

async function post(requestUrl, postData, parseToJson = false) {
    return await new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: `${requestUrl}`,
            data: postData,
            enctype: 'multipart/form-data',
            success: function (data) {
                resolve((parseToJson ? JSON.parse(data) : data));
            }
        });
    });
}

function voidPost(requestUrl, postData) {
    $.ajax({
        type: 'POST',
        url: `${requestUrl}`,
        data: postData
    });
}