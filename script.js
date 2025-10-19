// Data produk kosmetik
const produk = [
  { id: 1, nama: "Lipstik Matte", harga: 45000, gambar: "gambar/images.jpeg" },
  { id: 2, nama: "Bedak Tabur", harga: 60000, gambar: "gambar/bedak.jpg" },
  { id: 3, nama: "Maskara Volume", harga: 35000, gambar: "gambar/maskara.jpg" },
  { id: 4, nama: "Serum Wajah", harga: 180000, gambar: "gambar/serum.png" },
  { id: 5, nama: "Blush On", harga: 25000, gambar: "gambar/blush.png" },
];

// Inisialisasi keranjang
let keranjang = [];

// Tampilkan produk ke halaman
const daftarProduk = document.getElementById("daftar-produk");
produk.forEach(item => {
  const div = document.createElement("div");
  div.className = "produk-item";
  div.innerHTML = `
    <img src="${item.gambar}" alt="${item.nama}">
    <h3>${item.nama}</h3>
    <p>Rp ${item.harga.toLocaleString()}</p>
    <button onclick="tambahKeKeranjang(${item.id})">Tambah</button>
  `;
  daftarProduk.appendChild(div);
});

// Tambah ke keranjang
function tambahKeKeranjang(id) {
  const produkDipilih = produk.find(p => p.id === id);
  keranjang.push(produkDipilih);
  renderKeranjang();
}

// Render keranjang
function renderKeranjang() {
  const keranjangDiv = document.getElementById("keranjang-item");
  keranjangDiv.innerHTML = "";

  let total = 0;
  keranjang.forEach((item, index) => {
    total += item.harga;
    const div = document.createElement("div");
    div.className = "keranjang-item";
    div.innerHTML = `
      <span>${item.nama}</span>
      <span>Rp ${item.harga.toLocaleString()}</span>
      <button onclick="hapusItem(${index})">❌</button>
    `;
    keranjangDiv.appendChild(div);
  });

  document.getElementById("totalHarga").textContent = "Rp " + total.toLocaleString();
}

// Hapus item dari keranjang
function hapusItem(index) {
  keranjang.splice(index, 1);
  renderKeranjang();
}

// Kosongkan keranjang
document.getElementById("clearBtn").addEventListener("click", () => {
  keranjang = [];
  renderKeranjang();
});

// Tombol lanjut pembayaran
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  // Tampilkan form checkout
  document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
});

// Proses form checkout
document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const nama = document.getElementById("nama").value;
  const telepon = document.getElementById("telepon").value;
  const alamat = document.getElementById("alamat").value;
  const metode = document.getElementById("metode").value;

  // Hitung total harga
  const totalHarga = keranjang.reduce((sum, item) => sum + item.harga, 0);

  // Buat struk pembelian
  let struk = `
==============================
      💄 TOKO KOSMETIK SUCI
==============================
Nama Pembeli : ${nama}
No. Telepon  : ${telepon}
Alamat       : ${alamat}
Metode Bayar : ${metode}
------------------------------
Daftar Belanja:
`;

  keranjang.forEach((item, i) => {
    struk += `${i + 1}. ${item.nama} - Rp ${item.harga.toLocaleString()}\n`;
  });

  struk += `
------------------------------
Total Bayar  : Rp ${totalHarga.toLocaleString()}
==============================
Terima kasih telah berbelanja 💖
Pesanan Anda sedang diproses.
==============================
`;

  // Tampilkan struk ke pengguna
  alert(struk);

  // Reset keranjang dan form
  keranjang = [];
  renderKeranjang();
  e.target.reset();
});
