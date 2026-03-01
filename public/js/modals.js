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

// EXPORT MODAL
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

// NEW EXPENSE FORM
function toggleNewExpenseModal() {
    const modal = document.getElementById('newExpenseModal');
    if (!modal) {
        console.error("Modal bulunamadı knk!");
        return;
    }

    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
    } else {
        const dateSpan = document.getElementById('exAutoDate');
        if (dateSpan) dateSpan.innerText = new Date().toLocaleDateString('tr-TR');
        modal.classList.add('active');
    }
}

// NEW TRİPS FORM
function toggleNewTripModal() {
    const modal = document.getElementById('newTripModal');
    if (!modal) return;
    modal.classList.toggle('active');
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

document.addEventListener('click', function(e) {
    if (e.target.closest('#exCreateExpense')) {
        toggleNewExpenseModal();
    }
});

// --- DIŞARIYA TIKLAYINCA KAPATMA ---
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('userDropdown');
    const profileArea = document.getElementById('headUserProfile');
    const modal = document.getElementById('tmLogModal');
    const addMember = document.getElementById("tmAddMemberModal");

    // Profil menüsü dışına tıklandıysa kapat
    if (dropdown && dropdown.classList.contains('active')) {
        if (!dropdown.contains(e.target) && !profileArea.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    }

    //Log model kapatma
    if (e.target == modal) {
        closeLogModal();
    }

    //Add member kapatma
    if (e.target == addMember) {
        closeAddMemberModal();
    }

    // Tema paneli dışına tıklanınca kapat
    if (e.target.id === 'themePanelOverlay') {
        toggleThemePanel();
    }

    if (e.target.closest('#quickLogout')) {
        alert("Session closed!");
    }
});

// LOG MODALS
function openLogModal(name, email) {
    const modal = document.getElementById('tmLogModal');
    if (name) document.getElementById('modalUserName').innerText = name;
    if (email) document.getElementById('modalUserEmail').innerText = email;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closeLogModal() {
    const modal = document.getElementById('tmLogModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ROLE MODALS
function openEditRoleModal(userName) {
    const modal = document.getElementById('tmEditRoleModal');
    if (userName) document.getElementById('editRoleTargetUser').innerText = userName;
    
    modal.style.display = 'flex';
}

function closeEditRoleModal() {
    document.getElementById('tmEditRoleModal').style.display = 'none';
}

// ADD MEMBER MODALS
function openAddMemberModal() {
    const modal = document.getElementById('tmAddMemberModal');
    document.getElementById('tmNewMemberId').value = '';
    modal.style.display = 'flex';
}

function closeAddMemberModal() {
    document.getElementById('tmAddMemberModal').style.display = 'none';
}

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

window.toggleNewExpenseModal = toggleNewExpenseModal;
window.toggleNewTripModal = toggleNewTripModal;

document.addEventListener('DOMContentLoaded', loadModals);