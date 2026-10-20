import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { ResultCard } from "./ResultCard.tsx";
import { useEffect, useRef } from "react";
import { showMore } from "../store/searchSlice.ts";

export function ResultList() {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { results, status, term, error, visibleResultsCount, hasMore } =
    useAppSelector(state => state.search);
  const isLoading = status === "loading";

  const requestedCount = useRef(-1);

  useEffect(() => {
    requestedCount.current = -1;
  }, [results]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !hasMore || status !== "succeeded") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (requestedCount.current === visibleResultsCount) return;
      requestedCount.current = visibleResultsCount;
      dispatch(showMore());
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, status, visibleResultsCount, dispatch]);

  return (
    <Box>
      {isLoading ? <LinearProgress sx={{ mb: 2 }} /> : null}
      {status === "failed" ? (
        <Typography color="error">
          {error ?? "Search failed. Try again."}
        </Typography>
      ) : null}
      {status === "succeeded" && results.length === 0 ? (
        <Typography>No results for “{term}”.</Typography>
      ) : null}
      <Stack spacing={1.5}>
        {results.slice(0, visibleResultsCount).map(result => (
          <ResultCard key={`${result.kind}-${result.id}`} result={result} />
        ))}
      </Stack>
      <Stack
        ref={ref}
        style={{ height: 1, width: "100%" }}
        aria-hidden="true"></Stack>
    </Box>
  );
}
