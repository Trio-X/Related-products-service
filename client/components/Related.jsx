import React from "react";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import RelatedCard from "./RelatedCard.jsx";
import OutfitCard from "./OutfitCard.jsx";

export default class Related extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [], // The related products.
      rating: [], // All the ratings and reviews of the related products.
      modal: false,
    };
    this.clicked = this.clicked.bind(this);
  }

  products() {
    // Fetching the related products.
    axios
      .get(`http://164.90.174.150:3003/related/api/products/11048`)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reviews() {
    // Fetching the ratings and reviews of the related products.
    axios
      .get(`http://164.90.174.150:3003/related/reviews/11048`)
      .then((response) => {
        this.setState({
          rating: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clicked(e, callback) {
    e.preventDefault();
    this.setState({ modal: callback });
    console.log("clicked");
  }

  componentDidMount() {
    this.products();
    this.reviews();
  }

  render() {
    const breakPoints = [{ width: 1, itemsToShow: 4 }]; // It will control the number of cards showing up
    // in the carousel before hitting the next arrow.
    var result = [];
    var ratings = 0;
    var counter = 0;
    this.state.rating.map((el) => {
      // Getting the exact path to the star ratings
      if (el.results.length === 0) {
        // and calculating the sum of the ratings.
        result.push(0);
        ratings = 0;
        counter = 0;
      }
      el.results.map((elem) => {
        ratings += elem.rating;
        counter += 1;
        if (counter === 5) {
          result.push(ratings);
          ratings = 0;
          counter = 0;
        }
      });
    });

    return (
      <div>
        <div>
          <h1>RELATED PRODUCTS</h1>
          {/* React Carousel */}
          <Carousel breakPoints={breakPoints}>
            {this.state.data.map((element, index) => {
              return (
                <RelatedCard
                  element={element}
                  key={index}
                  rate={result[index]}
                  clicked={this.clicked}
                />
              );
            })}
          </Carousel>

          <h1>YOUR OUTFITS</h1>
          {/* React Carousel */}
          <Carousel breakPoints={breakPoints}>
            <OutfitCard />
            <OutfitCard />
            <OutfitCard />
            <OutfitCard />
          </Carousel>
        </div>
      </div>
    );
  }
}
