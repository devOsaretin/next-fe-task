import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../store";
import { ResultCard } from "./ResultCard.tsx";

export function ResultList() {
  const { results, status, term, error } = useAppSelector(state => state.search);
  const isLoading = status === "loading";

  return (
    <Box>
      {isLoading ? <LinearProgress sx={{ mb: 2 }} /> : null}
      {status === "failed" ? (
        <Typography color="error">{error ?? "Search failed. Try again."}</Typography>
      ) : null}
      {status === "succeeded" && results.length === 0 ? (
        <Typography>No results for “{term}”.</Typography>
      ) : null}
      <Stack spacing={1.5}>
        {results.map(result => (
          <ResultCard key={`${result.kind}-${result.id}`} result={result} />
        ))}
      </Stack>
    </Box>
  );
}
