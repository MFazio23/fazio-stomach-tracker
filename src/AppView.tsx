import {Box, Paper, Snackbar} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';
import {BottomNav} from './BottomNav';
import {TrackerScreen} from './screens/TrackerScreen';
import {SettingsScreen} from './screens/SettingsScreen';
import {CalendarScreen} from './screens/CalendarScreen';
import {TabName} from './types/TabName';
import {Food} from './types/Food';
import dayjs, {Dayjs} from 'dayjs';
import {auth, getTrackingDataForDay, saveTrackingDataForDay} from './firebase';
import {AuthScreen} from './screens/AuthScreen';
import {User} from 'firebase/auth';

export function AppView() {
    const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
    const [currentTab, setCurrentTab] = useState<TabName>('tracker');
    const [currentDate, setCurrentDate] = useState<Dayjs | null>(dayjs());
    const [foodEaten, setFoodEaten] = useState<Food | null>(null);
    const [otherFood, setOtherFood] = useState<string | null>(null);
    const [urgency, setUrgency] = useState(0);
    const [consistency, setConsistency] = useState(0);
    const [mealBathroomTime, setMealBathroomTime] = useState(0);
    const [hadCaffeine, setHadCaffeine] = useState(false);
    const [notes, setNotes] = useState('');

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            console.log("Firebase user", user);
        });
    }, []);

    const handleDateChange = (newDate: Dayjs | null) => {
        setCurrentDate(newDate);
    }

    //TODO: Save all these to Firebase
    const handleChangeCurrentTab = (value: TabName) => {
        setCurrentTab(value);
    }

    const handleFoodEatenChange = (newFoodEaten: Food) => {
        setFoodEaten(newFoodEaten);
    }

    const handleOtherFoodChange = (newOtherFood: string) => {
        setOtherFood(newOtherFood);
    }

    const handleUrgencyChange = (newUrgency: number) => {
        setUrgency(newUrgency);
    }

    const handleConsistencyChange = (newConsistency: number) => {
        setConsistency(newConsistency);
    }

    const handleMealBathroomTimeChange = (newMealBathroomTime: number) => {
        setMealBathroomTime(newMealBathroomTime);
    }

    const handleCaffeineChange = (newCaffeine: boolean) => {
        setHadCaffeine(newCaffeine);
    }

    const handleNotesChange = (newNotes: string) => {
        setNotes(newNotes);
    }

    const handleSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setIsSnackbarOpen(true);
    }

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    }

    const handleSave = async () => {
        const dayTracking = {
            foodEatenId: foodEaten?.id ?? '',
            otherFood,
            urgency,
            consistency,
            mealBathroomTime,
            hadCaffeine,
            notes,
        }

        if (currentDate != null) {
            try {
                if (!currentUser) return;
                await saveTrackingDataForDay(currentUser.uid, currentDate.format("YYYY-MM-DD"), dayTracking);
                handleSnackbar("Data saved");
            } catch (e) {
                console.error("Error saving data", e);
                handleSnackbar("Error saving data");
            }
        }
    }

    const loadData = useCallback(async () => {
        if (currentDate && currentUser?.uid) {
            return getTrackingDataForDay(currentUser.uid, currentDate.format("YYYY-MM-DD"), (data) => {
                setFoodEaten(data.foodEatenId ? {id: data.foodEatenId, label: 'Food'} : null);
                setOtherFood(data.otherFood || null);
                setUrgency(data.urgency || 0);
                setConsistency(data.consistency || 0);
                setMealBathroomTime(data.mealBathroomTime || 0);
                setHadCaffeine(data.hadCaffeine || false);
                setNotes(data.notes || '');
            });
        } else {
            setFoodEaten(null);
            setOtherFood(null);
            setUrgency(0);
            setConsistency(0);
            setMealBathroomTime(0);
            setHadCaffeine(false);
            setNotes('');
        }
    }, [currentDate, currentUser?.uid]);

    useEffect(() => {
        loadData();
    }, [currentDate, currentUser?.uid, loadData]);

    if (!currentUser) {
        return <AuthScreen onAuthError={() => {
        }}/>
    }

    const currentScreen = () => {
        switch (currentTab) {
            case 'calendar':
                return <CalendarScreen/>;
            case 'settings':
                return <SettingsScreen currentUser={currentUser}/>;
            case 'tracker':
            default:
                return <TrackerScreen
                    currentFirebaseUser={currentUser}
                    selectedDate={currentDate} onDateChange={handleDateChange}
                    foodEaten={foodEaten} onFoodEatenChange={handleFoodEatenChange}
                    otherFood={otherFood} onOtherFoodChange={handleOtherFoodChange}
                    urgency={urgency} onUrgencyChange={handleUrgencyChange}
                    consistency={consistency} onConsistencyChange={handleConsistencyChange}
                    mealBathroomTime={mealBathroomTime} onMealBathroomTimeChange={handleMealBathroomTimeChange}
                    hadCaffeine={hadCaffeine} onCaffeineChange={handleCaffeineChange}
                    notes={notes} onNotesChange={handleNotesChange}
                    onSave={handleSave}/>;
        }
    }

    return (
        <main>
            <Box id="main-box" position='relative' height="100vh" display="flex" flexDirection="column" py={3}>
                <Box pb={8}>
                    {currentScreen()}
                </Box>

                <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                    <BottomNav changeCurrentTab={handleChangeCurrentTab} currentTab={currentTab}/>
                </Paper>

                <Snackbar open={isSnackbarOpen} onClose={handleSnackbarClose} message={snackbarMessage}
                          autoHideDuration={3000}/>
            </Box>
        </main>
    )
}
