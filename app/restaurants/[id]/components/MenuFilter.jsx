export default function MenuFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
        <div className="tab tabs-wrapper">
            {categories.map((category, index) => (
                <button
                    key={index}
                    className={`detailstablinks ${
                        category === selectedCategory ? "active" : ""
                    }`}
                    onClick={() => onCategoryChange(category)}
                >
                    <span>{category}</span>
                </button>
            ))}
        </div>
    );
}