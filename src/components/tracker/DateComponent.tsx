import {Box} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Dayjs} from 'dayjs';

export interface DateComponentProps {
    date: Dayjs | null;
    onDateChange: (date: Dayjs | null) => void;
}

export const DateComponent = ({date, onDateChange}: DateComponentProps) => {
    return (
        <Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date" value={date} onChange={onDateChange}/>
            </LocalizationProvider>
        </Box>
    );
}
