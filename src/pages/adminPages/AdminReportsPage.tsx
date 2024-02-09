import React from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IndividualComponent from '../../components/reportComponents/IndividualComponent';
import ByDemographicsComponent from '../../components/reportComponents/ByDemographicsComponent';
import ByActivityComponent from '../../components/reportComponents/ByActivityComponent';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminReportsPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AdminNavigationbar />
      <h1>Reports</h1>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Individual" {...a11yProps(0)} />
            <Tab label="By Demographics" {...a11yProps(1)} />
            <Tab label="By Activity" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <IndividualComponent />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ByDemographicsComponent />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ByActivityComponent />
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default AdminReportsPage;
