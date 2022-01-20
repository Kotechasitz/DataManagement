import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import PlusOne from "@material-ui/icons/PlusOne";
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function Main() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const [student, setStudent] = React.useState([]);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  const history = useHistory();

  const token = JSON.parse(localStorage.getItem('access_token'));
  
  const getData = async () => {
    // console.log(token)
    try {
      const resp = await axios.get("http://localhost:4000/student",
      {
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
        cancelToken: cancelToken.current.token,
      });
      setStudent(resp.data.data);
      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();

    return () => {
      // console.log('exit product page')
      cancelToken.current.cancel();
    };
  }, []);

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>Try Again</p>
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Data Management
          </Typography>
          <Button variant="contained" size="small" endIcon={<PlusOne />} onClick={()=> history.push('/main/create')}>
        Add
      </Button>
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={""} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
          
        </Toolbar>
      </AppBar>


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 20 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.map((p, index) => {
              return (
                <TableRow
                  key={p._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {p.student_id}
                  </TableCell>
                  <TableCell align="right">{p.name}</TableCell>
                  <TableCell align="right">{p.year}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<SendIcon />}
                      onClick={()=> history.push('/main/edit/'+p._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={async () => {
                        const isConfirm = window.confirm('Delete '+p.name+ '?')
                        if(isConfirm === true){
                          const resp = await axios.delete('http://localhost:4000/student/delete/'+p._id,{
                            headers: {
                              Authorization: "Bearer " + token.access_token,
                            },
                          })
                          if(resp.status === 200){
                            alert('Delete Student Success');
                        }
                          history.go(0)
                        }
                      }}
                      variant="contained"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </Container>
  );
}
