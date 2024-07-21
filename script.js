// 전역 함수 정의 (삭제)
window.loadComplaints = (username) => {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
    const userComplaints = complaints[username] || [];
    const complaintList = document.getElementById('complaintListItems');
    complaintList.innerHTML = '';
    userComplaints.forEach((complaint, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Title:</strong> ${complaint.title} <br>
            <strong>Description:</strong> ${complaint.description} <br>
            <strong>Status:</strong> ${complaint.status || '접수완료'} <br>
            <button onclick="editComplaint(${index})">Edit</button>
            <button onclick="deleteComplaint('${username}', ${index})">Delete</button>
        `;
        complaintList.appendChild(li);
    });
};

window.editComplaint = (index) => {
    const username = sessionStorage.getItem('loggedInUser');
    if (username) {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
        const userComplaints = complaints[username] || [];
        const complaint = userComplaints[index];
        if (complaint) {
            document.getElementById('title').value = complaint.title;
            document.getElementById('description').value = complaint.description;
            complaintForm.addEventListener('submit', function onFormSubmit(event) {
                event.preventDefault();
                const updatedTitle = document.getElementById('title').value;
                const updatedDescription = document.getElementById('description').value;
                userComplaints[index] = { title: updatedTitle, description: updatedDescription, status: complaint.status };
                complaints[username] = userComplaints;
                localStorage.setItem('complaints', JSON.stringify(complaints));
                loadComplaints(username);
                complaintForm.reset();
                complaintForm.removeEventListener('submit', onFormSubmit);
            });
        }
    }
};

window.deleteComplaint = (username, index) => {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
    const userComplaints = complaints[username] || [];
    userComplaints.splice(index, 1);
    if (userComplaints.length > 0) {
        complaints[username] = userComplaints;
    } else {
        delete complaints[username];
    }
    localStorage.setItem('complaints', JSON.stringify(complaints));
    loadComplaints(username);
};



// 전역으로 함수 정의 (수정)
window.editComplaint = (index) => {
    const username = sessionStorage.getItem('loggedInUser');
    if (username) {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
        const userComplaints = complaints[username] || [];
        const complaint = userComplaints[index];
        if (complaint) {
            document.getElementById('title').value = complaint.title;
            document.getElementById('description').value = complaint.description;
            complaintForm.addEventListener('submit', function onFormSubmit(event) {
                event.preventDefault();
                const updatedTitle = document.getElementById('title').value;
                const updatedDescription = document.getElementById('description').value;
                userComplaints[index] = { title: updatedTitle, description: updatedDescription, status: complaint.status };
                complaints[username] = userComplaints;
                localStorage.setItem('complaints', JSON.stringify(complaints));
                loadComplaints(username);
                complaintForm.reset();
                complaintForm.removeEventListener('submit', onFormSubmit);
            });
        }
    }
};

window.deleteComplaint = (username, index) => {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
    const userComplaints = complaints[username] || [];
    userComplaints.splice(index, 1);
    if (userComplaints.length > 0) {
        complaints[username] = userComplaints;
    } else {
        delete complaints[username];
    }
    localStorage.setItem('complaints', JSON.stringify(complaints));
    loadComplaints(username);
};

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const complaintForm = document.getElementById('complaintForm');
    const complaintList = document.getElementById('complaintListItems');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const postComplaint = document.getElementById('postComplaint');
    const complaintLink = document.getElementById('complaintLink');
    const adminLink = document.getElementById('adminLink');
    const allComplaintsList = document.getElementById('allComplaintsList');


    const adminUsername = 'admin'; // 관리자 계정
    const adminPassword = 'admin123'; // 관리자 계정 비밀번호

    const checkLoginStatus = () => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            if (welcomeMessage) {
                welcomeMessage.innerText = `Welcome, ${loggedInUser}`;
            }
            if (logoutLink) {
                logoutLink.style.display = 'block';
            }
            if (registerLink) {
                registerLink.style.display = 'none';
            }
            if (loginLink) {
                loginLink.style.display = 'none';
            }
            if (postComplaint) {
                postComplaint.style.display = 'block';
            }
            if (complaintLink) {
                complaintLink.style.display = 'block';
            }
            if (loggedInUser === adminUsername) {
                if (adminLink) {
                    adminLink.style.display = 'block';
                }
                loadAllComplaints();
            } else {
                if (adminLink) {
                    adminLink.style.display = 'none';
                }
                
                loadComplaints(loggedInUser);
            }
        } else {
            if (welcomeMessage) {
                welcomeMessage.innerText = 'Please register or login to file a complaint.';
            }
            if (logoutLink) {
                logoutLink.style.display = 'none';
            }
            if (registerLink) {
                registerLink.style.display = 'block';
            }
            if (loginLink) {
                loginLink.style.display = 'block';
            }
            if (postComplaint) {
                postComplaint.style.display = 'none';
            }
            if (complaintLink) {
                complaintLink.style.display = 'none';
            }
            if (adminLink) {
                adminLink.style.display = 'none';
            }
           
        }
    };

    const loadComplaints = (username) => {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
        const userComplaints = complaints[username] || [];
        complaintList.innerHTML = '';
        userComplaints.forEach((complaint, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Title:</strong> ${complaint.title} <br>
                <strong>Description:</strong> ${complaint.description} <br>
                <strong>Status:</strong> ${complaint.status || '접수완료'} <br>
                <button onclick="editComplaint(${index})">Edit</button>
                <button onclick="deleteComplaint('${username}', ${index})">Delete</button>
            `;
            complaintList.appendChild(li);
        });
    };

    const deleteComplaint = (username, index) => {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
        const userComplaints = complaints[username] || [];
        userComplaints.splice(index, 1);
        if (userComplaints.length > 0) {
            complaints[username] = userComplaints;
        } else {
            delete complaints[username];
        }
        localStorage.setItem('complaints', JSON.stringify(complaints));
        loadComplaints(username);
    };

    const updateComplaintStatus = (username, index, status) => {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
        const userComplaints = complaints[username] || [];
        userComplaints[index].status = status;
        complaints[username] = userComplaints;
        localStorage.setItem('complaints', JSON.stringify(complaints));
        loadAllComplaints();
    };

    const loadAllComplaints = () => {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
        if (allComplaintsList) {
            allComplaintsList.innerHTML = '';
            Object.keys(complaints).forEach((username) => {
                complaints[username].forEach((complaint, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>User:</strong> ${username} <br>
                        <strong>Title:</strong> ${complaint.title} <br>
                        <strong>Description:</strong> ${complaint.description} <br>
                        <strong>Status:</strong> ${complaint.status || '접수완료'} <br>
                    `;

                    const statusSelect = document.createElement('select');
                    const statuses = ['접수완료', '진행중', '완료'];
                    statuses.forEach(status => {
                        const option = document.createElement('option');
                        option.value = status;
                        option.textContent = status;
                        if (complaint.status === status) {
                            option.selected = true;
                        }
                        statusSelect.appendChild(option);
                    });
                    statusSelect.addEventListener('change', () => {
                        updateComplaintStatus(username, index, statusSelect.value);
                    });

                    li.appendChild(statusSelect);
                    allComplaintsList.appendChild(li);
                });
            });
        }
    };

    const editComplaint = (index) => {
        const username = sessionStorage.getItem('loggedInUser');
        if (username) {
            const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
            const userComplaints = complaints[username] || [];
            const complaint = userComplaints[index];
            if (complaint) {
                document.getElementById('title').value = complaint.title;
                document.getElementById('description').value = complaint.description;
                complaintForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const updatedTitle = document.getElementById('title').value;
                    const updatedDescription = document.getElementById('description').value;
                    userComplaints[index] = { title: updatedTitle, description: updatedDescription, status: complaint.status };
                    complaints[username] = userComplaints;
                    localStorage.setItem('complaints', JSON.stringify(complaints));
                    loadComplaints(username);
                    complaintForm.reset();
                }, { once: true });
            }
        }
    };

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            localStorage.setItem(username, password);
            alert('Registration successful!');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            if (username === adminUsername && password === adminPassword) {
                sessionStorage.setItem('loggedInUser', username);
                alert('Admin login successful!');
                window.location.href = 'admin.html'; // 관리자 페이지로 리다이렉트
            } else {
                const storedPassword = localStorage.getItem(username);
                if (storedPassword && storedPassword === password) {
                    sessionStorage.setItem('loggedInUser', username);
                    alert('Login successful!');
                    window.location.href = 'index.html';
                } else {
                    alert('Invalid username or password!');
                }
            }
        });
    }
    

    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            sessionStorage.removeItem('loggedInUser');
            alert('Logged out!');
            window.location.href = 'index.html';
        });
    }

    if (complaintForm) {
        complaintForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const username = sessionStorage.getItem('loggedInUser');
            if (username) {
                const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
                const userComplaints = complaints[username] || [];
                userComplaints.push({ title, description, status: '접수완료' });
                complaints[username] = userComplaints;
                localStorage.setItem('complaints', JSON.stringify(complaints));
                loadComplaints(username);
                alert('Complaint submitted successfully!');
                complaintForm.reset();
            } else {
                alert('You must be logged in to submit a complaint.');
            }
        });
    }

    checkLoginStatus();
});
