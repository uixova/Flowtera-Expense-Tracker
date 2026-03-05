function handleFilePreview(input) {
    const beforeSelect = document.getElementById('beforeSelect');
    const afterSelect = document.getElementById('afterSelect');
    const previewIcon = document.getElementById('previewIcon');
    const previewFileName = document.getElementById('previewFileName');
    const wrapper = document.getElementById('uploadWrapper');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        previewFileName.innerText = file.name;
        
        // Görsel / PDF kontrolü
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewIcon.innerHTML = ''; 
                previewIcon.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        } else {
            // PDF veya diğer dökümanlar için 
            previewIcon.style.backgroundImage = 'none';
            previewIcon.innerHTML = '<i class="ti ti-file-text"></i>';
        }

        beforeSelect.style.display = 'none';
        afterSelect.style.display = 'flex';
        wrapper.style.borderColor = '#0ed45a';
    }
}

// Seçilen dosyayı temizleme
function removeSelectedFile(event) {
    event.stopPropagation(); 
    const input = document.getElementById('exInpReceipt');
    input.value = ''; 
    
    document.getElementById('beforeSelect').style.display = 'flex';
    document.getElementById('afterSelect').style.display = 'none';
    document.getElementById('uploadWrapper').style.borderColor = '#444';
}

// Sayfa Yönetimi: Navigasyon, Seçim, Oluşturma ve Ayarlar arası geçiş
function toggleTeamPages(target) {
    const mainNav = document.querySelector('.tm-nav');
    const teamGrid = document.getElementById('teamGrid');
    const selectionPage = document.getElementById('myTeamsSelectionPage');
    const createPage = document.getElementById('tmCreateTeamPage');
    const settingsPage = document.getElementById('tmSettingsPage');
    const listView = document.getElementById('tmListView');

    // 1. Tüm ekranları gizle
    const allElements = [mainNav, teamGrid, selectionPage, createPage, settingsPage, listView];
    allElements.forEach(el => {
        if (el) el.style.display = 'none';
    });

    switch (target) {
        case 'main':
            if (mainNav) mainNav.style.display = 'flex';
            if (teamGrid) teamGrid.style.display = 'grid';
            break;
        case 'create':
            if (createPage) createPage.style.display = 'block';
            break;
        case 'selection':
            if (selectionPage) selectionPage.style.display = 'block';
            break;
        case 'settings':
            if (settingsPage) settingsPage.style.display = 'block';
            break;
        case 'list':
            if (mainNav) mainNav.style.display = 'flex';
            if (listView) listView.style.display = 'block';
            break;
        default:
            if (mainNav) mainNav.style.display = 'flex';
            if (teamGrid) teamGrid.style.display = 'grid';
    }
    
    // Geçiş yapıldığında sayfayı en üste kaydır
    window.scrollTo(0, 0);
}

// Görsel Önizleme Fonksiyonu (Hem Create hem Settings için ortak)
function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImg = document.getElementById(previewId);
            if (previewImg) {
                previewImg.src = e.target.result;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// "Create Organization" için görsel önizleme
function previewTeamLogo(input) {
    previewImage(input, 'tmImagePreview');
}

// "Settings" için görsel önizleme
function previewSettingsLogo(input) {
    previewImage(input, 'tmSettingsImagePreview');
}

// Takım Silme Onayı
function confirmDeleteTeam() {
    const confirmAction = confirm("Are you sure you want to delete this team? This action cannot be undone.");
    if (confirmAction) {
        console.log("Team deleted.");
        toggleTeamPages('selection');
    }
}

function saveTeamSettings() {
    const teamName = document.getElementById('tmEditTeamName').value;
    console.log("Settings saved for:", teamName);
    
    alert("Settings updated successfully!");
    toggleTeamPages('main');
}
