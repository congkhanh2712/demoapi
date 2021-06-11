
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ContactPhoneOutlinedIcon from '@material-ui/icons/ContactPhoneOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import instance from '../AxiosConfig';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
    },
});

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openFormAdd: false,
            editData: {},
            value: 0,
            list: [],
            loading: true,
        }
    }

    componentDidMount = async () => {
        this.props.isLogin();
        this.getData();
    }
    getData = () => {
        instance.get('/user/list')
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                    this.setState({
                        loading: false,
                        list: res.data
                    })
                } else {
                    this.setState({
                        loading: false
                    })
                }
            })
            .catch(error => console.log(error));
    }
    onChange = async (event) => {
        var name = event.target.name;
        var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        await this.setState({
            [name]: value
        })
    }
    deleteContact = (id) => {
        instance.delete(`/user/delete/${id}`)
            .then(res => {
                if (res.data.succeed === true) {
                    alert("Xoá thành công")
                    this.getData();
                } else {
                    alert("Xoá thất bại")
                }
            })
    }
    logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert('Đăng xuất thành công');
        window.location.pathname = '';
    }
    render() {
        const { classes } = this.props;
        var { list, loading } = this.state;
        return (
            <Container component="main" maxWidth='lg'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ContactPhoneOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Manage User
                    </Typography>
                    <Grid container style={{ with: 1000 }} direction={'row'} justify={'flex-end'}>
                        <Button color="primary" onClick={this.logOut}>
                            Đăng xuất
                        </Button>
                    </Grid>
                    <TableContainer component={Paper} style={{ marginTop: 30 }}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Id</TableCell>
                                    <TableCell align="left">UserName</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Phone</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Delete At</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading == false
                                    ? list.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{row.username}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.phone}</TableCell>
                                            <TableCell align="left">{row.address}</TableCell>
                                            {row.deleteAt != null
                                                ? <TableCell align="left">{row.deleteAt}</TableCell>
                                                : <TableCell align="left">Active</TableCell>
                                            }
                                            <TableCell align="center">
                                                <Tooltip title="Delete Contact">
                                                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.deleteContact(row.id)}>
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        );
    }
}

ManageUser.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ManageUser);