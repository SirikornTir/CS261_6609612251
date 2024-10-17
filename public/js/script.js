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
            'Application-Key': 'TUae0d92800007fb4156131f410380b734f802c59072902cb431499ffa6829ed425d9e7aa77debb8197ac7d3e11d1978fb'
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