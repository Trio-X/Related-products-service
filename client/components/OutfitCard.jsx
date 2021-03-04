import React from "react";
import StarRatings from "react-star-ratings";

const OutfitCard = () => {
  return (
    // This DIV will hold 1 of the Outfit cards.
    <div className="card-product">
      <div>
        <span className="far fa-times-circle card-x-top"></span>
        <img
          className="card-image"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"
        ></img>
      </div>
      <div className="card-category">Category</div>
      <div className="card-title">Product Name</div>
      <span className="card-price">Price</span> <br />
      <br />
      {/* React star rating */}
      <div className="card-star-rating">
        <StarRatings
          rating={0}
          name="rating"
          starDimension="25px"
          starSpacing="1px"
          starRatedColor="orange"
          numberOfStars={5}
        />
      </div>
    </div>
  );
};

export default OutfitCard;
