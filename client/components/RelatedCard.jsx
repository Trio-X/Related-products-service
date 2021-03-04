import React from "react";
import StarRatings from "react-star-ratings";
import Modal from "react-modal";

const RelatedCard = ({ element, rate, clicked }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto", // Default parameters of the React Modal.
      bottom: "auto", // Changing them would change the position of the pop-up.
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  module.exports.openModal = openModal;
  function afterOpenModal() {
    subtitle.style.color = "grey";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    // This DIV will hold 1 of the products cards.
    <div className="card-product">
      <div>
        <span
          className="far fa-star card-star-top"
          onClick={() => openModal()}
        ></span>
        <img className="card-image" src={element.url.url}></img>
      </div>
      <div className="card-category">{element.category}</div>
      <div className="card-title">{element.name}</div>
      <span className="card-price">${element.default_price}</span> <br />
      <br />
      {/* React star rating */}
      <div className="card-star-rating">
        <StarRatings
          // /5 to get the average
          rating={rate / 5}
          name="rating"
          starDimension="25px"
          starSpacing="1px"
          starRatedColor="orange"
          numberOfStars={5}
        />
      </div>
      <div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Comparison Modal"
          >
            <h4 ref={(_subtitle) => (subtitle = _subtitle)}>Comparing</h4>

            {/* Comparison Table */}
            <table>
              <tr>
                <th>First Product</th>
                <th></th>
                <th>Second Product</th>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-check"></i>
                </td>
                <td>Size</td>
                <td>
                  <i class=""></i>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-check"></i>
                </td>
                <td>Quantity</td>
                <td>
                  <i class="fa fa-check"></i>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-check"></i>
                </td>
                <td>Colors</td>
                <td>
                  <i class=""></i>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-check"></i>
                </td>
                <td>Feature X</td>
                <td>
                  <i class="fa fa-check"></i>
                </td>
              </tr>
              <tr>
                <td>
                  <i class=""></i>
                </td>
                <td>Feature Y</td>
                <td>
                  <i class="fa fa-check"></i>
                </td>
              </tr>
            </table>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RelatedCard;
