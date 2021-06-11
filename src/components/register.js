
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

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
});

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            email: "",
            password: "",
            repassword: "",
            name: "",
            address: "",
            phone: "",
            success: false
        }
    }
    onChange = async (event) => {
        var name = event.target.name;
        var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        await this.setState({
            [name]: value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        var { email, password, repassword, name, address, phone } = this.state;
        if (email === "" || password === "" || repassword === "" || name === "" || address === "" || phone === ""){
            alert("chưa điền đủ thông tin")
        }
        if(password !== repassword){
            alert("mật khẩu xác nhận không đúng")
        }
        var user = {
            "username" : email,
            "password" : password,
            "name" : name,
            "phone" : phone,
            "address" : address,
        }
        axios.post(`/auth/signup`,user )
            .then(res => {
                if(res.data.succeed === true){
                    alert("Đăng kí thành công, chuyển đến trang đăng nhập")
                    this.setState({
                        success: true
                    })
                }else{
                    alert("Username đã tồn tại")
                }
            })
    }
    render() {
        const { classes } = this.props;
        if(this.state.success === true){
            return <Redirect to="/" />
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                </Typography>
                    <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
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
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="repassword"
                            label="Re-Password"
                            type="password"
                            onChange={this.onChange}
                            value={this.state.repassword}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignUp);