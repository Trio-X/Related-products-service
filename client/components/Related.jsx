import React from 'react';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
import RelatedCard from "./RelatedCard.jsx";
import OutfitCard from "./OutfitCard.jsx";


export default class Related extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      reviews: {}
    };
  };

  products() {
    axios
      .get(`/api/products/11048`)
      .then((response) => {
        this.setState({
          data: response.data,
        });
        console.log('related products ==>', this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  reviews() {
    axios
      .get(`/reviews/11048`)
      .then(({ data }) => {
        this.setState({ reviews: data });
        console.log('reviews of 1 product ==>', data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.products()
    this.reviews()
  };

  render() {
    const breakPoints = [{ width: 1, itemsToShow: 4 }];

    return (
      <div>
        <div>
          <h1>RELATED PRODUCTS</h1>
          <Carousel breakPoints={breakPoints}>
            {this.state.data.map((element, index) => {
              return <RelatedCard element={element} key={index} reviews={this.state.reviews} />
            })}
          </Carousel>
        </div>
        <div>
          <h1>YOUR OUTFIT</h1>
          <Carousel breakPoints={breakPoints}>
            {this.state.data.map((element, index) => {
              return <OutfitCard element={element} key={index} />
            })}
          </Carousel>
        </div>
      </div>
    )
  }
};
