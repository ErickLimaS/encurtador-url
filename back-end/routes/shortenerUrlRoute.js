const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const UrlShortened = require("../models/urlModel.js");
const User = require("../models/userModel.js");
const { generateUniqueId, response, isAuth } = require("../utils.js");

const shortenerUrlRoute = express.Router();

// returns original url
shortenerUrlRoute.get("/:id",expressAsyncHandler(async (req, res) => {
    try{
        const isIdAvailable = await UrlShortened.findOne({shortenedUrl: req.params.id});

        if (!isIdAvailable) {

          return res.status(404).json(response(false, "Não Encontrado ou Atualmente Não Disponível."))

        }

        isIdAvailable.visitors++;

        await isIdAvailable.save();

        return res.status(200).json(response(true, "Redirecionando...", isIdAvailable.originalUrl))

    }
    catch{
      return res.status(500).json(response(false, err.message));
    }
}));

// creates a shortened url 
shortenerUrlRoute.post("/create-short-url", isAuth, expressAsyncHandler(async (req, res) => {
    try {
      // if found the same url shortened previously, returns the same hash, else returns a new one
      const wasUrlShortenedBefore = await UrlShortened.findOne({originalUrl: req.body.originalUrl});

      if (wasUrlShortenedBefore) {
        req.body.shortenedUrl = wasUrlShortenedBefore.shortenedUrl;
      } else {
        req.body.shortenedUrl = generateUniqueId();
      }

      const createdNewUrl = new UrlShortened(req.body);

      // stores on user history, if it's declared on request body
      if(req.body.creator){

        const user = await User.findById(req.body.creator._id)

        user.activities.push(createdNewUrl);

        await user.save()

      }

      await createdNewUrl.save();

      return res.status(201).json(response(true, "Nova URL Criada com Sucesso!", createdNewUrl));

    } catch (err) {
      return res.status(500).json(response(false, err.message));
    }
  })
);

// deletes chosen item
shortenerUrlRoute.delete("/delete-short-url", isAuth, expressAsyncHandler(async (req, res) => {
    try{
        const user = await User.findById(req.body.creator._id).populate("activities");

        if(user.activities.find((item) => item._id == req.body._id)){
            await UrlShortened.findByIdAndDelete(req.body._id);

            return res.status(202).json(response(true, "Removido Com Sucesso!"));
        }
        else{
            return res.status(404).json(response(false, "Item Não Encontrado."));
        }

    }
    catch(err){
      return res.status(500).json(response(false, err.message));
    }
}));

module.exports = shortenerUrlRoute;
