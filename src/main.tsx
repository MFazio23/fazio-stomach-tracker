import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {CssBaseline, ThemeProvider} from '@mui/material';
import { generateTheme } from './theme.ts';

const theme = generateTheme();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
