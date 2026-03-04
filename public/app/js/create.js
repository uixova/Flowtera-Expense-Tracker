function handleFilePreview(input) {
    const beforeSelect = document.getElementById('beforeSelect');
    const afterSelect = document.getElementById('afterSelect');
    const previewIcon = document.getElementById('previewIcon');
    const previewFileName = document.getElementById('previewFileName');
    const wrapper = document.getElementById('uploadWrapper');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        previewFileName.innerText = file.name;
        
        // Görsel mi yoksa PDF mi kontrolü
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewIcon.innerHTML = ''; // İkonu temizle
                previewIcon.style.backgroundImage = `url(${e.target.result})`;
            };
            reader.readAsDataURL(file);
        } else {
            // PDF veya diğer dökümanlar için ikon göster
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
    event.stopPropagation(); // Tıklamanın dışa (input açmaya) yayılmasını engelle
    const input = document.getElementById('exInpReceipt');
    input.value = ''; // Inputu temizle
    
    document.getElementById('beforeSelect').style.display = 'flex';
    document.getElementById('afterSelect').style.display = 'none';
    document.getElementById('uploadWrapper').style.borderColor = '#444';
}