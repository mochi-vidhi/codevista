const express = require('express')
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: 'Vidhi@_#_2803#$T',  
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((obj,done)=>{
    done(null,obj);
});




passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));


const port = 5000;
app.listen(port,()=>{
    console.log(`Server running on Port : ${port}`);
})

