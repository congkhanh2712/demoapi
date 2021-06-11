
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

class ManageContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openFormAdd: false,
            editData: {},
            value: 0,
            email: "",
            name: "",
            phone: "",
            address: "",
            id: 0,
            contacts: [

            ]
        }
    }

    componentDidMount = async () => {
        this.props.isLogin();
        this.getData();
    }
    getData = () => {
        instance.get(`/contact/list`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    contacts: res.data
                })
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
        instance.delete(`/contact/delete/${id}`)
            .then(res => {
                if (res.data.succeed === true) {
                    alert("Xoá thành công")
                    this.getData();
                } else {
                    alert("Xoá thất bại")
                }
            })
    }
    handleClickOpen = (x) => {
        this.setState({
            open: true,
            email: x.email,
            name: x.name,
            phone: x.phone,
            address: x.address,
            id: x.id
        })
    }
    handleClose = () => {
        this.setState({
            open: false,
            openFormAdd: false,
        })
    }
    submitEdit = () => {
        var contact = {
            "name": this.state.name,
            "email": this.state.email,
            "phone": this.state.phone,
            "address": this.state.address,
        }
        instance.put(`/contact/update/${this.state.id}`, contact)
            .then(res => {
                if (res.data.succeed === true) {
                    alert("Sửa thành công")
                    this.getData();
                    this.setState({
                        open: false,
                    })
                } else {
                    alert("Sửa thất bại")
                }
            })
        // var { contacts } = this.state;
        // contacts.forEach(x => {
        //     if (x.id === this.state.id) {
        //         x.name = this.state.name
        //         x.email = this.state.email
        //         x.phone = this.state.phone
        //         x.address = this.state.address
        //     }
        // })

    }
    submitAdd = () => {
        var { email, name, address, phone } = this.state;
        if (email === "" || name === "" || address === "" || phone === "") {
            alert("chưa điền đủ thông tin")
        }
        var contact = {
            "name": name,
            "email": email,
            "phone": phone,
            "address": address,
        }
        instance.post(`/contact/add`, contact)
            .then(res => {
                if (res.data.succeed === true) {
                    alert("Thêm liên hệ thành công")
                    this.getData();
                    this.setState({
                        openFormAdd: false
                    })
                } else {
                    alert("Username đã tồn tại")
                }
            })
    }
    openFormAdd = () => {
        this.setState({
            openFormAdd: true,
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
        var { contacts } = this.state;
        return (
            <Container component="main" maxWidth='lg'>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ContactPhoneOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Manage Contact
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
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Phone</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contacts.map((row, index) => (
                                    <TableRow key={row.id}>
                                        {/* <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell> */}
                                        <TableCell align="left">{row.id}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.phone}</TableCell>
                                        <TableCell align="left">{row.address}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Delete Contact">
                                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.deleteContact(row.id)}>
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit Contact">
                                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.handleClickOpen(row)}>
                                                    <CreateIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Edit Contact"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <form className={classes.form} noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="ID"
                                        value={this.state.id}
                                        autoFocus
                                        disabled
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        autoFocus
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.name}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="address"
                                        label="Address"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.address}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Phone"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.phone}
                                    />
                                </form>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.submitEdit} color="primary" autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Tooltip title="Add Contact" aria-label="add">
                        <Fab color="secondary" className={classes.absolute} onClick={this.openFormAdd}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>

                    {/* dialog thêm contact */}
                    <Dialog
                        open={this.state.openFormAdd}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Edit Contact"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <form className={classes.form} noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        autoFocus
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.name}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="address"
                                        label="Address"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.address}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Phone"
                                        type="text"
                                        onChange={this.onChange}
                                        value={this.state.phone}
                                    />
                                </form>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.submitAdd} color="primary" autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        );
    }
}

ManageContact.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ManageContact);