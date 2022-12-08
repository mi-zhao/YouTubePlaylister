import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import logo from '../music_player.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';
import { useContext } from 'react';
import React from 'react';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext); 

    function handleGuest() {
        auth.isGuest();
    }  

    return (
        <div id="splash-screen">
            <Typography variant="h6">Welcome to</Typography>
            <Typography variant="h2" fontFamily={'GFS Didot'} fontWeight="bold" fontStyle="italic" fontSize="h1.fontSize">Playlister</Typography>
            <p class="h7text">Create, rate, and share Playlists around the world</p>

            <Box sx={{ '& button': { m: 4 } }}>
                <Link to="/register/">
                    <Button variant="contained" sx={{ mt: 3, mb: 2, color: 'black', backgroundColor:"#AFA6C8" }} >
                        Create Account
                    </Button>
                </Link>
                    <Link to="/login/">
                        <Button variant="contained" sx={{ mt: 3, mb: 2, color: 'black', backgroundColor:"#AFA6C8" }}>
                            Login
                        </Button>
                    </Link>
                <Button variant="contained" sx={{ mt: 3, mb: 2, color: 'black', backgroundColor:"#AFA6C8" }} onClick={handleGuest}>
                    Continue As Guest
                </Button>
                <br></br>
                <img src={logo} height="150" />
                <br></br>
                <Typography variant="body2">Created by Michelle Zhao</Typography>
            </Box>
        </div>
        
    )
}