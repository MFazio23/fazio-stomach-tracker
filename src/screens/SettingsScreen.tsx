import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid2 as Grid,
    TextField,
    Typography,
    useColorScheme
} from '@mui/material';
import {Nightlight, WbSunny} from '@mui/icons-material';

export interface SettingsScreenProps {
    currentUserId: string;
    setCurrentUserId: (userId: string) => void;
}

export function SettingsScreen({currentUserId, setCurrentUserId}: SettingsScreenProps) {

    const {mode, setMode} = useColorScheme();

    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }

    /*const signOutOfAccount = async () => {
        await auth.signOut()
    }*/

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

                {/*<Grid>
                    <Card sx={{width: 300, margin: 1}}>
                        <CardHeader title="Sign out"/>
                        <CardContent>
                            <Button variant="contained" onClick={signOutOfAccount}>
                                Sign out
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>*/}
            </Grid>
        </Box>
    )
}
