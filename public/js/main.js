async function loadPage(pageName) {
    const container = document.getElementById('appContainer');
    
    const response = await fetch(`pages/${pageName}.html`);
    const html = await response.text();
    
    container.innerHTML = html;

    switch(pageName) {
        case 'home':
            renderHomeCharts(); 
            break;
        case 'team':
            loadTeamList();
            break;
    }
}

const routes = {
    home: 'pages/home.html',
    expense: 'pages/expense.html',
    trips: 'pages/trips.html',
    analysis: 'pages/analysis.html',
    history: 'pages/history.html',
    team: 'pages/team.html',
    help: 'pages/help.html'
};

async function navigate() {
    const hash = window.location.hash.substring(1) || 'home'; 
    const container = document.getElementById('appContainer');
    
    try {
        const response = await fetch(routes[hash]);
        if (!response.ok) throw new Error('Sayfa bulunamadı');
        
        const html = await response.text();
        container.innerHTML = html;

        initPageFunctions(hash);
        
        updateActiveLink(hash);
        
    } catch (error) {
        container.innerHTML = '<h2>404 - Sayfa bulunamadı!</h2>';
        console.error('Yükleme hatası:', error);
    }
}

function initPageFunctions(page) {
    if (page === 'home') {
        console.log('Home grafikleri yükleniyor...');
    } else if (page === 'expense') {
        console.log('Expense tablosu hazır!');
    }
}

function updateActiveLink(hash) {
    document.querySelectorAll('header a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('hashchange', navigate);

window.addEventListener('DOMContentLoaded', navigate);