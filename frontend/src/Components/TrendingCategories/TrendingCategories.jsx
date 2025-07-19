import React from 'react';
import './TrendingCategories.css';
import { useNavigate } from 'react-router-dom';


// const categoryData = Array.from({ length: 10 }, (_, i) => ({
//     name: `Category${i + 1} Abcdefgh hhhhhkk`,
//     image: `./category-image.png`, // Use public folder or adjust path if imported
// }));

const TrendingCategories = ({ trendingCategories,categoryObj }) => {
    // const {navigate}= useNavigate();
    const navigate = useNavigate();
    

    return (
        <div className="trending-categories">
            <h2 className="categories-heading">Trending Categories</h2>
            <div className="categories-grid">
                {trendingCategories?.slice(0, 6).map((cat, index) => {
                    return (
                        <div className="category-item" key={index}>
                            <img
                                src={cat.image} alt={cat.name}
                                className="category-image"
                                onClick={() => navigate(`/collection/${categoryObj[cat.category]}`)}
                            />
                            <p
                                onClick={() => navigate(`/collection/${categoryObj[cat.category]}`)}
                                className="category-name"
                            >{categoryObj[cat.category]}</p>
                        </div>
                    )
                })}
            </div>
            <div className='bottom-label'>
                <p
                    className='bottom-label-text'
                    onClick={() => navigate('/men--clothing--all')}
                >View All</p>
            </div>
        </div>
    );
};

export default TrendingCategories;
