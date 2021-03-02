import React from "react";
import StarRatings from 'react-star-ratings';

const RelatedCard = ({ element }) => {

    return (
        // This DIV will hold 1 of the Related products cards.
        <div className="card-product">

            <div>
                <span className="far fa-star card-star-top"></span>
                <img className="card-image" src={element.url.url}></img>
            </div>

            <div className="card-category">{element.category}</div>
            <div className="card-title">{element.name}</div>
            <span className="card-price">${element.default_price}</span> <br /><br />
            {/* React star rating */}
            <div className='card-star-rating'>
                <StarRatings
                    rating={0}
                    name='rating'
                    starDimension="25px"
                    starSpacing="1px"
                    starRatedColor="orange"
                    numberOfStars={5}
                />
            </div>

        </div>
    )
};

export default RelatedCard;
