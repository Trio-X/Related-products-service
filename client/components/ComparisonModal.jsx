import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',             // Default parameters of the React Modal.
        bottom: 'auto',            // Changing them would change the position of the pop-up.                
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default function ComparisonModal() {
    // React Modal
    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = 'grey';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Comparison Modal"
            >

                <h4 ref={_subtitle => (subtitle = _subtitle)}>Comparing</h4>

                {/* Comparison Table */}
                <table> 
                    <tr>
                        <th>Product Short Name</th>
                        <th></th>
                        <th>Product Short Name</th>
                    </tr>
                    <tr>
                        <td><i class="fa fa-check"></i></td>
                        <td>Feature</td>
                        <td><i class="fa fa-check"></i></td>
                    </tr>
                    <tr>
                        <td><i class="fa fa-check"></i></td>
                        <td>Feature</td>
                        <td><i class="fa fa-check"></i></td>
                    </tr>
                    <tr>
                        <td><i class="fa fa-check"></i></td>
                        <td>Feature</td>
                        <td><i class="fa fa-check"></i></td>
                    </tr>
                    <tr>
                        <td><i class="fa fa-check"></i></td>
                        <td>Feature</td>
                        <td><i class="fa fa-check"></i></td>
                    </tr>
                    <tr>
                        <td><i class="fa fa-check"></i></td>
                        <td>Feature</td>
                        <td><i class="fa fa-check"></i></td>
                    </tr>
                </table>

            </Modal>
        </div>
    );
}

