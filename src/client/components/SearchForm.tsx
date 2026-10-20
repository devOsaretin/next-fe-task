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
    console.log(term);
    dispatch(searchItunes(term.trim()));
  };

  return (
    <Box
      component="form"
      aria-label="Search music"
      aria-busy={isLoading}
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, my: 4 }}>
      <TextField
        label="Search music"
        variant="outlined"
        fullWidth
        value={term}
        onChange={e => setTerm(e.target.value)}
        disabled={isLoading}
        autoFocus
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!term.trim() || isLoading}
        sx={{ minWidth: 120 }}>
        {isLoading ? "Searching…" : "Search"}
      </Button>
    </Box>
  );
}
