// ProductCollectionHeader.jsx
import React, { useState } from 'react';
import './ProductCollectionHeader.css';
import { CheckCircle, Circle, LucideSortDesc } from 'lucide-react'; // Lucide icon
import { useLocation } from 'react-router-dom';

const ProductCollectionHeader = ({  totalProducts = 90, sortByDisable }) => {
    const { pathname, search } = useLocation();
    let searchQuery;
    if(pathname.split("/")[1]==="search"){
        const queryParams = new URLSearchParams(search);
        searchQuery = queryParams.get('q');
    }

    const pathnameArr=pathname.split("/");
    const headingName=pathnameArr[pathnameArr.length-1];
    const collectionHeading=headingName.charAt(0).toUpperCase() + headingName.slice(1)
    console.log(collectionHeading);

    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('New Arrival');

    const sortOptions = [
        'Popularity',
        'New Arrival',
        'Price : High to Low',
        'Price : Low to High'
    ];

    const handleSortChange = (option) => {
        setSelectedSort(option);
        setSortOpen(false);
        // Sorting logic goes here
    };

    return (
        <div className="pch-container">
            {/* Left side */}
            <div className="pch-left">
                <h2 className="pch-title">
                    <span className="pch-term">{collectionHeading}</span>
                    {searchQuery && <span className="pch-term">Search Results For : "{searchQuery.split('+').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}"</span>}
                    <span className="pch-count">({totalProducts} Products)</span>
                </h2>
            </div>

            {/* Right side - Sort dropdown */}
            {!sortByDisable && (<div className="pch-right">
                <button
                    className="pch-sort-button"
                    onClick={() => setSortOpen(!sortOpen)}
                >
                    <LucideSortDesc size={20} className='sort-icon' />
                    <span className="pch-sort-label">Sort by :</span>
                    <span className="pch-sort-selected">{selectedSort}</span>
                </button>

                {sortOpen && (
                    <ul className="pch-dropdown">
                        {sortOptions.map((option) => (
                            <li
                                key={option}
                                className="pch-dropdown-item"
                                onClick={() => handleSortChange(option)}
                            >
                                {option == selectedSort?
                                    <CheckCircle size={18} strokeWidth={3} className='check-circle-icon' /> 
                                    :
                                    <Circle size={18} strokeWidth={3} className='check-icon' />
                                }
                                <p>{option}</p>
                            </li>
                        ))}
                    </ul>
                )}
                {sortOpen &&(
                    <div
                        className={`sortby-background-hider ${sortOpen ? "active" : ""}`}
                        onClick={() => setSortOpen(false)}></div>
                )}
            </div>)}
        </div>
    );
};

export default ProductCollectionHeader;
