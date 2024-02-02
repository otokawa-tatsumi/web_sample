// 非同期関数でGETリクエストを送信
async function sendGetRequest() {
    try {
        const response = await fetch('http://localhost:8081/');
        const data = await response.json();
        document.getElementById('getResponse').innerHTML = 'GET Response: ' + data.message;
    } catch (error) {
        console.error('Error sending GET request:', error);
    }
}

// 非同期関数でPOSTリクエストを送信
async function sendPostRequest() {
    try {
        const response = await fetch('http://localhost:8081/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: 'value' }),
        });
        const data = await response.json();
        document.getElementById('postResponse').innerHTML = 'POST Response: ' + data.message;
    } catch (error) {
        console.error('Error sending POST request:', error);
    }
}
