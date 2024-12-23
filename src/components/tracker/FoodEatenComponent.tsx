import {Autocomplete, Box, TextField} from '@mui/material';
import {SyntheticEvent} from 'react';
import {Food} from '../../types/Food';

export interface FoodEatenComponentProps {
    foodEaten: Food | null;
    onFoodEatenChange: (foodEaten: Food) => void;
    otherFood: string | null;
    onOtherFoodChange: (newOtherFood: string) => void;
}

const food: Food[] = [
    {id: 'eggs', label: 'Eggs'},
    {id: 'cheesyEggs', label: 'Cheesy Eggs'},
    {id: 'mcdonalds', label: "McDonald's"},
    {id: 'cfa', label: "Chick-fil-a"},
    {id: 'factors', label: "Factor"},
    {id: 'leftovers', label: "Leftovers"},
    {id: 'other', label: "Other"}
]

export function FoodEatenComponent(
    {
        foodEaten,
        onFoodEatenChange,
        otherFood,
        onOtherFoodChange
    }: FoodEatenComponentProps
) {
    const handleFoodEatenChange = (_event: SyntheticEvent, newFoodEaten: Food | null) => {
        if (newFoodEaten) {
            onFoodEatenChange(newFoodEaten);
        }
    }

    const handleOtherFoodChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        onOtherFoodChange(target.value);
    }

    const selectedFood = food.find(f => f.id === foodEaten?.id) || null;

    return (
        <Box>
            <Autocomplete
                sx={{marginTop: 2, width: 300}}
                value={selectedFood}
                onChange={handleFoodEatenChange}
                getOptionLabel={(food) => food ? food.label : ''}
                disablePortal
                options={food}
                renderInput={(params) => <TextField {...params} label="First food eaten"/>}
            />
            {selectedFood?.id === 'other' ? (
                <TextField sx={{marginTop: 2, width: 300}} value={otherFood ?? ''} onChange={handleOtherFoodChange}
                           label="Other food eaten"/>
            ) : null}
        </Box>
    )
}
