import './App.css'
import {Container} from '@mui/material';
import {AppView} from './AppView';

function App() {

    return (
        <Container id="main-container" sx={{display: 'flex', flexDirection: "column"}}>
            <AppView/>
        </Container>
    )
}

export default App
