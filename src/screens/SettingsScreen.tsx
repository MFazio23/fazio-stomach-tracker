import {Button, Card, CardContent, CardHeader, Grid2 as Grid, Typography, useColorScheme} from '@mui/material';
import {Nightlight, WbSunny} from '@mui/icons-material';
import {auth} from '../firebase';

export function SettingsScreen() {

    const {mode, setMode} = useColorScheme();

    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }

    const signOutOfAccount = async () => {
        await auth.signOut()
    }

    return (
        <div>
            <Typography variant="h1">Settings</Typography>

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
                            <Button variant="contained" onClick={signOutOfAccount}>
                                Sign out
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
