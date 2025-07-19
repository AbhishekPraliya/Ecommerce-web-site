import { useState } from "react";
import { useWebNavStore } from "../../../../Store/useWebStores/useWebNavStore.js";
import "./NavEdit.css";

const NavEdit = () => {
    const [logoImage, setLogoImage] = useState("");
    const [logoText, setLogoText] = useState("");
    const [applicationName, setApplicationName] = useState("");

    // const [topNavInput, setTopNavInput] = useState("");
    const [bottomNavInput, setBottomNavInput] = useState("");
    // const [topNavItems, setTopNavItems] = useState([]);
    const [bottomNavItems, setBottomNavItems] = useState([]);
    const {
        updateLogo,
        // updateTopNavItems,
        updateBottomNavItems
    } = useWebNavStore();

    const handleLogoSubmit = async (e) => {
        e.preventDefault();
        const logoData = {
            logoImage:logoImage.trim(),
            logoText:logoText.trim(),
            applicationName:applicationName.trim(),
        };
        await updateLogo(logoData);
        console.log("Logo Data:", logoData);
    };

    // const handleTopNavSubmit = async(e) => {
    //     e.preventDefault();
    //     console.log("Top Nav Items:", topNavItems);
    //     await updateTopNavItems(topNavItems)
    //     handleClearItems(setTopNavItems)
    // };

    const handleBottomNavSubmit = async(e) => {
        e.preventDefault();
        console.log("Bottom Nav Items:", bottomNavItems);
        await updateBottomNavItems(bottomNavItems);
        handleClearItems(setBottomNavItems)
    };

    const handleAddItem = (input, setItems, inputSetter) => {
        if (!input.includes(",")) return;
        const [rawName, rawRoute] = input.split(",");
        const name = rawName.trim();
        const route = rawRoute.trim().replace(/\s+/g, "-");
        if (name && route) {
            setItems((prev) => [...prev, { name, route }]);
            inputSetter("");
        }
    };

    const handleClearItems = (setItems) => {
        setItems([]);
    };

    const handleKeyDown = (e, input, setItems, inputSetter) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddItem(input, setItems, inputSetter);
        }
    };

    return (
        <div className="web-edit-main-container">
            <div className="web-edit-inner-div">
                {/* LOGO SECTION */}
                <div className="web-edit-first-div">
                <h2 className="web-edit-section-heading">Logo</h2>
                    <form className="web-edit-navbar-form" onSubmit={handleLogoSubmit}>
                        <div className="web-edit-form-box">
                            <label className="web-edit-label">
                                Logo Image URL:
                                <input
                                    type="text"
                                    className="web-edit-input"
                                    value={logoImage}
                                    onChange={(e) => setLogoImage(e.target.value)}
                                    placeholder="Enter logo image URL"
                                />
                            </label>

                            <label className="web-edit-label">
                                Logo Text:
                                <input
                                    type="text"
                                    className="web-edit-input"
                                    value={logoText}
                                    onChange={(e) => setLogoText(e.target.value)}
                                    placeholder="Enter logo text"
                                />
                            </label>

                            <label className="web-edit-label">
                                Application Name:
                                <input
                                    type="text"
                                    className="web-edit-input"
                                    value={applicationName}
                                    onChange={(e) => setApplicationName(e.target.value)}
                                    placeholder="Enter application name"
                                />
                            </label>

                            <button type="submit" className="web-edit-submit-button">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* NAV ITEMS SECTION */}
                <h2 className="web-edit-section-heading">Nav-Items</h2>
                <div className="web-edit-second-div">


                        {/* Top Nav Form */}
                    {/* <form className="web-edit-nav-form" onSubmit={handleTopNavSubmit}>
                        <div className="web-edit-nav-subform">
                            <label className="web-edit-label">
                                Top Nav Item (e.g., MEN, /men):
                                <input
                                    type="text"
                                    className="web-edit-input"
                                    value={topNavInput}
                                    onChange={(e) => setTopNavInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        handleKeyDown(e, topNavInput, setTopNavItems, setTopNavInput)
                                    }
                                />
                            </label>
                            <div className="web-edit-button-group">
                                <button
                                    type="button"
                                    className="web-edit-add-button"
                                    onClick={() =>
                                        handleAddItem(topNavInput, setTopNavItems, setTopNavInput)
                                    }
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="web-edit-clear-button"
                                    onClick={() => handleClearItems(setTopNavItems)}
                                >
                                    Clear
                                </button>
                            </div>
                            <ul className="web-edit-items-list">
                                {topNavItems.map((item, idx) => (
                                    <li key={idx}>{`${item.name} → ${item.route}`}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <button type="submit" className="web-edit-submit-button">
                            Submit Top Nav Items
                        </button>
                    </form> */}


                    {/* Bottom Nav Form */}
                    <form className="web-edit-nav-form" onSubmit={handleBottomNavSubmit}>
                        <div className="web-edit-nav-subform">
                            <label className="web-edit-label">
                                Bottom Nav Item (e.g., Offers, /offers):
                                <input
                                    type="text"
                                    className="web-edit-input"
                                    value={bottomNavInput}
                                    onChange={(e) => setBottomNavInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        handleKeyDown(
                                            e,
                                            bottomNavInput,
                                            setBottomNavItems,
                                            setBottomNavInput
                                        )
                                    }
                                />
                            </label>
                            <div className="web-edit-button-group">
                                <button
                                    type="button"
                                    className="web-edit-add-button"
                                    onClick={() =>
                                        handleAddItem(
                                            bottomNavInput,
                                            setBottomNavItems,
                                            setBottomNavInput
                                        )
                                    }
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="web-edit-clear-button"
                                    onClick={() => handleClearItems(setBottomNavItems)}
                                >
                                    Clear
                                </button>
                            </div>
                            <ul className="web-edit-items-list">
                                {bottomNavItems.map((item, idx) => (
                                    <li key={idx}>{`${item.name} → ${item.route}`}</li>
                                ))}
                            </ul>
                        </div>

                        <button type="submit" className="web-edit-submit-button">
                            Submit Bottom Nav Items
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NavEdit;
