import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import filterData from "../../assets/data/filters.json";
const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    genders: [],
    colors: [],
    sizes: [],
    materials: [],
    brands: [],
    priceRange: { min: 0, max: 0 },
  });
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  useEffect(() => {
    setFilterOptions(filterData);

    setFilter((prev) => ({
      ...prev,
      minPrice: filterData.priceRange.min,
      maxPrice: filterData.priceRange.max,
    }));
  }, []);

  const handlePriceChange = (e) => {
    const newMaxPrice = Number(e.target.value);
    const newFilter = { ...filter, maxPrice: newMaxPrice };
    setFilter(newFilter);
    updateURLParams(newFilter);
  };

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilter((prev) => {
      const updated = { ...prev };

      if (type === "checkbox") {
        const current = prev[name] || [];
        updated[name] = checked
          ? [...current, value]
          : current.filter((v) => v !== value);
      } else {
        updated[name] = value;
      }
      console.log(updated);
      updateURLParams(updated);
      return updated;
    });
  };
  useEffect(() => {
    const urlCategory = searchParams.get("category") || "";
    const urlGender = searchParams.get("gender") || "";
    const urlColor = searchParams.get("color") || "";
    const urlMinPrice =
      Number(searchParams.get("minPrice")) || filterData.priceRange.min;
    const urlMaxPrice =
      Number(searchParams.get("maxPrice")) || filterData.priceRange.max;
    const urlSize = searchParams.get("size")?.split(",") || [];
    const urlMaterial = searchParams.get("material")?.split(",") || [];
    const urlBrand = searchParams.get("brand")?.split(",") || [];

    setFilter({
      category: urlCategory,
      gender: urlGender,
      color: urlColor,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      size: urlSize,
      material: urlMaterial,
      brand: urlBrand,
    });
  }, [searchParams]);

  const updateURLParams = (filters) => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.gender) params.set("gender", filters.gender);
    if (filters.color) params.set("color", filters.color);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.size.length > 0) params.set("size", filters.size.join(","));
    if (filters.material.length > 0)
      params.set("material", filters.material.join(","));
    if (filters.brand.length > 0) params.set("brand", filters.brand.join(","));
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">FIlters</h3>
      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {filterOptions.categories.map((category) => (
          <div className="flex items-center mb-1" key={category}>
            <input
              type="radio"
              name="category"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={category}
              checked={filter.category === category}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700 ">{category}</span>
          </div>
        ))}
      </div>
      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {filterOptions.genders.map((gender) => (
          <div className="flex items-center mb-1" key={gender}>
            <input
              type="radio"
              name="gender"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={gender}
              checked={filter.gender === gender}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700 ">{gender}</span>
          </div>
        ))}
      </div>
      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {filterOptions.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => {
                setFilter((prev) => {
                  const updated = { ...prev, color };
                  updateURLParams(updated);
                  return updated;
                });
              }}
              className={`w-8 h-8 rounded-full border ${
                filter.color === color
                  ? "ring-2 ring-offset-2 ring-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Sizes</label>
        {filterOptions.sizes.map((size) => (
          <div className="flex items-center mb-1" key={size}>
            <input
              type="checkbox"
              checked={filter.size.includes(size)}
              name="size"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={size}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700 ">{size}</span>
          </div>
        ))}
      </div>
      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {filterOptions.materials.map((material) => (
          <div className="flex items-center mb-1" key={material}>
            <input
              type="checkbox"
              checked={filter.material.includes(material)}
              name="material"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={material}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700 ">{material}</span>
          </div>
        ))}
      </div>
      {/* Brands Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brands</label>
        {filterOptions.brands.map((brand) => (
          <div className="flex items-center mb-1" key={brand}>
            <input
              type="checkbox"
              checked={filter.brand.includes(brand)}
              name="brand"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={brand}
              onChange={handleFilterChange}
            />
            <span className="text-gray-700 ">{brand}</span>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          step={100}
          min={filterOptions.priceRange.min}
          max={filterOptions.priceRange.max}
          value={filter.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>₹{filter.minPrice}</span>
          <span>₹{filter.maxPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
