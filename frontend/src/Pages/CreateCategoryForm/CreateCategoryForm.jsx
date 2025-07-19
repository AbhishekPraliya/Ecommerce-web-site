import React, { useEffect, useState } from "react";
import { useCategoryStore } from "../../Store/useWebStores/useCategoryStore";
import "./CreateCategoryForm.css";

const CreateCategoryForm = () => {
    const [form, setForm] = useState({
        categoryName: "",
        categoryType: "",
        categoryImage: "",
        gender: "",
        description: "",
        isActive: false,
    });

    const { categoryMap, createCategory,newCategory , fetchCategories } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCategory(form);
        fetchCategories();
        setForm({
            categoryName: "",
            categoryType: "",
            categoryImage: "",
            gender: "",
            description: "",
            isActive: false,
        });
    };

    const handleGenderChange = (genderValue) => {
        setForm((prev) => ({
            ...prev,
            gender: prev.gender === genderValue ? "" : genderValue, // toggle selection
        }));
    };

    return (
        <div className="create-category-form-container">
            <h2>Create New Category</h2>
            <form onSubmit={handleSubmit} className="create-category-form-form">
                <label className="create-category-form-label">
                    <p>Name:</p>
                    <input
                        className="create-category-form-input-box"
                        placeholder="Category Name"
                        value={form.categoryName}
                        onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
                        required
                    />
                </label>
                <label className="create-category-form-label">
                    <p>Category Type:</p>
                    <input
                        className="create-category-form-input-box"
                        placeholder="Category Type"
                        value={form.categoryType}
                        onChange={(e) => setForm({ ...form, categoryType: e.target.value })}
                        required
                    />
                </label>
                <label className="create-category-form-label">
                    <p>Category Image URL</p>
                    <input
                        className="create-category-form-input-box"
                        placeholder="Category Image URL"
                        value={form.categoryImage}
                        onChange={(e) => setForm({ ...form, categoryImage: e.target.value })}
                    />
                </label>
                <div className="create-category-form-gender">
                    <p>Gender:</p>
                    {["men", "women", "unisex"].map((g) => (
                        <label key={g}>
                            <input
                                type="checkbox"
                                className="create-category-form-checkbox"
                                checked={form.gender===g}
                                onChange={() => handleGenderChange(g)}
                            />
                            {g}
                        </label>
                    ))}
                </div>
                <label className="create-category-form-label">
                    <p>Description:</p>
                    <textarea
                        className="create-category-form-input-box"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </label>
                <br />
                <button type="submit">Create Category</button>
            </form>

            <h2>All Categories</h2>
            <div className="create-category-form-list">
                {Object.entries({...newCategory,...categoryMap}).map(([type, categories]) => (
                    <div key={type} className="create-category-form-type-block">
                        <h3>{type}</h3>
                        <ul className="create-category-form-ul">
                            {categories.map((cat) => (
                                <li key={cat._id} className="create-category-form-li">{cat.categoryName}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateCategoryForm;
