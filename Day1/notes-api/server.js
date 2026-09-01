const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// JSON file sebagai "database"
const dbPath = path.join(__dirname, "notes.json");

// Helper: baca data dari file
function readNotes() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "[]", "utf8");
  }
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

// Helper: simpan data ke file
function saveNotes(notes) {
  fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2), "utf8");
}

// GET /notes - Ambil semua notes (bisa filter by category & search)
app.get("/notes", (req, res) => {
  let notes = readNotes();
  const { category, search } = req.query;

  // Filter by category
  if (category) {
    notes = notes.filter(
      (n) => n.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search by title atau content
  if (search) {
    const keyword = search.toLowerCase();
    notes = notes.filter(
      (n) =>
        n.title.toLowerCase().includes(keyword) ||
        n.content.toLowerCase().includes(keyword)
    );
  }

  res.json({ success: true, data: notes, total: notes.length });
});

// GET /notes/:id - Ambil satu note
app.get("/notes/:id", (req, res) => {
  const notes = readNotes();
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }
  res.json({ success: true, data: note });
});

// POST /notes - Buat note baru
app.post("/notes", (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  const notes = readNotes();
  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title,
    content,
    category: category || "umum",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes.push(newNote);
  saveNotes(notes);

  res.status(201).json({ success: true, data: newNote });
});

// PUT /notes/:id - Update note
app.put("/notes/:id", (req, res) => {
  const notes = readNotes();
  const index = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  const { title, content, category } = req.body;

  if (title !== undefined) notes[index].title = title;
  if (content !== undefined) notes[index].content = content;
  if (category !== undefined) notes[index].category = category;
  notes[index].updatedAt = new Date().toISOString();

  saveNotes(notes);
  res.json({ success: true, data: notes[index] });
});

// DELETE /notes/:id - Hapus note
app.delete("/notes/:id", (req, res) => {
  const notes = readNotes();
  const index = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  const deleted = notes.splice(index, 1);
  saveNotes(notes);
  res.json({ success: true, data: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Notes API running at http://localhost:${PORT}`);
});
