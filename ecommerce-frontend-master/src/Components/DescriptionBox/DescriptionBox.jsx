import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Review (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>Discover the latest trends in fashion with our exclusive collection of clothing.
                    From elegant dresses to casual wear, our range offers something for every occasion.
                    Experience the perfect blend of comfort and style with high-quality fabrics and impeccable designs.
                    Shop now and elevate your wardrobe with our must-have pieces!</p>

            </div>
        </div>
    )
}

export default DescriptionBox;