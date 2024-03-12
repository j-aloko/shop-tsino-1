import React from 'react';

import PropTypes from 'prop-types';

import { MUIAppBar, Box, Tab, Tabs } from '../mui-components/MuiComponents';
import ScrollableBox from '../scrollable-box/ScrollableBox';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box mt={2} p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    'aria-controls': `full-width-tabpanel-${index}`,
    id: `full-width-tab-${index}`,
  };
}

export default function TabsPanel({ theme, tabList, tabValue, onTabValueChange }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', maxWidth: 'xl' }}>
      <MUIAppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
        <Tabs value={tabValue} onChange={onTabValueChange} indicatorColor="secondary" textColor="inherit" centered aria-label="basic tabs">
          {React.Children.toArray(tabList?.map(({ tab, id }) => <Tab label={tab} {...a11yProps(id)} />))}
        </Tabs>
      </MUIAppBar>
      <ScrollableBox height="100vh">
        {React.Children.toArray(
          tabList?.map(({ PanelComponent, id }) => (
            <TabPanel value={tabValue} index={id} dir={theme.direction}>
              {PanelComponent}
            </TabPanel>
          ))
        )}
      </ScrollableBox>
    </Box>
  );
}
