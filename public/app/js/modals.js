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
    const addMember = document.getElementById('tmAddMemberModal');
    const filterPopover = document.getElementById('filterPopover');
    const tmEditRoleModal = document.getElementById('tmEditRoleModal');

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

    //Filter modal
    if (e.target === filterPopover) {
        closeFilterPopover();
    }

    //Add member kapatma
    if (e.target == addMember) {
        closeAddMemberModal();
    }

    //Edit member
    if (e.target === tmEditRoleModal) {
        closeEditRoleModal();
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

// EXPENCE MODAL 
function openExDetailModal(data) {
    const modal = document.getElementById('exDetailModal');
    
    // HTML Elementlerini yakala
    const titleEl = document.getElementById('detExTitle');
    const categoryEl = document.getElementById('detExCategory');
    const amountEl = document.getElementById('detExAmount');
    const userEl = document.getElementById('detExUser');
    const descEl = document.getElementById('detExDesc');
    const imgEl = document.getElementById('detExImage');

    // Verileri doldur
    if (titleEl) titleEl.innerText = data.title || "Unknown Expense";
    if (categoryEl) categoryEl.innerText = `Category: ${data.category || "General"}`;
    if (amountEl) amountEl.innerText = data.amount || "$0.00";
    if (userEl) userEl.innerText = data.user || "Unknown User";
    if (descEl) descEl.innerText = data.desc || "No description provided.";
    
    // Resim varsa yükle, yoksa placeholder kalsın
    if (imgEl) {
        imgEl.src = data.image || "images/sample-receipt.png";
    }

    // Modalı göster
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Scroll kilitle
}

function closeExDetailModal() {
    const modal = document.getElementById('exDetailModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

function downloadReceipt(format) {
    const title = document.getElementById('detExTitle').innerText;
    alert(`${title} faturası ${format.toUpperCase()} formatında indiriliyor...`);
}

// FİLTER MODAL
let filterData = null;
const currentUser = { role: 'member', id: '123' };

function generateFilterHTML(pageType) {
    if (!filterData || !filterData[pageType]) return '<p>No filters found.</p>';

    let filters = filterData[pageType];

    //kullanıcı rolüne göre göster
    if (pageType === 'expense' && currentUser.role === 'member') {
        filters = filters.filter(f => f.id !== 'fUser'); 
    }

    return filterData[pageType].map(filter => {
        let html = `<div class="f-group"><label>${filter.label}</label>`;
        
        if (filter.type === "date-group") {
            html += `<div class="f-date-grid">
                        <input type="date" id="${filter.fields[0]}" title="Start Date">
                        <input type="date" id="${filter.fields[1]}" title="End Date">
                     </div>`;
        } 
        else if (filter.type === "select") {
            html += `<select id="${filter.id}">`;
            filter.options.forEach(opt => {
                html += `<option value="${opt.toLowerCase().replace(/ /g, '_')}">${opt}</option>`;
            });
            html += `</select>`;
        } 
        else if (filter.type === "range") {
            html += `<div class="f-date-grid">
                        <input type="number" id="${filter.fields[0]}" placeholder="Min">
                        <input type="number" id="${filter.fields[1]}" placeholder="Max">
                     </div>`;
        }
        
        html += `</div>`;
        return html;
    }).join('');
}

function closeFilterPopover() {
    document.getElementById('filterPopover').style.display = 'none';
}

async function toggleFilter(type, btn) {
    const popover = document.getElementById('filterPopover');
    const content = document.getElementById('filterDynamicContent');

    if (popover.style.display === 'flex') {
        popover.style.display = 'none';
        return;
    }

    // Veri henüz yüklenmediyse yükle
    if (!filterData) await loadFilterData();

    // Dinamik HTML'i bas
    content.innerHTML = generateFilterHTML(type);

    // Pozisyonlama
    const rect = btn.getBoundingClientRect();
    popover.style.display = 'flex';
    popover.style.top = (rect.bottom + window.scrollY + 10) + 'px';
    popover.style.left = (rect.left + window.scrollX - 250) + 'px';
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

window.addEventListener('mousedown', function(e) {
    const popover = document.getElementById('filterPopover');
    const filterBtn = document.querySelector('.ex-filter-cta'); 
    const historyBtn = document.querySelector('.hi-filter-btn');
    const tripsBtn = document.querySelector('.tr-filter-btn'); 

    if (popover && popover.style.display === 'flex') {
        
        const isClickInside = popover.contains(e.target);
        
        const isButtonClick = (filterBtn && filterBtn.contains(e.target)) || 
                             (historyBtn && historyBtn.contains(e.target)) ||
                             (tripsBtn && tripsBtn.contains(e.target));

        if (!isClickInside && !isButtonClick) {
            closeFilterPopover();
        }
    }
});

window.toggleNewExpenseModal = toggleNewExpenseModal;
window.toggleNewTripModal = toggleNewTripModal;
window.downloadReceipt = downloadReceipt;

document.addEventListener('DOMContentLoaded', loadModals);
document.addEventListener('DOMContentLoaded', loadFilterData);