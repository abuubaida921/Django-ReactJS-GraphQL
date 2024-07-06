import { useQuery, gql } from "@apollo/client";
import { Avatar, ListItem, ListItemIcon, ListItemText, Container, Box, List, ListItemSecondaryAction, IconButton, Typography, TextField, Button} from "@mui/material";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const App = () => {
  const{loading,error,data} = useQuery(gql`
  {
    todos{
      id
      title
      date
    }    
  }

    `);
  if(loading) return <h1>Loading Data...</h1>;
  if(error) return <h1>Error Occurred Lading Data...</h1>;
  return (
    <Container>
      <Typography align="center" variant="h3">ToDo App</Typography>
      <Box style={{
        maxWidth:"500 px",
        margin:"0 auto",
        display:"flex"
      }}>
        <TextField
        fullWidth
        id="outlined-basic"
        label="Add new todo..."
        variant="outlined"
        />
        <Button variant="contained" color="primary">Add</Button>
      </Box>
      <Box component="div" style={{
        maxWidth:"500 px",
        margin:"0 auto"
      }}>
        <List>
          {
            data?.todos?.map((item,i)=>(
              <ListItem button key={i}>
                <ListItemIcon>
                  <Avatar style={{
                    backgroundColor:"blue"
                  }}>{i+1}</Avatar>
                </ListItemIcon>
                <ListItemText primary={item?.title}/>
                <ListItemSecondaryAction>
                  <IconButton><EditIcon color="primary"/></IconButton>
                  <IconButton><DeleteForeverIcon color="secondary"/></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Container>
  );
};

export default App;
