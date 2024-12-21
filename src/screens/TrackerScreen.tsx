import {Checkbox, FormControlLabel, Grid2 as Grid, InputAdornment, TextField} from '@mui/material';
import UrgencyComponent from '../components/tracker/UrgencyComponent';
import {ChangeEvent} from 'react';
import {FoodEatenComponent} from '../components/tracker/FoodEatenComponent';
import {Food} from '../types/Food';
import ConsistencyComponent from '../components/tracker/ConsistencyComponent';
import {DateComponent} from '../components/tracker/DateComponent';
import {Dayjs} from 'dayjs';

export interface TrackerScreenProps {
    selectedDate: Dayjs | null;
    onDateChange: (newDate: Dayjs | null) => void;
    foodEaten: Food | null;
    onFoodEatenChange: (newFoodEaten: Food) => void;
    urgency: number;
    onUrgencyChange: (newUrgency: number) => void;
    consistency: number;
    onConsistencyChange: (newConsistency: number) => void;
    mealBathroomTime?: number;
    onMealBathroomTimeChange: (newMealBathroomTime: number) => void;
    hadCaffeine: boolean;
    onCaffeineChange: (newCaffeine: boolean) => void;
}

export function TrackerScreen(
    {
        selectedDate,
        onDateChange,
        foodEaten,
        onFoodEatenChange,
        urgency,
        onUrgencyChange,
        consistency,
        onConsistencyChange,
        mealBathroomTime,
        onMealBathroomTimeChange,
        hadCaffeine,
        onCaffeineChange
    }: TrackerScreenProps
) {
    const handleMealBathroomTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newMealBathroomTime = event.target.value ? parseInt(event.target.value) : 0;
        onMealBathroomTimeChange(newMealBathroomTime);
    }

    const handleCaffeineChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCaffeine = event.target.checked;
        onCaffeineChange(newCaffeine);
    }

    return (
        <Grid container direction="column" alignItems="center">
            <DateComponent date={selectedDate} onDateChange={onDateChange}/>
            <FoodEatenComponent foodEaten={foodEaten} onFoodEatenChange={onFoodEatenChange}/>
            <UrgencyComponent urgency={urgency} onUrgencyChange={onUrgencyChange}/>
            <ConsistencyComponent consistency={consistency} onConsistencyChange={onConsistencyChange}/>
            <TextField
                sx={{marginTop: 2, width: 300}}
                value={mealBathroomTime ?? 0 > 0 ? mealBathroomTime : ''}
                onChange={handleMealBathroomTimeChange}
                type="number" label="Food => Bathroom"
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">min</InputAdornment>,
                    },
                }}
            />
            <FormControlLabel sx={{marginTop: 2}}
                              control={<Checkbox value={hadCaffeine} onChange={handleCaffeineChange}/>}
                              label="Had caffeine"/>
            {/*<br/>
            <code style={{marginTop: 1}}>
                {JSON.stringify({foodEaten, urgency, consistency, mealBathroomTime, hadCaffeine}, null, 2)}
            </code>*/}
        </Grid>
    )
}
