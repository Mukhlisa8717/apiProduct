import React, { useState } from "react";
import { useGetInputValue } from "../../hooks/useGetInputValue";
import { useGetCategoryQuery } from "../../context/api/categoryApi";
import { useCreateProductMutation } from "../../context/api/productApi";
import LocalImages from "../../components/localImages/LocalImages";
import "./CreateProduct.scss";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  price: "",
  oldPrice: "",
  category: "",
  units: "",
  description: "",
  info: "",
};

const CreateProduct = () => {
  const [files, setFiles] = useState("");
  const { formData, handleChange, setFormData } =
    useGetInputValue(initialState);
  const { data } = useGetCategoryQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();

const handleCreateProduct = (e) => {
  e.preventDefault();
  let form = new FormData();

  form.append("title", formData.title);
  form.append("price", formData.price);
  form.append("oldPrice", formData.oldPrice);
  form.append("category", formData.category);
  form.append("units", formData.units);
  form.append("description", formData.description);
  form.append("info", JSON.stringify({}));

  Array.from(files).forEach((img) => {
    form.append("files", img, img.name);
  });

  createProduct(form)
    .then(() => {
      setFormData(initialState);
      setFiles("");
      toast.success("Product created")
    })
    .catch((error) => {
      toast.error("Error creating product");
      console.error("Error creating product:", error);
    });
};


  let categoryItem = data?.data?.map((category) => (
    <option key={category.id} value={category.title}>
      {category.title}
    </option>
  ));

  return (
    <main>
      <form onSubmit={handleCreateProduct} className="create">
        <h2>Create Product</h2>
        <br />
        <hr />
        <br />
        <div className="create__item">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            value={formData.title}
            onChange={handleChange}
            autoComplete="off"
            type="text"
            name="title"
            placeholder="Title..."
            required
          />
        </div>
        <div className="create__item">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            value={formData.price}
            onChange={handleChange}
            autoComplete="off"
            type="number"
            name="price"
            placeholder="Price"
            required
          />
        </div>
        <div className="create__item">
          <label htmlFor="oldPrice">Old Price:</label>
          <input
            id="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            autoComplete="off"
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            required
          />
        </div>
        <div className="create__selects">
          <div className="create__selects-item">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              name="category"
              required
            >
              {categoryItem}
            </select>
          </div>
          <div className="create__selects-item">
            <label htmlFor="units">Units:</label>
            <select
              id="units"
              value={formData.units}
              onChange={handleChange}
              name="units"
              required
            >
              <option value="kg">kg</option>
              <option value="gr">gr</option>
              <option value="piece">piece</option>
            </select>
          </div>
        </div>
        <div className="create__item">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            name="description"
            required
            placeholder="Description..."
          ></textarea>
        </div>
        <div className="create__item">
          <label htmlFor="info">Info:</label>
          <textarea
            id="info"
            value={formData.info}
            onChange={handleChange}
            name="info"
            required
            placeholder="Info..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="create_input" className="create__image">
            <input
              id="create_input"
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              multiple
              accept="image/*"
            />
          </label>
          <LocalImages files={files} setFiles={setFiles} />
        </div>
        <button disabled={isLoading}>Create</button>
      </form>
    </main>
  );
};

export default CreateProduct;
