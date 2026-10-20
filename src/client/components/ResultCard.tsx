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
            alt={result.name}
            sx={{ width: 48, height: 48, objectFit: "cover", borderRadius: 1, flexShrink: 0 }}
          />
        ) : null}
        <Box>
          <Typography component="p" variant="subtitle1" sx={{ m: 0, fontWeight: 600 }}>
            {result.name}
          </Typography>
          <Typography component="p" variant="body2" color="text.secondary" sx={{ m: 0 }}>
            {subtitle(result)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
