const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const UrlShortened = require("../models/urlModel.js");
const { generateUniqueId, response } = require("../utils.js");

const shortenerUrlRoute = express.Router();

// returns original url
shortenerUrlRoute.get("/:id",expressAsyncHandler(async (req, res) => {
    try{
        const isIdAvailable = await UrlShortened.findOne({shortenedUrl: req.params.id});

        if (!isIdAvailable) {

            return res.status(404).json(response(false, "Não Encontrado ou Atualmente Não Disponível."))

        }

        return res.status(200).json(response(true, "Redirecionando...", isIdAvailable.originalUrl))

    }
    catch{
      return res.status(500).json(response(false, err.message));
    }
})
);

// creates a shortened url 
shortenerUrlRoute.post("/create-short-url",expressAsyncHandler(async (req, res) => {
    try {
      // if found the same url shortened previously, returns the same hash, else returns a new one
      const wasUrlShortenedBefore = await UrlShortened.findOne({originalUrl: req.body.originalUrl});

      if (wasUrlShortenedBefore) {
        req.body.shortenedUrl = wasUrlShortenedBefore.shortenedUrl;
      } else {
        req.body.shortenedUrl = generateUniqueId();
      }

      const createdNewUrl = new UrlShortened(req.body);

      await createdNewUrl.save();

      return res.status(201).json(response(true, "Nova URL Criada com Sucesso!", createdNewUrl));

    } catch (err) {
      return res.status(500).json(response(false, err.message));
    }
  })
);

module.exports = shortenerUrlRoute;
