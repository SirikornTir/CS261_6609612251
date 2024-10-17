function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginData = {};
    loginData.UserName = username;
    loginData.PassWord = password;
    var jsonData = JSON.stringify(loginData); 
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
         method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUa7110a94484554d8a529ad3eb1438f4d1b07d08b86946c3b8a07faa1c56efdc7061e2be45ca8c1d6380e08f1df7d135d'
        },
        body: jsonData,
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('message');
        resultDiv.innerHTML = `
            <p><strong>Status :</strong> ${data.status ? 'Success' : 'Failed'}</p>
            <p><strong>Name :</strong> ${data.displayname_en || 'N/A'}</p>
            <p><strong>Username :</strong> ${data.username|| 'N/A'}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        const resultDiv = document.getElementById('message');
        resultDiv.innerHTML = '<p>Error fetching data. Please try again.</p>';
    });
}