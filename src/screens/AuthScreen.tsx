import {Box, Button, Typography} from '@mui/material';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from '../firebase';

export interface AuthScreenProps {
    onAuthError: (errorMessage: string, error?: Error) => void;
}

export function AuthScreen({onAuthError}: AuthScreenProps) {
    const provider = new GoogleAuthProvider();

    const handleSignInClicked = async () => {
        try {
            await signInWithPopup(auth, provider)
        } catch (e) {

            const error = e instanceof Error ? e : undefined;

            const errorMessage = error?.message ?? "Error signing in";

            onAuthError(errorMessage, error);
        }
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2" mb={3}>The Poop-A-Tron 3000</Typography>
            <img src="/poopatron-logo.svg" alt="Poop-A-Tron 3000 Logo" style={{width: 300}}/>
            {/*TODO: Make this look like a proper sign in button*/}
            <Button variant={'contained'} onClick={handleSignInClicked} sx={{width: 300, marginTop: 3}}>
                Sign in with Google
            </Button>
        </Box>
    );
}
