import CategoryItem from "../category-item/category-item";
import "./directory.scss";

const Directory = ({ categories }) => (
  <div className="directory-container">
    {categories.map(({ id, title, imageUrl }) => (
      <CategoryItem id={id} title={title} imageUrl={imageUrl} />
    ))}
  </div>
);

export default Directory;
