import React, { isValidElement, useState } from 'react';

import { Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { updateUser } from '../../redux/actions/UserActions';


export default function Profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [validEmail, setValidEmail] = useState(true);


    const initialState = {
        firstName: user.result.name.split(" ")[0],
        lastName: user.result.name.split(" ")[1],
        email: user.result.email,
        password: "",
    }

    const [formData, setFormData] = useState(initialState)

    const handleEditClick = () => {
        if (!isEditing) {
            setIsEditing(true)
        }
        else {
            handleSubmit()
        }
    }


    function handleEmailValidation(email) {
        //define regex     
        const reg = /(?:[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*|”(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*”)@(?:(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?|\[(?:(?:(2(5[0–5]|[0–4][0–9])|1[0–9][0–9]|[1–9]?[0–9]))\.){3}(?:(2(5[0–5]|[0–4][0–9])|1[0–9][0–9]|[1–9]?[0–9])|[a-z0–9-]*[a-z0–9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        const result = reg.test(email)

        setValidEmail(result)
        //test whether input is valid
        return result;
    };

    // need to validate email

    const handleSubmit = () => {

        if (!handleEmailValidation(formData.email)) {
            alert("Please enter a valid email address")
        }
        else {
            dispatch(updateUser(formData, navigate));
            setIsEditing(false)
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h3" component="div" sx={{ flexGrow: .1, color: "#5f6368" }}>
                My Profile
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField autoComplete="off" disabled={!isEditing} name="firstName" fullWidth id="firstName" helperText="First Name" value={formData.firstName} autoFocus onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField disabled={!isEditing} fullWidth id="lastName" helperText="Last Name" value={formData.lastName} name="lastName" autoComplete="off" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField disabled={!isEditing} fullWidth id="email" error={!validEmail} helperText="Email" value={formData.email} name="email" autoComplete="off" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} hidden={!isEditing}>
                        <TextField disabled={!isEditing} fullWidth name="password" helperText="New Password (Leave blank if no change)" value={formData.password} id="password" autoComplete="off" onChange={handleChange} />
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Button type="button" onClick={() => navigate("/home")} fullWidth variant="contained" sx={{ mt: 3, mb: 2, mx: 2 }} >
                        Back
                    </Button>
                    <Button type="button" onClick={handleEditClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2, mx: 2 }} >
                        {isEditing ? "Save Changes" : "Edit"}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}