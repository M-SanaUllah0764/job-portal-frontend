import React from 'react';
import { AppBar, Typography } from '@mui/material';

const Footer = () => {
    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: '#FAFAFA', boxShadow: 'none', padding: '5px', mt: 'auto' }}
        >
            <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 1 }}>
                &copy; 2024 Job Portal. All rights reserved.
            </Typography>
        </AppBar>
    );
};

export default Footer;
