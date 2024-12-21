import {Box, Paper} from '@mui/material';
import {useEffect, useState} from 'react';
import {BottomNav} from './BottomNav';
import {TrackerScreen} from './screens/TrackerScreen';
import {SettingsScreen} from './screens/SettingsScreen';
import {CalendarScreen} from './screens/CalendarScreen';
import {TabName} from './types/TabName';
import {auth} from './firebase';
import {AuthScreen} from './screens/AuthScreen';
import {Food} from './types/Food';
import dayjs, {Dayjs} from 'dayjs';

export function AppView() {
    const [currentTab, setCurrentTab] = useState<TabName>('tracker');
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [currentDate, setCurrentDate] = useState<Dayjs | null>(dayjs());
    const [foodEaten, setFoodEaten] = useState<Food | null>(null);
    const [urgency, setUrgency] = useState(0);
    const [consistency, setConsistency] = useState(0);
    const [mealBathroomTime, setMealBathroomTime] = useState(0);
    const [hadCaffeine, setHadCaffeine] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
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

    if (!currentUser) {
        return <AuthScreen/>
    }

    const currentScreen = () => {
        switch (currentTab) {
            case 'calendar':
                return <CalendarScreen/>;
            case 'settings':
                return <SettingsScreen/>;
            case 'tracker':
            default:
                return <TrackerScreen
                    selectedDate={currentDate} onDateChange={handleDateChange}
                    foodEaten={foodEaten} onFoodEatenChange={handleFoodEatenChange}
                    urgency={urgency} onUrgencyChange={handleUrgencyChange}
                    consistency={consistency} onConsistencyChange={handleConsistencyChange}
                    mealBathroomTime={mealBathroomTime} onMealBathroomTimeChange={handleMealBathroomTimeChange}
                    hadCaffeine={hadCaffeine} onCaffeineChange={handleCaffeineChange}/>;
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
