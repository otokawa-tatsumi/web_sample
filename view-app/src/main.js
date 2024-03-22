document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch('/api/main');
    const data = await response.json();
    if (response.ok) {
      document.getElementById('logoutButton').style.display = 'block';
    }
    document.getElementById('message').innerHTML = data.message;
  } catch (error) {
    console.error('Error sending GET request:', error);
  }
});

document.getElementById('logoutButton').addEventListener('click', async () => {
  try {
    // ログアウトリクエストを送信
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      window.location.href = 'index.html';
    } else {
      alert('Logout failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
