import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import {CalendarMonth, FoodBank, Settings} from '@mui/icons-material';
import {TabName} from './types/TabName';

export interface BottomNavProps {
    currentTab: TabName;
    changeCurrentTab: (newTab: TabName) => void;
}

export function BottomNav({currentTab, changeCurrentTab}: BottomNavProps) {
    return (
        <BottomNavigation
            value={currentTab}
            onChange={(_event, newTab) => {
                changeCurrentTab(newTab)
            }}
        >
            <BottomNavigationAction value="calendar" label="Calendar" icon={<CalendarMonth/>}/>
            <BottomNavigationAction value="tracker" label="Tracker" icon={<FoodBank/>}/>
            <BottomNavigationAction value="settings" label="Settings" icon={<Settings/>}/>
        </BottomNavigation>
    )
}
