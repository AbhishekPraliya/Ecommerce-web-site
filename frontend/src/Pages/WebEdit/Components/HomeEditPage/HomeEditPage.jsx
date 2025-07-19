import React, { useEffect, useState } from "react";
import { useCategoryStore } from "../../../../Store/useWebStores/useCategoryStore.js";
import { useWebHomeStore } from "../../../../Store/useWebStores/useWebHomeStore.js";
import "./HomeEditPage.css";

export default function HomeEditPage() {
    const { categoryMap, newCategory, fetchCategories } = useCategoryStore();
    const { insertHomeData, getHomeData, homePageData } = useWebHomeStore();

    const initialGenderData = {
        headerImage: "",
        headerText: "",
        productSlider: [],
        trendingCategories: [],
        imageSlider: [],
        advertisementPanel: [],
    };

    const [genderView, setGenderView] = useState("male");
    const [homeData, setHomeData] = useState({
        male: { ...initialGenderData },
        female: { ...initialGenderData },
    });

    const [inputData, setInputData] = useState({
        imageSlider: { image: "", route: "" },
        advertisementPanel: { image: "", route: "", offerEndDate: "" },
        trendingCategories: { image: "", category: "" },
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
        
    }, [fetchCategories]);

    useEffect(() => {
        getHomeData();
    }, [getHomeData]);

    useEffect(() => {
        const updatedData = { male: {}, female: {} };
        homePageData.forEach((entry) => {
            updatedData[entry.gender] = entry.data;
        });
        setHomeData({
            male: { ...initialGenderData, ...updatedData.male },
            female: { ...initialGenderData, ...updatedData.female },
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [homePageData]);

    const handleEnter = (e, section) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newItem = { ...inputData[section] };
            setHomeData((prev) => ({
                ...prev,
                [genderView]: {
                    ...prev[genderView],
                    [section]: [...prev[genderView][section], newItem],
                },
            }));
            setInputData((prev) => ({ ...prev, [section]: { image: "", route: "", offerEndDate: "" } }));
        }
    };

    const addProductSliderCategory = (categoryId) => {
        setHomeData((prev) => ({
            ...prev,
            [genderView]: {
                ...prev[genderView],
                productSlider: [...new Set([...prev[genderView].productSlider, categoryId])],
            },
        }));
    };

    const addTrendingCategory = (image, categoryId) => {
        if (!image || !categoryId) return;
        setHomeData((prev) => ({
            ...prev,
            [genderView]: {
                ...prev[genderView],
                trendingCategories: [...prev[genderView].trendingCategories, { image, category: categoryId }],
            },
        }));
        setInputData((prev) => ({ ...prev, trendingCategories: { image: "", category: "" } }));
    };

    const removeItem = (section, index) => {
        setHomeData((prev) => ({
            ...prev,
            [genderView]: {
                ...prev[genderView],
                [section]: prev[genderView][section].filter((_, i) => i !== index),
            },
        }));
    };

    const isDataEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = ["male", "female"].map((gender) => ({
            gender,
            data: homeData[gender],
        }));

        const existingDataMap = {};
        homePageData.forEach(entry => existingDataMap[entry.gender] = entry.data);

        const noChange = ["male", "female"].every(g => isDataEqual(homeData[g], existingDataMap[g]));

        if (noChange) return alert("No changes to submit");

        setLoading(true);
        await insertHomeData(payload);
        setTimeout(() => setLoading(false), 1000);
    };

    const data = homeData[genderView];

    return (
        <div className="home-edit-outer-div">
            <form className="home-edit-form" onSubmit={handleSubmit}>
                <h2 className="home-edit-title">Home Edit Page</h2>

                <label>Add Data For Both Genders</label>
                <div className="home-edit-toggle">
                    <button type="button" className={`home-edit-page-buttons ${genderView === "male" ? "active" : "inactive"}`} onClick={() => setGenderView("male")}>Male</button>
                    <button type="button" className={`home-edit-page-buttons ${genderView === "female" ? "active" : "inactive"}`} onClick={() => setGenderView("female")}>Female</button>
                </div>

                {/* /// welcome header /// */}

                <h3 className="home-edit-sub-heading">Welcome Header</h3>
                <div style={{width:"100%",height:"200px",backgroundColor:"#ccc"}}>
                    {data.headerImage && <img style={{width:"100%",height:"100%"}} src={data.headerImage} alt="img" />}
                </div>
                <label>Header Image
                <input className="home-edit-input" type="text" placeholder="Header Image URL" value={data.headerImage} onChange={(e) => setHomeData(prev => ({ ...prev, [genderView]: { ...prev[genderView], headerImage: e.target.value } }))} />
                </label>
                <label>Header Text
                <input className="home-edit-input" type="text" placeholder="Header Text" value={data.headerText} onChange={(e) => setHomeData(prev => ({ ...prev, [genderView]: { ...prev[genderView], headerText: e.target.value } }))} />
                </label>

                <h3 className="home-edit-sub-heading">Product Slider</h3>
                <label>Click a buttons to add product-related categories to the list (shown products of that Categories to users from top to bottom)
                <div className="home-edit-category-buttons">
                    {Object.entries({ ...categoryMap, ...newCategory }).map(([type, categories]) => (
                        <div className="home-edit-page-buttons-div" key={type}><p>{type}</p>
                            {categories?.map((cat) => (
                                <button className="home-edit-page-buttons" type="button" key={cat._id} onClick={() => addProductSliderCategory(cat._id)}>
                                    {cat.categoryName}
                                </button>
                            ))}
                        </div>
                    ))}
                </div></label>


                <h3 className="home-edit-sub-heading">Trending Categories</h3>
                <div style={{width:"150px",height:"200px",backgroundColor:"#ccc",margin:"auto"}}>
                    {inputData.trendingCategories.image && <img style={{width:"100%",height:"100%"}} src={inputData.trendingCategories.image} alt="img" />}
                </div>
                <label>Categories Product Image Url
                <input className="home-edit-input" type="text" placeholder="Trending Image URL" value={inputData.trendingCategories.image} onChange={(e) => setInputData({ ...inputData, trendingCategories: { ...inputData.trendingCategories, image: e.target.value } })} />
                </label>

                <label>Select The Category Name (and click on the button)
                    <select className="home-edit-input" value={inputData.trendingCategories.category} onChange={(e) => setInputData({ ...inputData, trendingCategories: { ...inputData.trendingCategories, category: e.target.value } })}>
                        <option value="">--Select Category--</option>
                        {Object.entries({ ...newCategory, ...categoryMap }).map(([type, categories]) => (
                            categories?.map((cat) => (
                                <option key={cat._id + type} value={cat._id}>{cat.categoryName}</option>
                            ))
                        ))}
                    </select>
                </label>
                <button className="home-edit-page-buttons" type="button" onClick={() => addTrendingCategory(inputData.trendingCategories.image, inputData.trendingCategories.category)}>
                    Add Trending Category
                </button>

                <h3 className="home-edit-sub-heading">Image Slider</h3>
                <div style={{width:"200px",height:"200px",backgroundColor:"#ccc",margin:"auto"}}>
                    {inputData.imageSlider.image && <img style={{width:"100%",height:"100%"}} src={inputData.imageSlider.image} alt="img" />}
                </div>
                <label>Image Url (Image Should be Square in Shape)
                <input className="home-edit-input" type="text" placeholder="Image URL" value={inputData.imageSlider.image} onChange={(e) => setInputData({ ...inputData, imageSlider: { ...inputData.imageSlider, image: e.target.value } })} onKeyDown={(e) => handleEnter(e, "imageSlider")} />
                </label>
                <label>Route link
                    use '--' (for category '/categoryName'), (for offer '/offer--offerName'), (for discount '/discount--30--40' 30% to 40%)
                    Eg:- ('/t-shirt-for-men'),('/offer--bye-2-for-999'),('/discount--30-40')
                <input className="home-edit-input" type="text" placeholder="Route" value={inputData.imageSlider.route} onChange={(e) => setInputData({ ...inputData, imageSlider: { ...inputData.imageSlider, route: e.target.value } })} onKeyDown={(e) => handleEnter(e, "imageSlider")} />
                </label>

                <h3 className="home-edit-sub-heading">Advertisement Panel</h3>
                <div style={{width:"100%",height:"200px",backgroundColor:"#ccc"}}>
                    {inputData.advertisementPanel.image && <img style={{width:"100%",height:"100%"}} src={inputData.advertisementPanel.image} alt="img" />}
                </div>
                <label>Advertisement Image
                <br />
                <input className="home-edit-input" type="text" placeholder="Add Image URL" value={inputData.advertisementPanel.image} onChange={(e) => setInputData({ ...inputData, advertisementPanel: { ...inputData.advertisementPanel, image: e.target.value } })} onKeyDown={(e) => handleEnter(e, "advertisementPanel")} />
                </label>
                <label><b>Route link</b> use '--' (for category '/categoryName'), (for offer '/offer--offerName'), (for discount '/discount--30--40' 30% to 40%)<br/>
                Eg:- ('/t-shirt-for-men'),('/offer--bye-2-for-999'),('/discount--30-40')
                    <br/>
                    <input className="home-edit-input" type="text" placeholder="Route" value={inputData.advertisementPanel.route} onChange={(e) => setInputData({ ...inputData, advertisementPanel: { ...inputData.advertisementPanel, route: e.target.value } })} onKeyDown={(e) => handleEnter(e, "advertisementPanel")} />
                </label>
                <label>Advertisement Ending Date
                    <br/>
                    <input className="home-edit-input" type="date" value={inputData.advertisementPanel.offerEndDate} onChange={(e) => setInputData({ ...inputData, advertisementPanel: { ...inputData.advertisementPanel, offerEndDate: e.target.value } })} onKeyDown={(e) => handleEnter(e, "advertisementPanel")} />
                </label>

                <div className="home-edit-submit-row">
                    <button type="submit" className="home-edit-submit-button" style={{ backgroundColor: loading ? "black" : "green" }} disabled={loading}>
                        {loading ? "Saving..." : "Submit"}
                    </button>
                </div>

                <div className="home-edit-preview">
                    <h4>Preview - {genderView}:</h4>
                    <p><strong>Header:</strong> {data.headerText}</p>

                    <h5>Product Slider Categories:</h5>
                    <ul>
                        {data?.productSlider?.length && data.productSlider.map((catId, i) => {
                            // console.log("cat",catId);
                            return (
                            <li key={i}>{`Id${i+1}->`+catId}<button onClick={() => removeItem("productSlider", i)}>×</button></li>
                        )})}
                    </ul>

                    <h5>Trending Categories:</h5>
                    <ul style={{padding:"0",margin:"0",width:"100%",display:"flex",gap:"3px",overflowX:"scroll"}}>
                        {data.trendingCategories.map((item, i) => {
                            // console.log(JSON.stringify(item.category));
                            return (
                            <li style={{listStyle:"none",width:"fit-content"}} key={i}>
                                <button onClick={() => removeItem("trendingCategories", i)}>×</button>
                                {i+1}
                                <div style={{width:"150px",height:"220px",backgroundColor:"#ccc",display:"inline-block"}}>
                                    {item.category}
                                    {item.image && <img style={{width:"100%",height:"100%"}} src={item.image} alt="img" />}
                                </div>
                            </li>
                        )})}
                    </ul>

                    <h5>Image Slider:</h5>
                    <ul style={{padding:"0",margin:"0",width:"100%",display:"flex",gap:"3px",overflowX:"scroll"}}>
                        {data.imageSlider.map((item, i) => (
                            <li style={{listStyle:"none",width:"fit-content"}} key={i}>
                                <button onClick={() => removeItem("imageSlider", i)}>×</button>
                                {i+1}
                                <div style={{width:"200px",height:"220px",backgroundColor:"#ccc",display:"inline-block"}}>
                                    {item.route}
                                    {item.image && <img style={{width:"100%",height:"100%"}} src={item.image} alt="img" />}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h5>Advertisement Panel:</h5>
                    <ul>
                        {data.advertisementPanel.map((item, i) => (
                            <li key={i}>
                                <button onClick={() => removeItem("advertisementPanel", i)}>×</button>
                                {i+1}
                                <div style={{width:"100%",height:"200px"}}>
                                    {item.image && <img style={{width:"100%",height:"100%"}} src={item.image} alt="img" />}
                                </div>
                                <p>{'route-('+item.route+'), Ending Date-('+item.offerEndDate+")"}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    );
}
