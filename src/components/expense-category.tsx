import categories  from "./global";

interface Category {
    id: number;
    name: string;
}

interface Props {
    // categories: Category[];
    // onDelete: (id: number) => void;
    onSelect: (category: string) => void;
}
function Category({onSelect}:Readonly< Props>) {
    return (
        <div className="mb-3">
            <h1>Filter by Category</h1>
            <select className="form-select" id="category" aria-label="Filter expenses by category" onChange={(e) => onSelect(e.target.value)}>
                <option value="" selected>All Categories</option>
               {categories.map((category: string) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    )
}export default Category