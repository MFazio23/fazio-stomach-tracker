import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid2 as Grid,
    Link,
    Typography,
    useColorScheme
} from '@mui/material';
import {Nightlight, WbSunny} from '@mui/icons-material';
import {User} from 'firebase/auth';
import {auth} from '../firebase';

export interface SettingsScreenProps {
    currentUser: User;
}

export function SettingsScreen({currentUser}: SettingsScreenProps) {
    const {mode, setMode} = useColorScheme();

    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
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
                        <CardHeader title="Sign out"/>
                        <CardContent>
                            <Typography variant="body2" mb={2}>You are signed in
                                as {currentUser?.displayName ?? "Unknown user"}.</Typography>
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
