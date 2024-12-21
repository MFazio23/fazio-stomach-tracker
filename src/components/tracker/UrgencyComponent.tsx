import {Box, Slider, Typography} from '@mui/material';

export interface UrgencyComponentProps {
    urgency: number;
    onUrgencyChange: (newUrgency: number) => void;
}

const marks = [
    {
        value: 0,
        label: '😑',
    },
    {
        value: 50,
        label: '😬',
    },
    {
        value: 100,
        label: '😳',
    },
];

export default function UrgencyComponent({urgency, onUrgencyChange}: UrgencyComponentProps) {
    const handleUrgencyChange = (_event: Event, newUrgency: number | number[]) => {
        const urgency = Array.isArray(newUrgency) ? newUrgency[0] : newUrgency;
        onUrgencyChange(urgency);
    }
    return (
        <Box my={2} width={300}>
            <Typography>Urgency</Typography>
            <Slider defaultValue={50} aria-label="Urgency" step={25} marks={marks}
                    onChange={handleUrgencyChange} value={urgency}/>
        </Box>
    );
}
