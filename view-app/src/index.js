document.getElementById('loginButton').addEventListener('click', async () => {
  try {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    // ログインリクエストを送信
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      window.location.href = 'main.html';
    } else {
      alert('Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});