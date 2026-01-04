const showButton = document.getElementById('showButton');
const usersContainer = document.getElementById('usersContainer');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

showButton.addEventListener('click', async () => {
    showButton.disabled = true;
    showButton.textContent = 'იტვირთება...';
    
    usersContainer.innerHTML = '';
    errorDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
    loadingDiv.textContent = 'იტვირთება...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();

        loadingDiv.style.display = 'none';

        if (users.length === 0) {
            usersContainer.innerHTML = '<div class="error">მომხმარებლები არ მოიძებნა</div>';
        } else {
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card';
                userCard.innerHTML = `
                    <div class="user-name">${user.name}</div>
                    <div class="user-info"><strong>მომხმარებელი:</strong> ${user.username}</div>
                    <div class="user-info"><strong>ელ. ფოსტა:</strong> ${user.email}</div>
                    <div class="user-info"><strong>ტელეფონი:</strong> ${user.phone}</div>
                    <div class="user-info"><strong>ვებ-საიტი:</strong> ${user.website}</div>
                    <div class="user-info"><strong>მისამართი:</strong> ${user.address.street}, ${user.address.city}</div>
                    <div class="user-info"><strong>კომპანია:</strong> ${user.company.name}</div>
                `;
                usersContainer.appendChild(userCard);
            });
        }

    } catch (error) {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = `შეცდომა: ${error.message}`;
    } finally {
        showButton.disabled = false;
        showButton.textContent = 'ჩვენება';
    }
});

