import React, { useRef } from 'react';
import './ProductSlider.css';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import {useNavigate} from 'react-router-dom';
import {useDataStore} from '../../Store/useDataStore.js';
import { useState } from 'react';
import { useEffect } from 'react';

// let gender = localStorage.getItem("WebGender");

const ProductSlider = ({categoryId,categoryObj}) => {
    const scrollRef = useRef();
    const navigate = useNavigate();
    const {products} = useDataStore();
    const [gender, setGender] = useState()

    useEffect(() => {
    let storedGender = localStorage.getItem("WebGender");
    setGender(storedGender)
    }, [])
    

    const scroll = (direction) => {
        const containerWidth = scrollRef.current.offsetWidth;
        let cardsPerView = 5;

        if (window.innerWidth <= 350) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 500) {
            cardsPerView = 2;
        } else if (window.innerWidth <= 750) {
            cardsPerView = 3;
        } else if (window.innerWidth <= 1000) {
            cardsPerView = 4;
        }

        const cardWidth = containerWidth / cardsPerView;

        scrollRef.current.scrollBy({
            left: direction === 'left' ? -cardWidth : cardWidth,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="card-container">
                <div className='card-container-heading'>
                    <h2 className='heading-text'>{categoryObj[categoryId].toUpperCase().split("-").join(" ")} FOR {gender==="female"?"WOMEN":"MEN"}</h2>
                </div>

                <button className="arrow left" onClick={() => scroll('left')}><ChevronLeft className='arrow-icon'/></button>

                <div className="product-scroll-wrapper" ref={scrollRef}>
                    {products.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>

                <button className="arrow right" onClick={() => scroll('right')}><ChevronRight className='arrow-icon'/></button>
                
                <div className='bottom-label'>
                    <p
                        className='bottom-label-text'
                        onClick={()=>navigate('/collection/category1')}
                    >Discover More</p>
                </div>
            </div>
        </>
    );
};

export default ProductSlider;
