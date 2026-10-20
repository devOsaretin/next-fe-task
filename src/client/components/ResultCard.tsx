import { Box, Card, CardContent, Typography } from "@mui/material";
import type { SearchResult } from "../../types.ts";

function subtitle(result: SearchResult): string {
  if (result.kind === "musicArtist") {
    return result.genre ?? "Artist";
  }

  if (result.kind === "album") {
    const details = [result.artistName, result.genre].filter(Boolean);
    return details.join(" · ");
  }

  return [result.artistName, result.albumName].filter(Boolean).join(" · ");
}

export function ResultCard({ result }: { result: SearchResult }) {
  const artwork = result.kind === "musicArtist" ? null : result.artworkUrl;

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {artwork ? (
          <Box
            component="img"
            src={artwork}
            alt=""
            sx={{ width: 56, height: 56, objectFit: "cover" }}
          />
        ) : null}
        <Box>
          <Typography variant="subtitle1">{result.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle(result)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
