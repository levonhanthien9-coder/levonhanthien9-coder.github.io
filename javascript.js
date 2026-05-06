// Khởi tạo tài khoản Admin mặc định nếu chưa có
if (!localStorage.getItem('user_admin')) {
    localStorage.setItem('user_admin', JSON.stringify({ name: 'Admin', pass: '123', balance: 999999999, role: 'admin' }));
}

let currentUser = null;

function showModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// Xử lý Đăng nhập
function handleLogin() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const storedData = localStorage.getItem('user_' + user);

    if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData.pass === pass) {
            currentUser = user;
            updateUI(userData);
            closeModal('login-modal');
        } else { alert("Sai mật khẩu!"); }
    } else {
        // Nếu chưa có thì tự động đăng ký cho tiện (Demo)
        const newUser = { name: user, pass: pass, balance: 0, role: 'user' };
        localStorage.setItem('user_' + user, JSON.stringify(newUser));
        currentUser = user;
        updateUI(newUser);
        closeModal('login-modal');
        alert("Đã tạo tài khoản mới!");
    }
}

// Cập nhật giao diện sau khi đăng nhập
function updateUI(data) {
    document.getElementById('user-tools').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('display-name').innerText = data.name;
    document.getElementById('display-balance').innerText = data.balance.toLocaleString();
    
    if (data.role === 'admin') {
        document.getElementById('admin-panel').style.display = 'block';
    }
}

// Chức năng của Admin: Cộng/Trừ tiền
function adjustMoney() {
    const target = document.getElementById('target-user').value;
    const amount = parseInt(document.getElementById('amount').value);
    const targetData = localStorage.getItem('user_' + target);

    if (targetData) {
        let userData = JSON.parse(targetData);
        userData.balance += amount;
        localStorage.setItem('user_' + target, JSON.stringify(userData));
        alert(`Đã cập nhật số dư cho ${target}. Số dư mới: ${userData.balance}`);
        if (currentUser === target) updateUI(userData); // Cập nhật ngay nếu admin tự cộng cho mình
    } else {
        alert("Không tìm thấy người dùng này!");
    }
}

function logout() {
    location.reload(); // Tải lại trang để xóa trạng thái tạm thời
}