import {Box, Slider, Typography} from '@mui/material';

export interface ConsistencyComponentProps {
    consistency: number;
    onConsistencyChange: (newUrgency: number) => void;
}

const marks = [
    {
        value: 0,
        label: '💩',
    },
    {
        value: 50,
        label: '🫠',
    },
    {
        value: 100,
        label: '🌊',
    },
];

export default function ConsistencyComponent({consistency, onConsistencyChange}: ConsistencyComponentProps) {
    const handleConsistencyChange = (_event: Event, newUrgency: number | number[]) => {
        const consistency = Array.isArray(newUrgency) ? newUrgency[0] : newUrgency;
        onConsistencyChange(consistency);
    }
    return (
        <Box my={2} width={300}>
            <Typography>Consistency</Typography>
            <Slider defaultValue={50} aria-label="Consistency" step={25} marks={marks}
                    onChange={handleConsistencyChange} value={consistency}/>
        </Box>
    );
}
