import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { ResultCard } from "./ResultCard.tsx";
import { useEffect, useRef } from "react";
import { showMore } from "../store/searchSlice.ts";

export function ResultList() {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { results, status, term, visibleResultsCount, hasMore } =
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

  const visibleResults = results.slice(0, visibleResultsCount);

  return (
    <Box>
      {isLoading ? <LinearProgress aria-label="Searching" sx={{ mb: 2 }} /> : null}
      {status === "failed" ? (
        <Typography role="status" color="error">
          Search failed. Try again.
        </Typography>
      ) : null}
      {status === "succeeded" && results.length === 0 ? (
        <Typography role="status">No results for “{term}”.</Typography>
      ) : null}
      {visibleResults.length > 0 ? (
        <Stack
          component="ul"
          aria-label={term ? `Search results for ${term}` : "Search results"}
          spacing={1.5}
          sx={{ listStyle: "none", m: 0, p: 0 }}
        >
          {visibleResults.map(result => (
            <Box
              key={`${result.kind}-${result.id}`}
              component="li"
              sx={{ listStyle: "none" }}
            >
              <ResultCard result={result} />
            </Box>
          ))}
        </Stack>
      ) : null}
      {hasMore ? (
        <Box ref={ref} aria-hidden sx={{ height: 1, width: "100%" }} />
      ) : null}
    </Box>
  );
}
