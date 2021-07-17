import { Typography,Box,Dialog,DialogTitle,Button,TextField, Grid,Card } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React,{useContext, useState,useEffect} from 'react';
import { useStyles } from '../styles';
import Logo from '../components/Logo';
import { CardActionArea } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { addToOrder, removeFromOrder } from '../actions';
import { Store } from '../Store';

export default function ReviewScreen(props) {
    const styles =  useStyles();
    const {state,dispatch} = useContext(Store);
    const {
        orderItems,
        itemCount,
        totalPrice,
        taxPrice,
        orderType,
    } = state.order;
    const [isOpen,setIsOpen] = useState(false);
    const [product,setProduct] = useState({});
    const [qunatity,setQuantity] = useState(1);

    const closeHandler = () => {
       setIsOpen(false);
    };

    const productClickHandler = (p) => {

       setProduct(p);
       setIsOpen(true);    
    };

    const addToOrderHandler = () => {
        addToOrder(dispatch,{...product,qunatity});
        setIsOpen(false);
    };

    const cancelOrRemoveFromOrder = () => {
        removeFromOrder(dispatch,product);
        setIsOpen(false);
    };

    const procedToCheckoutHandler = () => {
          props.history.push('/select-payment');
    };
      
    useEffect(() => {}, []);
    return (
        <Box className={[styles.root]}>
          <Box className={[styles.main,styles.navy,styles.center]}>
            <Dialog    
            onClose={closeHandler}
            aria-labelledby="max-width-dialog-title"
            open = {isOpen}
            fullWidth={true}
            maxWidth="sm"
            >
            <DialogTitle className={styles.center}>
                Add {product.name}
            </DialogTitle>

            <Box className={[styles.row,styles.center]}>
                <Button
                variant="contained"
                color="primary"
                disabled={qunatity === 1}
                onClick = {(e)=> qunatity > 1 && setQuantity(qunatity-1)}
                >
                 <RemoveIcon/>
                </Button>
                <TextField
                 inputProps={{className:styles.largeNumber}}
                 className={styles.largeNumber}
                 type="number"
                 min={1}
                 variant="filled"
                 value={qunatity}
                />

                <Button
                variant="contained"
                color="primary"
                onClick={(e)=>setQuantity(qunatity+1)}
                >

                 <AddIcon/>

                </Button>

             </Box>

             <Box className={[styles.row,styles.around]}>
                 <Button
                 onClick={cancelOrRemoveFromOrder}
                 variant="contained"
                 color="primary"
                 size="large"
                 className={styles.largeButton}
                 >

                     {orderItems.find((X)=> X.name === product.name)
                     ?'Remove From Order'
                     : 'Cancel' }

                 </Button>

                 <Button
                  onClick={addToOrderHandler}
                  variant="contained"
                  color="primary"
                  size="large"
                  className={styles.largeButton}

                 >

                     Add to Order

                 </Button>

             </Box>

            </Dialog>

            <Box className={[styles.center,styles.column]}>
               <Logo large></Logo>
               <Typography
                 gutterBottom
                 className={styles.title}
                 variant="h3"
                 component="h3"
               
               >
                   Review My {orderType} order
               </Typography>
            </Box>

             <Grid container>
                 {orderItems.map((orderItem)=>(

                     <Grid item md={12} key={orderItem.name}>
                         <Card className={styles.card}
                         onClick={()=>productClickHandler(orderItem)}
                         >

                         <CardActionArea>
                           <CardContent>

                               <Box className={[styles.row,styles.between]}>
                                   <Typography
                                   gutterBottom
                                   variant="body2"
                                   color="primary"
                                   component="p"
                                   >
                                       {orderItem.name}

                                   </Typography>

                                 <Button variant="contained">Edit</Button>

                               </Box>

                               <Box className={[styles.row,styles.between]}>
                                   <Typography
                                     variant="body2"
                                     color="textSecondary"
                                     component="p"
                                   >

                                       {orderItem.calorie} Cal

                                   </Typography>

                                   <Typography
                                   variant="body"
                                   color="textPrimary"
                                   component="p"
                                   >

                                     {orderItem.quantity} X Rs.{orderItem.price}
                                   </Typography>


                               </Box>

                          </CardContent> 
                         </CardActionArea>    
                        </Card>
                      </Grid>
                 ))};
                    
             </Grid>
          </Box>
           <Box className={[styles.row,styles.around]}>
               <Button
               onClick={()=>{
                props.history.push(`/order`);
                }}
                variant="contained"
                color="Primary"
                className={styles.largeButton}
              
               >
                Back
               </Button>

               <Button
                onClick={procedToCheckoutHandler}
                variant="contained"
                color="secondary"
                disabled={orderItems.length === 0}
                >

                    Proceed to Checkout

               </Button>

           
           </Box>
        </Box>
    );
}
