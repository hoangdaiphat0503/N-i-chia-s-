// Lấy các element của Modal
const modal = document.getElementById("downloadModal");
const modalTitle = document.getElementById("modalTitle");
const downloadLink = document.getElementById("modalDownloadLink");

// Danh sách link tài liệu demo (Bạn có thể thay bằng link thật sau này)
const documentLinks = {
    'AI': 'https://drive.google.com/drive/folders/AI-Demo',
    'Cafe': 'https://drive.google.com/drive/folders/Cafe-Demo',
    'Crypto': 'https://drive.google.com/drive/folders/Crypto-Demo',
    'RealEstate': 'https://drive.google.com/drive/folders/RealEstate-Demo',
    'Ads': 'https://drive.google.com/drive/folders/Ads-Demo',
    'Watches': 'https://drive.google.com/drive/folders/Watches-Demo',
    'Running': 'https://drive.google.com/drive/folders/Running-Demo',
    'Quotes': 'https://drive.google.com/drive/folders/Quotes-Demo'
};

// Tên hiển thị trong Modal
const documentNames = {
    'AI': 'Tài Liệu Hệ Thống AI',
    'Cafe': 'Cẩm Nang Khởi Nghiệp Cafe',
    'Crypto': 'Kinh Nghiệm Thực Chiến Crypto',
    'RealEstate': 'Bí Quyết Sale Căn Hộ Dịch Vụ',
    'Ads': 'Hướng Dẫn Chạy Ads Cơ Bản',
    'Watches': 'Kiến Thức Đồng Hồ',
    'Running': 'Kỹ Thuật Chạy Bộ',
    'Quotes': 'Bộ Sưu Tập Trích Dẫn'
};

// Hàm mở Modal
function openModal(topicKey) {
    // Cập nhật tiêu đề và link dựa vào topic được chọn
    modalTitle.innerText = "Nhận " + documentNames[topicKey];
    downloadLink.href = documentLinks[topicKey];
    
    // Hiển thị modal
    modal.style.display = "flex";
}

// Hàm đóng Modal
function closeModal() {
    modal.style.display = "none";
}

// Đóng modal khi click ra ngoài vùng content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
