import DirectoryItem from "../directory-item/directory-item";
import "./directory.scss";

const Directory = ({ categories }) => (
  <div className="directory-container">
    {categories.map(({ id, title, imageUrl }) => (
      <DirectoryItem id={id} title={title} imageUrl={imageUrl} />
    ))}
  </div>
);

export default Directory;
