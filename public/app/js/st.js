function showSettingsSection(sectionId) {
    const sections = document.querySelectorAll('.st-content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    const menuItems = document.querySelectorAll('.st-menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
        
        if (item.getAttribute('onclick').includes(sectionId)) {
            item.classList.add('active');
        }
    });
}

document.addEventListener('change', (e) => {
    if (e.target.id === 'avatarUpload') {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (f) => document.getElementById('stAvatarPreview').src = f.target.result;
            reader.readAsDataURL(file);
        }
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest('#btnRemoveAvatar')) {
        document.getElementById('stAvatarPreview').src = 'images/user-profile.png';
        document.getElementById('avatarUpload').value = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    showSettingsSection('st-profile');
});