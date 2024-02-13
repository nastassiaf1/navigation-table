import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel, TabContext, TabList } from '@mui/lab';

export default function AuthModal() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = () => navigate('/');
    const currentTab = location.pathname.includes('/login') ? '0' : '1';

    const handleChange = (_event: any, newValue: string) => {
        if (newValue === '0') {
            navigate('/login', { state: { backgroundLocation: location.state.backgroundLocation } });
        } else {
            navigate('/registration', { state: { backgroundLocation: location.state.backgroundLocation } });
        }
    }

    return (
        <TabContext value={currentTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="login form tabs" centered>
                        <Tab label="Login" value="0" />
                        <Tab label="Registration" value="1" />
                    </TabList>
                </Box>
                <TabPanel value="0">
                    Login Form
                </TabPanel>
                <TabPanel value="1">
                    Registration Form
            </TabPanel>
            <button onClick={handleClose}>Close</button>
        </TabContext>
    );
};
