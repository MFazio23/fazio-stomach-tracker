import {Autocomplete, TextField} from '@mui/material';
import {SyntheticEvent} from 'react';
import {Food} from '../../types/Food';

export interface FoodEatenComponentProps {
    foodEaten: Food | null;
    onFoodEatenChange: (foodEaten: Food) => void;
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

export function FoodEatenComponent({foodEaten, onFoodEatenChange}: FoodEatenComponentProps) {
    const handleFoodEatenChange = (_event: SyntheticEvent, newFoodEaten: Food | null) => {
        if (newFoodEaten) {
            onFoodEatenChange(newFoodEaten);
        }
    }

    const selectedFood = food.find(f => f.id === foodEaten?.id) || null;

    return (
        <Autocomplete
            sx={{marginTop: 2, width: 300}}
            value={selectedFood}
            onChange={handleFoodEatenChange}
            getOptionLabel={(food) => food ? food.label : ''}
            disablePortal
            options={food}
            renderInput={(params) => <TextField {...params} label="First food eaten"/>}
        />
    )
}
