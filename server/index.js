const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3003;
const axios = require('axios')


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get("/api/products/:product_id", async (req, res) => {
  var data = [];
  await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${req.params.product_id}/related`, {
    headers: {
      Authorization: "4e0f12d22dd812dfa4c3d11d88465083830276e5",
    },
    _id: req.params.product_id
  })
    .then(async (related) => {
      console.log(related.data);

      for (var i = 0; i < related.data.length; i++) {
        await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${related.data[i]}`, {
          headers: {
            Authorization: "4e0f12d22dd812dfa4c3d11d88465083830276e5"
          }
        })
          .then(product => data.push(product.data))
          .catch(err => console.log(err))
        await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/products/${related.data[i]}/styles`, {
          headers: {
            Authorization: "a1e8950a9d8167991fdded95527d06ae0af76d54",
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
