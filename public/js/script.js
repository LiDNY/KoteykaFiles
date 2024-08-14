document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileList = document.getElementById('fileList');
    const settingsButton = document.getElementById('settingsButton');
    const settingsMenu = document.getElementById('settingsMenu');
    const languageSelect = document.getElementById('languageSelect');
    const previewModal = document.getElementById('previewModal');
    const previewContainer = document.getElementById('previewContainer');
    const closeModal = document.getElementById('closeModal');
    const downloadButton = document.getElementById('downloadButton');


    const translations = {
        en: {
            Header: "Koteyka's Files",
            title: "Koteyka's Files",
            uploadButton: "Upload",
            filesHeader: "Uploaded Files",
            settingsHeader: "Settings",
            selectLanguage: "Select Language:"
        },
        de: {
            Header: "Koteyka's Dateien",
            title: "Koteyka's Dateien",
            uploadButton: "Hochladen",
            filesHeader: "Hochgeladene Dateien",
            settingsHeader: "Einstellungen",
            selectLanguage: "Sprache wählen:"
        },
        ru: {
            Header: "Файлы Котейки",
            title: "Файлы Котейки",
            uploadButton: "Загрузить",
            filesHeader: "Загруженные файлы",
            settingsHeader: "Настройки",
            selectLanguage: "Выберите язык:"
        },
        el: {
            Header: "Τα αρχεία του Koteyka",
            title: "Τα αρχεία του Koteyka",
            uploadButton: "Μεταφόρτωση",
            filesHeader: "Μεταφορτωμένα Αρχεία",
            settingsHeader: "Ρυθμίσεις",
            selectLanguage: "Επιλέξτε Γλώσσα:"
        },
        cn: {
            Header: "科泰卡的檔案",
            title: "科泰卡的檔案",
            uploadButton: "上傳",
            filesHeader: "上傳的文件",
            settingsHeader: "設定",
            selectLanguage: "選擇語言:"
        },
        ar: {
            Header: "ملفات كوتيكا",
            title: "ملفات كوتيكا",
            uploadButton: "رفع",
            filesHeader: "الملفات المرفوعة",
            settingsHeader: "إعدادات",
            selectLanguage: "اختر اللغة:"
        }
    };

    settingsButton.addEventListener('click', () => {
        settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
    });

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        uploadForm.reset();
        loadFiles();
    });

    const loadFiles = async () => {
        const response = await fetch('/files');
        const files = await response.json();
        fileList.innerHTML = files.map(file => `
            <li>
                <a href="/files/${file}" data-file="${file}" class="file-link">${file}</a>
            </li>
        `).join('');
        
        document.querySelectorAll('.file-link').forEach(link => {
            link.addEventListener('click', handleFileClick);
        });
    };

    const handleFileClick = async (e) => {
        e.preventDefault();
        const fileUrl = e.target.href;
        const fileName = e.target.dataset.file;

        const response = await fetch(fileUrl);
        const contentType = response.headers.get('Content-Type');

        if (contentType.startsWith('image/')) {
            previewContainer.innerHTML = `<img src="${fileUrl}" alt="Preview" style="width: 100%; height: auto;">`;
            downloadButton.href = fileUrl;
            downloadButton.download = fileName;
        } else if (contentType.startsWith('video/')) {
            previewContainer.innerHTML = `<video controls style="width: 100%; height: auto;"><source src="${fileUrl}" type="${contentType}"></video>`;
            downloadButton.href = fileUrl;
            downloadButton.download = fileName;
        } else {
            window.location.href = fileUrl;
            return;
        }

        previewModal.style.display = 'flex';
    };

    closeModal.addEventListener('click', () => {
        previewModal.style.display = 'none';
    });

    document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', function (e) {
        const percent = Math.round((e.loaded / e.total) * 100);
        document.getElementById('progressBar').style.width = percent + '%';
        document.getElementById('progressPercent').textContent = percent + '%';
    });

    xhr.addEventListener('load', function () {
        document.getElementById('progressContainer').style.display = 'none';
        alert('Upload complete!');
        location.reload();
    });

    xhr.open('POST', '/upload', true);
    xhr.send(formData);

    document.getElementById('progressContainer').style.display = 'flex';
});


    const updateContent = (language) => {
        const lang = translations[language] || translations.en;
        document.querySelector('h1').textContent = lang.title;
        document.querySelector('form button').textContent = lang.uploadButton;
        document.querySelector('h2').textContent = lang.filesHeader;
        document.querySelector('title').textContent = lang.Header;
        document.querySelector('#settingsMenu h2').textContent = lang.settingsHeader;
        document.querySelector('#settingsMenu label').textContent = lang.selectLanguage;
    };

    updateContent('en');

    languageSelect.addEventListener('change', (e) => {
        updateContent(e.target.value);
    });

document.getElementById('reloadButton').addEventListener('click', function () {
    location.reload();
});

    
    loadFiles();
});
