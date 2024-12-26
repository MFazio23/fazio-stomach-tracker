import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid2 as Grid,
    Link,
    TextField,
    Typography,
    useColorScheme
} from '@mui/material';
import {Nightlight, WbSunny} from '@mui/icons-material';
import {getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect, User} from 'firebase/auth';
import {auth} from '../firebase';
import {useState} from 'react';

export interface SettingsScreenProps {
    currentUserId: string;
    setCurrentUserId: (userId: string) => void;
}

const provider = new GoogleAuthProvider();

export function SettingsScreen({currentUserId, setCurrentUserId}: SettingsScreenProps) {
    const [user, setUser] = useState<User | null>(null);
    const {mode, setMode} = useColorScheme();

    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }

    const signIntoAccount = async (method: 'popup' | 'redirect') => {
        try {
            if (method === 'popup') {
                await signInWithPopup(auth, provider).then((result) => {
                    console.log("popup result", result)
                    setUser(result.user)
                });
            } else {
                await signInWithRedirect(auth, provider)
                const result = await getRedirectResult(auth);
                if (result) {
                    console.log("redirect result", result)
                    // This is the signed-in user
                    const user = result.user;
                    setUser(user)
                } else {
                    console.error("No user found after redirect")
                }
            }
        } catch (e) {
            console.error("Error signing in", method, e)
        }
    }

    const signOutOfAccount = async () => {
        await auth.signOut()
    }

    return (
        <Box>
            <Typography variant="h2">Settings</Typography>

            <Grid container={true}
                  alignItems="center"
                  justifyContent="center">
                <Grid>
                    <Card sx={{width: 300, margin: 1}}>
                        <CardHeader title="Color mode"/>
                        <CardContent>
                            <Button variant="contained" onClick={toggleColorMode}
                                    startIcon={mode === 'light' ? <Nightlight/> : <WbSunny/>}>
                                Toggle color mode
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid>
                    <Card sx={{width: 300, margin: 1}}>
                        <CardHeader title="User ID"/>
                        <CardContent>
                            <TextField label="User ID" value={currentUserId}
                                       onChange={e => setCurrentUserId(e.target.value)}/>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid>
                    <Card sx={{width: 300, margin: 1}}>
                        <CardHeader title="Sign in"/>
                        <CardContent>
                            <Typography variant={'body2'}>
                                Current user: {user ? user.displayName : 'No user found'}
                            </Typography>
                            <Button variant="contained" onClick={() => signIntoAccount('popup')}>
                                Sign in (popup)
                            </Button>
                            <Button variant="contained" onClick={() => signIntoAccount('redirect')}>
                                Sign in (redirect)
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <Card sx={{width: 300, margin: 1}}>
                        <CardHeader title="Sign out"/>
                        <CardContent>
                            <Button variant="contained" onClick={signOutOfAccount}>
                                Sign out
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="subtitle2">
                <Link href="https://www.flaticon.com/free-icons/toilet" title="toilet icons">Toilet icons created by
                    Freepik - Flaticon</Link>
            </Typography>
        </Box>
    )
}
