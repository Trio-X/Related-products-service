const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config()
const app = express();
const port = process.env.PORT;
const axios = require('axios')


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get("/api/products/:product_id", async (req, res) => {
  var data = [];
  await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.product_id}/related`, {
    headers: {
      Authorization: process.env.TOKEN,
    },
    _id: req.params.product_id
  })
    .then(async (related) => {
      console.log(related.data);

      for (var i = 0; i < related.data.length; i++) {
        await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${related.data[i]}`, {
          headers: {
            Authorization: process.env.TOKEN
          }
        })
          .then(product => data.push(product.data))
          .catch(err => console.log(err))
        await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${related.data[i]}/styles`, {
          headers: {
            Authorization: process.env.TOKEN,
          }
        }
        )
          .then(style => {
            console.log(style);
            console.log(style.data.results[0].photos[0])
            if (style.data.results[0].photos) {
              data[i].url = style.data.results[0].photos[0]
            }
          })
      }
    })
    .catch(err => console.log(err))
  console.log(data);
  res.send(data)
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
