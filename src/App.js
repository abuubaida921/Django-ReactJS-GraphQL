import { useQuery, gql, useMutation } from "@apollo/client";
import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Box,
  List,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const App = () => {
  const [title, setTitle] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [edittodo, setEdittodo] = useState(false);
  const { loading, error, data } = useQuery(Get_Todo_Query);
  const [createTodo] = useMutation(Add_Todo_Query, {
    onCompleted(data) {
      setTitle("");
    },
    refetchQueries: [
      {
        query: Get_Todo_Query,
      },
    ],
  });
  const [updateTodo] = useMutation(Update_Todo_Query, {
    onCompleted(data) {
      // console.log("update data", data);
      setTitle("");
      setEdittodo(false);
    },
    onError(err) {
      // console.log('Error updating todo:', err);

      console.log(
        "Error details:",
        err.networkError?.result?.errors || err.message
      );
    },
    refetchQueries: [
      {
        query: Get_Todo_Query,
      },
    ],
  });
  const [deleteTodo] = useMutation(Delete_Todo_Query, {
    onCompleted(data) {
      setTitle("");
      setEdittodo(false);
    },
    onError(err) {
      console.log(
        "Error details:",
        err.networkError?.result?.errors || err.message
      );
    },
    refetchQueries: [
      {
        query: Get_Todo_Query,
      },
    ],
  });
  const addNewTodo = () => {
    createTodo({ variables: { title: title } });
  };
  const editButtonHandler = (id, title) => {
    setEditTodoId(id);
    setTitle(title);
    setEdittodo(true);
  };
  const editATodo = () => {
    updateTodo({ variables: { id: parseInt(editTodoId), title: title } });
  };
  const deleteATodo = (id) => {
    deleteTodo({ variables: { id: parseInt(id) } });
  };
  if (loading) return <h1>Loading Data...</h1>;
  if (error) return <h1>Error Occurred Lading Data...</h1>;
  return (
    <Container>
      <Typography align="center" variant="h3">
        ToDo App
      </Typography>
      <Box
        style={{
          maxWidth: "500 px",
          margin: "0 auto",
          display: "flex",
        }}
      >
        <TextField
          value={title}
          fullWidth
          id="outlined-basic"
          label={edittodo ? "Edit todo" : "Add todo..."}
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        {edittodo ? (
          <Button
            onClick={editATodo}
            variant="contained"
            disabled={!title}
            color="primary"
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={addNewTodo}
            variant="contained"
            disabled={!title}
            color="primary"
          >
            Add
          </Button>
        )}
      </Box>
      <Box
        component="div"
        style={{
          maxWidth: "500 px",
          margin: "0 auto",
        }}
      >
        <List>
          {data?.todos?.map((item, i) => (
            <ListItem button key={i}>
              <ListItemIcon>
                <Avatar
                  style={{
                    backgroundColor: "blue",
                  }}
                >
                  {i + 1}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={item?.title} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => editButtonHandler(item?.id, item?.title)}
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => deleteATodo(item?.id)}>
                  <DeleteForeverIcon color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};
const Get_Todo_Query = gql`
  {
    todos {
      id
      title
      date
    }
  }
`;
const Add_Todo_Query = gql`
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      todo {
        id
        title
        date
      }
    }
  }
`;
const Update_Todo_Query = gql`
  mutation UpdateTodo($id: Int!, $title: String!) {
    updateTodo(id: $id, title: $title) {
      todo {
        id
        title
        date
      }
    }
  }
`;
const Delete_Todo_Query = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      message
    }
  }
`;
export default App;
