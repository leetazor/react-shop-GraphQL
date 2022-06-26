import {Link} from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        {/* creates a link to a potential child or sibling element (depending on the Routes structure inside of the parent) 
         in this particular case creates a dynamic /title sub-link  */}
        <Link className="title" to={title} >{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {/* filters out all products with index equal or higher than 4 in the array of products and then maps through the new arrays of products */}
        {products        
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default CategoryPreview;