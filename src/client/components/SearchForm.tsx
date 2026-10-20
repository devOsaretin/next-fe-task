import { Box, Button, TextField } from "@mui/material";
import { useState, type SubmitEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { searchItunes } from "../store/searchThunks";

export function SearchForm() {
  const [term, setTerm] = useState("");
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.search.status);
  const isLoading = status === "loading";

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchItunes(term.trim()));
  };

  return (
    <Box
      component="form"
      aria-label="Search music"
      aria-busy={isLoading}
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, alignItems: "center", my: 3 }}>
      <TextField
        placeholder="Search music"
        variant="outlined"
        hiddenLabel
        fullWidth
        value={term}
        onChange={e => setTerm(e.target.value)}
        disabled={isLoading}
        autoFocus
        slotProps={{ htmlInput: { "aria-label": "Search music" } }}
        sx={{ bgcolor: "#fff" }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!term.trim() || isLoading}
        sx={{ minWidth: 104, height: 56 }}>
        {isLoading ? "Searching…" : "Search"}
      </Button>
    </Box>
  );
}
