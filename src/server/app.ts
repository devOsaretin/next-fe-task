import express from "express";
import { searchItunes } from "./itunes.ts";

export const app = express();

app.get("/api/search", async (req, res) => {
  const term = req.query.term;

  if (typeof term !== "string" || term.trim() === "") {
    return res.status(400).json({ error: "Search term is required" });
  }

  try {
    const results = await searchItunes(term.trim());
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: "Search failed or service unavailable" });
  }
});
