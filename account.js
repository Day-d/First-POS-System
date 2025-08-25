function openTab(evt, tabId) {
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      evt.currentTarget.classList.add('active');
    }

    function previewImage(event) {
      const file = event.target.files[0];
      const preview = document.getElementById('profilePreview');
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => preview.src = e.target.result;
        reader.readAsDataURL(file);
      }
    }

    function resetForm() {
      document.getElementById('fullName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('role').value = '';
      document.getElementById('password').value = '';
      document.getElementById('saveMessage').textContent = '';
    }

    function saveChanges() {
      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const role = document.getElementById('role').value;
      const pass = document.getElementById('password').value.trim();
      const messageBox = document.getElementById('saveMessage');

      if (!name || !email || !phone || !role || !pass) {
        messageBox.textContent = ' Please fill all fields.';
        messageBox.style.color = 'red';
        return;
      }

      messageBox.textContent = 'Account updated successfully!';
      messageBox.style.color = 'green';

      setTimeout(() => {
        messageBox.textContent = '';
      }, 3000);
    }

    function deactivateAccount(event) {
      event.preventDefault();
      const confirmPass = document.getElementById('deactivatePass').value.trim();
      const accountPass = document.getElementById('password').value.trim();
      const deactivateMsg = document.getElementById('deactivateMessage');

      if (!confirmPass) {
        deactivateMsg.textContent = ' Please enter your password.';
        deactivateMsg.style.color = 'red';
        return;
      }

      if (confirmPass !== accountPass) {
        deactivateMsg.textContent = ' Password does not match.';
        deactivateMsg.style.color = 'red';
        return;
      }

      deactivateMsg.textContent = 'Account deactivated successfully.';
      deactivateMsg.style.color = 'green';

      setTimeout(() => {
        deactivateMsg.textContent = '';
        document.getElementById('deactivatePass').value = '';
      }, 3000);
    }