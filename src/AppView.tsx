import {Box, Paper} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';
import {BottomNav} from './BottomNav';
import {TrackerScreen} from './screens/TrackerScreen';
import {SettingsScreen} from './screens/SettingsScreen';
import {CalendarScreen} from './screens/CalendarScreen';
import {TabName} from './types/TabName';
import {Food} from './types/Food';
import dayjs, {Dayjs} from 'dayjs';
import {auth, getTrackingDataForDay, saveTrackingDataForDay} from './firebase';

export function AppView() {
    const [currentUserId, setCurrentUser] = useState<string>(localStorage.getItem('userId') || '');
    const [currentTab, setCurrentTab] = useState<TabName>('tracker');
    const [currentFirebaseUser, setCurrentFirebaseUser] = useState(auth.currentUser);
    const [currentDate, setCurrentDate] = useState<Dayjs | null>(dayjs());
    const [foodEaten, setFoodEaten] = useState<Food | null>(null);
    const [urgency, setUrgency] = useState(0);
    const [consistency, setConsistency] = useState(0);
    const [mealBathroomTime, setMealBathroomTime] = useState(0);
    const [hadCaffeine, setHadCaffeine] = useState(false);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentFirebaseUser(user);
            console.log("Firebase user", user);
        });
    }, []);

    const handleDateChange = (newDate: Dayjs | null) => {
        setCurrentDate(newDate);
    }

    const handleCurrentUserIdChange = (newUserId: string) => {
        setCurrentUser(newUserId);
        localStorage.setItem('userId', newUserId);
    }

    //TODO: Save all these to Firebase
    const handleChangeCurrentTab = (value: TabName) => {
        setCurrentTab(value);
    }

    const handleFoodEatenChange = (newFoodEaten: Food) => {
        setFoodEaten(newFoodEaten);
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

    const handleSave = async () => {
        const dayTracking = {
            foodEatenId: foodEaten?.id ?? '',
            urgency,
            consistency,
            mealBathroomTime,
            hadCaffeine,
            notes,
        }

        if (currentDate != null) {
            await saveTrackingDataForDay(currentUserId, currentDate.format("YYYY-MM-DD"), dayTracking);
        }
    }

    const loadData = useCallback(async () => {
        if (currentDate && currentUserId) {
            return getTrackingDataForDay(currentUserId, currentDate.format("YYYY-MM-DD"), (data) => {
                setFoodEaten(data.foodEatenId ? {id: data.foodEatenId, label: 'Food'} : null);
                setUrgency(data.urgency || 0);
                setConsistency(data.consistency || 0);
                setMealBathroomTime(data.mealBathroomTime || 0);
                setHadCaffeine(data.hadCaffeine || false);
                setNotes(data.notes || '');
            });
        } else {
            setFoodEaten(null);
            setUrgency(0);
            setConsistency(0);
            setMealBathroomTime(0);
            setHadCaffeine(false);
            setNotes('');
        }
    }, [currentDate, currentUserId]);

    useEffect(() => {
        loadData();
    }, [currentDate, currentUserId, loadData]);

    /*if (!currentFirebaseUser) {
        return <AuthScreen/>
    }*/

    const currentScreen = () => {
        switch (currentTab) {
            case 'calendar':
                return <CalendarScreen/>;
            case 'settings':
                return <SettingsScreen currentUserId={currentUserId} setCurrentUserId={handleCurrentUserIdChange}/>;
            case 'tracker':
            default:
                return <TrackerScreen
                    selectedDate={currentDate} onDateChange={handleDateChange}
                    foodEaten={foodEaten} onFoodEatenChange={handleFoodEatenChange}
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
                <Box>
                    {currentScreen()}
                </Box>

                <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                    <BottomNav changeCurrentTab={handleChangeCurrentTab} currentTab={currentTab}/>
                </Paper>
            </Box>
        </main>
    )
}
