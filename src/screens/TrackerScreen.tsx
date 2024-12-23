import {Button, Checkbox, FormControlLabel, Grid2 as Grid, InputAdornment, TextField} from '@mui/material';
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
    otherFood: string | null;
    onOtherFoodChange: (newOtherFood: string) => void;
    urgency: number;
    onUrgencyChange: (newUrgency: number) => void;
    consistency: number;
    onConsistencyChange: (newConsistency: number) => void;
    mealBathroomTime?: number;
    onMealBathroomTimeChange: (newMealBathroomTime: number) => void;
    hadCaffeine: boolean;
    onCaffeineChange: (newCaffeine: boolean) => void;
    notes: string;
    onNotesChange: (newNotes: string) => void;
    onSave: () => void;
}

export function TrackerScreen(
    {
        selectedDate,
        onDateChange,
        foodEaten,
        onFoodEatenChange,
        otherFood,
        onOtherFoodChange,
        urgency,
        onUrgencyChange,
        consistency,
        onConsistencyChange,
        mealBathroomTime,
        onMealBathroomTimeChange,
        hadCaffeine,
        onCaffeineChange,
        notes,
        onNotesChange,
        onSave,
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

    const handleNotesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newNotes = event.target.value;
        onNotesChange(newNotes);
    }

    return (
        <Grid container direction="column" alignItems="center">
            <DateComponent date={selectedDate} onDateChange={onDateChange}/>
            <FoodEatenComponent foodEaten={foodEaten} onFoodEatenChange={onFoodEatenChange}
                                otherFood={otherFood} onOtherFoodChange={onOtherFoodChange}/>
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
            <TextField multiline={true} rows={4} sx={{marginTop: 2, width: 300}} label="Notes" value={notes}
                       onChange={handleNotesChange}/>
            <Button variant="contained" size="large" sx={{mt: 2}} onClick={onSave}>Save</Button>
        </Grid>
    )
}
