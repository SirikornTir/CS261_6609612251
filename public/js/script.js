document.addEventListener('DOMContentLoaded', () => {
    const text = document.getElementById('text');
    const password = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password-checkbox');
    const submit = document.getElementById('submit');
    const role = document.getElementById('role');
    const loginContent = document.getElementById('login-content');

    // Toggle password visibility
    // showPasswordCheckbox.addEventListener('change', (event) => {
    //     password.type = event.target.checked ? 'text' : 'password';
    // });

    // Handle Login Submission
    submit.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent page reload

        // Capture values
        const textValue = text.value;
        const passwordValue = password.value;
        const roleValue = role.value;

        if (!roleValue) {
            alert("You DIDN'T Choose Your Role");
            return;
        }

        try {
            // Login Verification API Call
            const response = await axios.post('/api/v1/auth/Ad/verify', {
                UserName: textValue,
                PassWord: passwordValue,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const apiData = response.data;

            if (!apiData.status) {
                throw new Error(apiData.message);
            }

            displayUserInfo(apiData.data);

            // Send data to the backend to add student
            await axios.post("http://localhost:8080/api/students", {
                enName: apiData.data.displayname_en,
                email: apiData.data.email,
                faculty: apiData.data.faculty,
                type: apiData.data.type,
                userName: apiData.data.username,
                password: passwordValue
            }, {
                headers: {
                    'Application': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error:', error.message);
            alert(`An error occurred: ${error.message}`);
        }
    });

    const displayUserInfo = (userInfo) => {
        loginContent.innerHTML = '';

        const success = document.createElement('h1');
        success.classList.add('success');
        success.textContent = 'Successfully Logged In';
        loginContent.appendChild(success);

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        loginContent.appendChild(wrapper);

        const textElement = document.createElement('h1');
        textElement.classList.add('Text');
        textElement.textContent = `Name: ${userInfo.displayname_en}`;
        wrapper.appendChild(textElement);

        const emailElement = document.createElement('h1');
        emailElement.classList.add('Text');
        emailElement.textContent = `Email: ${userInfo.email}`;
        wrapper.appendChild(emailElement);

        if (userInfo.text) {
            const stdIDElement = document.createElement('h1');
            stdIDElement.classList.add('Text');
            stdIDElement.textContent = `Student ID: ${userInfo.text}`;
            wrapper.appendChild(stdIDElement);
        }

        if (userInfo.faculty) {
            const facultyElement = document.createElement('h1');
            facultyElement.classList.add('Text');
            facultyElement.textContent = `Faculty: ${userInfo.faculty}`;
            wrapper.appendChild(facultyElement);
        }

        if (userInfo.organization) {
            const orgElement = document.createElement('h1');
            orgElement.classList.add('Text');
            orgElement.textContent = `Organization: ${userInfo.organization}`;
            wrapper.appendChild(orgElement);
        }

        const roleElement = document.createElement('h1');
        roleElement.classList.add('Text');
        roleElement.textContent = `Your Role: ${userInfo.type}`;
        wrapper.appendChild(roleElement);

        const backBtn = document.createElement('button');
        backBtn.classList.add('back');
        backBtn.textContent = 'Log Out';
        backBtn.addEventListener('click', () => location.reload());
        loginContent.appendChild(backBtn);
    };

    document.querySelectorAll('.login-container').forEach(el => el.style.width = "450px");
});
