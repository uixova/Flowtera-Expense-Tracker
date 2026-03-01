// Team list page
function toggleTeamList() {
    const nav = document.querySelector('.tm-nav');
    const hr = document.querySelector('.team-page hr');
    const grid = document.getElementById('teamGrid');
    const selectionPage = document.getElementById('myTeamsSelectionPage');

    if (nav) nav.style.display = 'none';
    if (hr) hr.style.display = 'none';
    if (grid) grid.style.display = 'none';

    if (selectionPage) selectionPage.style.display = 'block';
}

function selectAndReturn(teamName) {
    const nav = document.querySelector('.tm-nav');
    const hr = document.querySelector('.team-page hr');
    const grid = document.getElementById('teamGrid');
    const selectionPage = document.getElementById('myTeamsSelectionPage');
    const h1 = document.querySelector('.tm-nav h1');

    if (h1) h1.innerText = teamName;

    if (selectionPage) selectionPage.style.display = 'none';

    if (nav) nav.style.display = 'flex';
    if (hr) hr.style.display = 'block';
    if (grid) grid.style.display = 'grid';
}