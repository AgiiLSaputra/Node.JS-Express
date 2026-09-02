const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Mengisi data...");

  // Buat admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: adminPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log("Admin dibuat:", admin.email);

  // Buat user biasa
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: userPassword,
      name: "Pengguna Biasa",
      role: "USER",
    },
  });
  console.log("Pengguna biasa dibuat:", user.email);

  // Buat produk contoh
  const products = [
    {
      name: "Pola Desain Node.js",
      description: "Panduan lengkap pola desain untuk pengembangan aplikasi Node.js",
      price: 499000,
      stock: 20,
    },
    {
      name: "Belajar Express.js",
      description: "Tutorial Express.js dari dasar hingga mahir",
      price: 299000,
      stock: 30,
    },
    {
      name: "Panduan PostgreSQL",
      description: "Buku panduan lengkap menguasai database PostgreSQL",
      price: 399000,
      stock: 25,
    },
    {
      name: "JavaScript: Bagian yang Baik",
      description: "Buku klasik JavaScript karya Douglas Crockford",
      price: 349000,
      stock: 15,
    },
    {
      name: "Clean Code",
      description: "Panduan menulis kode bersih dan terstruktur",
      price: 449000,
      stock: 40,
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }
  console.log("Produk contoh dibuat");

  // Buat artikel blog contoh
  const posts = [
    {
      title: "Memulai dengan Node.js",
      content: "Node.js adalah runtime JavaScript yang dibangun di atas mesin V8 Chrome. Node.js memungkinkan kamu menjalankan JavaScript di server, bukan hanya di browser. Dengan Node.js, kamu bisa membuat aplikasi web, API, dan bahkan aplikasi desktop.",
      published: true,
      authorId: admin.id,
    },
    {
      title: "Pengenalan PostgreSQL",
      content: "PostgreSQL adalah sistem basis data relasional open source yang sangat powerful. PostgreSQL mendukung fitur-fitur canggih seperti JSON, pencarian full-text, dan replikasi. Cocok untuk aplikasi skala kecil hingga besar.",
      published: true,
      authorId: admin.id,
    },
    {
      title: "Perjalanan Belajar Saya",
      content: "Hari ini saya belajar tentang REST API dan koneksi basis data. Saya belajar cara membuat endpoint, menghubungkan database, dan mengelola autentikasi pengguna. Sangat menarik dan banyak hal yang dipelajari!",
      published: true,
      authorId: user.id,
    },
  ];

  for (const post of posts) {
    const existing = await prisma.post.findFirst({
      where: { title: post.title },
    });
    if (!existing) {
      await prisma.post.create({ data: post });
    }
  }
  console.log("Artikel blog contoh dibuat");

  console.log("\nPengisian data selesai!");
  console.log("\nAkun untuk testing:");
  console.log("Admin: admin@example.com / admin123");
  console.log("User:  user@example.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
