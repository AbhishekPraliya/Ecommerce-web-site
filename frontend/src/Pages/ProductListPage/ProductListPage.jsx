import React, { useEffect} from 'react'
import "./ProductListPage.css"
import ProductCard from "../../Components/ProductCard/ProductCard.jsx"
import { useAuthStore } from '../../Store/useAuthStore.js'
import { Pencil, Trash2 } from 'lucide-react';
import {useSellerStore} from '../../Store/useAuthSellerStore.js'
import {useWebNavStore} from '../../Store/useWebStores/useWebNavStore.js'
const ProductListPage = () => {
    const {setIsLoadingComponent}=useWebNavStore();
    const { fetchSellerProducts, sellerProducts } = useSellerStore();
    const { authUser } = useAuthStore();

    // const [isProducts, setIsProducts] = useState(false);

    useEffect(() => {
        !sellerProducts.length && setIsLoadingComponent(true);
    },[setIsLoadingComponent,sellerProducts]);
    useEffect(() => {
        const handelFetchSellerProducts=async()=>{
            await fetchSellerProducts();
            setIsLoadingComponent(false);
        }
        // console.log("sellerProducts",sellerProducts);
        
        authUser && authUser.role==='seller' && handelFetchSellerProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchSellerProducts,authUser])
    

    return (
        <div className="product-collection-container">
            <div className='product-list-heading-container'>
                <span className="product-list-term">Product List</span>
                <span className="product-list-item-count">{`(${sellerProducts.length} Items)`}</span>
            </div>
            <div className={`product-list-container product-list-item`}>
                {sellerProducts.map((product, index) => (
                    <div className="product-card-box" key={index}>
                        <ProductCard product={product} key={index} WishListActive={true} />
                        <div className="p-l-card-bottom">
                            <button className="p-l-delete p-l-button">Delete <Trash2 size={16} /></button>
                            <button className="p-l-edit p-l-button">Edit <Pencil size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductListPage;
