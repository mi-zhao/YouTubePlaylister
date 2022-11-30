import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import logo from '../music_player.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SplashScreen() {

    function handleCreateAccount() {
        console.log("account clicked!")
    }

    function handleLogin() {
        console.log("login clicked!")
    }

    function handleGuest() {
        console.log("guest clicked!")
    }  

    return (
        <div id="splash-screen">
            <Typography variant="h6">Welcome to</Typography>
            <Typography variant="h2" fontFamily={'GFS Didot'} fontWeight="bold" fontStyle="italic" fontSize="h1.fontSize">Playlister</Typography>
            <p class="h7text">Create, rate, and share Playlists around the world</p>

            <Box sx={{ '& button': { m: 4 } }}>
                <Button variant="contained" sx={{ mt: 3, mb: 2, color: 'black', backgroundColor:"#AFA6C8" }} onClick={handleCreateAccount}>
                    Create Account
                </Button>
                <Button variant="contained" sx={{ mt: 3, mb: 2, color: 'black', backgroundColor:"#AFA6C8" }} onClick={handleLogin}>
                    Login
                </Button>
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