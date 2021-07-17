import React from 'react';
import Logo from '../components/Logo';
import { useStyles } from '../styles';
import { Box,CircularProgress,Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

export default function PaymentScreen(props) {
 
    const styles  = useStyles();

    return (
        
        <Box className={[styles.root,styles.navy]}>
            <Box className={[styles.main,styles.center]}>
                <Box>
                  <Logo larger></Logo>
                     <Typography
                     guttorBottom
                     className={styles.title}
                     variant="h3"
                     component="h3"
                     
                     >

                         Please Follow the Instruction for pIN PAD

                     </Typography>
                     <CircularProgress/>
                </Box>
            </Box>

            <Box className={[styles.center,styles.space]}>
                <Button
                onClick={()=>props.history.push('/complete')}
                variant="contained"
                color="primary"
                className={styles.largeButton}
                >
                    Complete Order

                </Button>

            </Box>

        </Box>
    )
}
