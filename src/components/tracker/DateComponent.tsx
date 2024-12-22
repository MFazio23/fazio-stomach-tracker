import {Box, Button} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Dayjs} from 'dayjs';

export interface DateComponentProps {
    date: Dayjs | null;
    onDateChange: (date: Dayjs | null) => void;
}

export const DateComponent = ({date, onDateChange}: DateComponentProps) => {
    const changeDate = (delta: number) => () => {
        if (!date) return;
        onDateChange(date.add(delta, 'day'));
    }
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" width={300}>
            <Button variant="contained" onClick={changeDate(-1)} sx={{minWidth: 32}}>{"<"}</Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date" value={date} onChange={onDateChange} closeOnSelect={true}/>
            </LocalizationProvider>
            <Button variant="contained" onClick={changeDate(1)} sx={{minWidth: 32}}>{">"}</Button>
        </Box>
    );
}
