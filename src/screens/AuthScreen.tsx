import {Box, Button, Typography} from '@mui/material';
import {getRedirectResult, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from '../firebase';

export function AuthScreen() {
    const provider = new GoogleAuthProvider();

    const handleSignInClicked = async () => {
        await signInWithPopup(auth, provider)

        const userCred = await getRedirectResult(auth);

        console.log("User cred", userCred)
    }

    return (
        <Box>
            <Typography variant="h2">Auth</Typography>
            {/*TODO: Make this look like a proper sign in button*/}
            <Button variant={'contained'} onClick={handleSignInClicked}>Sign in with Google</Button>
        </Box>
    );
}
