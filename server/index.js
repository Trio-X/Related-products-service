const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3003;
const axios = require("axios");
const cors = require("cors");
const token = "6b62be346efafb380dd1297e6a12cbf825d65953";
app.use(cors());

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

// GET Request for the related products.
app.get("/related/api/products/:product_id", async (req, res) => {
  var data = [];
  await axios
    .get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.product_id}/related`,
      {
        headers: {
          Authorization: token,
        },
        _id: req.params.product_id,
      }
    )
    .then(async (related) => {
      // console.log(related.data);

      for (var i = 0; i < related.data.length; i++) {
        await axios
          .get(
            `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${related.data[i]}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((product) => data.push(product.data))
          .catch((err) => console.log(err));

        await axios
          .get(
            `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${related.data[i]}/styles`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((style) => {
            // console.log(style);
            // console.log(style.data.results[0].photos[0])
            if (style.data.results[0].photos) {
              data[i].url = style.data.results[0].photos[0];
            }
          });
      }
    })
    .catch((err) => console.log(err));
  // console.log(data);
  res.send(data);
});

// GET Request for the related products ratings and reviews.
app.get("/related/reviews/:product_id", async (req, res) => {
  var data = [];
  await axios
    .get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.product_id}/related`,
      {
        headers: {
          Authorization: token,
        },
        _id: req.params.product_id,
      }
    )
    .then(async (related) => {
      console.log(related.data);

      for (var i = 0; i < related.data.length; i++) {
        await axios
          .get(
            `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews?product_id=${related.data[i]}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((ids) => data.push(ids.data))
          .catch((err) => res.send(err));
      }
    })
    .catch((err) => console.log(err));
  // console.log(data);
  res.send(
    data.map((elem) => {
      return elem;
    })
  );
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
