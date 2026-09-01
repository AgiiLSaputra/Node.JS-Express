const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Data disimpan di array (in-memory)
let todos = [];
let nextId = 1;

// GET /todos - Ambil semua todos
app.get("/todos", (req, res) => {
  res.json({
    success: true,
    data: todos,
    total: todos.length,
  });
});

// GET /todos/:id - Ambil satu todo by ID
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ success: false, message: "Todo not found" });
  }
  res.json({ success: true, data: todo });
});

// POST /todos - Buat todo baru
app.post("/todos", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  const newTodo = {
    id: nextId++,
    title,
    description: description || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  res.status(201).json({ success: true, data: newTodo });
});

// PUT /todos/:id - Update todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ success: false, message: "Todo not found" });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json({ success: true, data: todo });
});

// DELETE /todos/:id - Hapus todo
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Todo API running at http://localhost:${PORT}`);
});
