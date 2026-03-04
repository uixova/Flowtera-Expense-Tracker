async function loadFilterData() {
    try {
        const response = await fetch('data/filter.json');
        filterData = await response.json();
    } catch (error) {
        console.error("Filter JSON yüklenemedi:", error);
    }
}