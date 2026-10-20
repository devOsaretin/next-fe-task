import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { ResultList } from './components/ResultList.tsx'
import { SearchForm } from './components/SearchForm.tsx'
import { store } from './store/index.ts'

const theme = createTheme({
  palette: {
    background: { default: "#f5f5f5" },
    text: { primary: "#171717" },
    primary: { main: "#171717" },
    divider: "#e4e4e4",
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "system-ui, sans-serif",
    h4: { fontSize: "1.75rem", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundColor: "#fff", borderColor: "#e4e4e4" },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: 16, "&:last-child": { paddingBottom: 16 } },
      },
    },
  },
})

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ py: { xs: 4, sm: 6 } }}>
          <Typography component="h1" variant="h4">
            iTunes Search
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Artists, albums and songs
          </Typography>
          <SearchForm />
          <ResultList />
        </Container>
      </ThemeProvider>
    </Provider>
  )
}
