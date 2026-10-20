import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { ResultList } from './components/ResultList.tsx'
import { SearchForm } from './components/SearchForm.tsx'
import { store } from './store/index.ts'

const theme = createTheme()

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="md" sx={{ py: 4 }}>
          <Typography component="h1" variant="h4">
            iTunes Search
          </Typography>
          <SearchForm />
          <ResultList />
        </Container>
      </ThemeProvider>
    </Provider>
  )
}
