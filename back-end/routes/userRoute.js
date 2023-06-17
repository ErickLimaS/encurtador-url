const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { response, generateToken, isAuth } = require("../utils.js");
const User = require("../models/userModel.js");

const userRoute = express.Router();

const bcryptSalt = 8

userRoute.post("/signup", expressAsyncHandler(async (req, res) => {

    try{
        
        const isEmailOnDatabase = await User.findOne({email: req.body.email})

        if(isEmailOnDatabase){

            return res.status(401).json(response(false, "Esse email já está cadastrado."))

        }

        const passwordHashed = await bcrypt.hash(req.body.password, bcryptSalt)

        req.body.password = passwordHashed;

        const user = new User(req.body)

        await user.save()

        return res.status(201).json(response(true, "Usuário Criado Com Sucesso!", generateToken(user)))

    }
    catch(err){
        return res.status(500).json(response(false, err.message))
    }
    
}))

userRoute.post("/signin", expressAsyncHandler(async (req, res) => {

    try{
        
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return res.status(404).json(response(false, "Email não encontrado."))
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json(response(false, "Senha Incorreta. Tente Novamente."))
        }

        return res.status(202).json(response(true, "Login Feito Com Sucesso!", generateToken(user)))

    }
    catch(err){
        return res.status(500).json(response(false, err.message))
    }
    
}))

userRoute.get("/activities", isAuth, expressAsyncHandler(async (req, res) => {

    try{
        
        const user = await User.findOne({email: req.body.creator.email})

        if(!user){
            return res.status(404).json(response(false, "Email não encontrado."))
        }
        
        const userActivities = await user.populate("activities").then((result) => {
          return result;
        });

        return res.status(200).json(response(true, `Todas Atividades de ${user.firstName}`, userActivities))

    }
    catch(err){
        return res.status(500).json(response(false, err.message))
    }
    
}))

module.exports = userRoute