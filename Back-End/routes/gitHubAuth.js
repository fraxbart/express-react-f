import express from "express"
const router = express.Router()
import Authenticator from 'passport'
import session from 'express-session'
import dotenv from 'dotenv'
import passport from "passport"
import { Strategy as GithubStrategy } from "passport-github2"
import session from "express-session"

dotenv.config()

router.use(
    session({
        secret: process.env.GITHUB_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(
    new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
    })
)

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
    console.log(res)
})
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/success')
})

//in caso di successo redirectami alla home
router.get('/success', (req, res) => {
    const { user } = req

    const userName = user.userName
    const email = user.email
    res.send({
        userName,
        email,
        user
    }).redirect('http://localhost:3000/home')
})

export default router