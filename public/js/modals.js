// --- TEMA PANELİ AÇ/KAPAT ---
function toggleThemePanel(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const overlay = document.getElementById('themePanelOverlay');
    const panel = document.getElementById('themePanel');

    if (!overlay || !panel) return;

    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
        overlay.classList.remove('active');
        setTimeout(() => { 
            overlay.style.display = 'none'; 
        }, 400); 
    } else {
        overlay.style.display = 'flex';
        setTimeout(() => { 
            overlay.classList.add('active');
            panel.classList.add('open'); 
        }, 10);
    }
}

// --- PROFİL MENÜSÜ AÇ/KAPAT ---
function toggleUserDropdown(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// --- EXPORT MODALI AÇ/KAPAT ---
function toggleExportModal() {
    const overlay = document.getElementById('exportModalOverlay');
    if (!overlay) return;

    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active');
    } else {
        const dateSpan = document.getElementById('exCurrentDate');
        if (dateSpan) {
            dateSpan.innerText = new Date().toLocaleDateString('tr-TR');
        }
        overlay.classList.add('active');
    }
}

// --- VERİ DIŞA AKTARMA İŞLEMİ ---
function handleExport() {
    const selectedInput = document.querySelector('input[name="exportFormat"]:checked');
    if (!selectedInput) return;

    const format = selectedInput.value;
    const btn = document.querySelector('.ex-btn.download');
    
    btn.innerHTML = '<i class="ti ti-loader-2 animate-spin"></i> Preparing...';

    setTimeout(() => {
        alert(format.toUpperCase() + " document successfully created!");
        btn.innerHTML = '<i class="ti ti-download"></i> Download';
        toggleExportModal();
    }, 1500);
}

// --- SAYFA DEĞİŞİNCE HER ŞEYİ KAPAT ---
window.addEventListener('hashchange', function() {
    // Dropdown kapat
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.remove('active');

    // Export modal kapat
    const exportModal = document.getElementById('exportModalOverlay');
    if (exportModal) exportModal.classList.remove('active');

    // Tema paneli kapat
    const panel = document.getElementById('themePanel');
    const overlay = document.getElementById('themePanelOverlay');
    if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
        overlay.classList.remove('active');
        setTimeout(() => { if(overlay) overlay.style.display = 'none'; }, 400);
    }
});

// --- DIŞARIYA TIKLAYINCA KAPATMA ---
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('userDropdown');
    const profileArea = document.getElementById('headUserProfile');

    // Profil menüsü dışına tıklandıysa kapat
    if (dropdown && dropdown.classList.contains('active')) {
        if (!dropdown.contains(e.target) && !profileArea.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    }

    // Tema paneli dışına tıklanınca kapat
    if (e.target.id === 'themePanelOverlay') {
        toggleThemePanel();
    }

    if (e.target.closest('#quickLogout')) {
        alert("Session closed!");
    }
});

// Tüm Modelleri Yükle
async function loadModals() {
    try {
        const response = await fetch('modals/modals.html'); 
        const html = await response.text();
        const modalContainer = document.createElement('div');
        modalContainer.id = 'dynamic-modal-container';
        modalContainer.innerHTML = html;
        document.body.appendChild(modalContainer);
    } catch (error) {
        console.error("Error loading modals:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadModals);