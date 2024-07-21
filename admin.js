document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logoutLink');
    const allComplaintsList = document.getElementById('allComplaintsList');
    
    const adminUsername = 'admin'; // 관리자 계정
    const adminPassword = 'admin123'; // 관리자 계정 비밀번호


    const checkAdminLogin = () => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser !== adminUsername) {
            alert('Access denied!');
            window.location.href = 'login.html';
        } else {
            loadAllComplaints();

        }
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

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        deleteComplaint(username, index);
                    });

                    li.appendChild(statusSelect);
                    li.appendChild(deleteButton);
                    allComplaintsList.appendChild(li);
                });
            });
        }
    };

    const updateComplaintStatus = (username, index, status) => {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
        const userComplaints = complaints[username] || [];
        userComplaints[index].status = status;
        complaints[username] = userComplaints;
        localStorage.setItem('complaints', JSON.stringify(complaints));
        loadAllComplaints();
    };

    const deleteComplaint = (username, index) => {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '{}');
        const userComplaints = complaints[username] || [];
        userComplaints.splice(index, 1);
        if (userComplaints.length > 0) {
            complaints[username] = userComplaints;
        } else {
            delete complaints[username]; // If no complaints are left for this user, remove the user
        }
        localStorage.setItem('complaints', JSON.stringify(complaints));
        loadAllComplaints();
    };



    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            sessionStorage.removeItem('loggedInUser');
            alert('Logged out!');
            window.location.href = 'login.html';
        });
    }

    checkAdminLogin();
});
