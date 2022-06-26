import { useState, useEffect, Fragment } from 'react';

// this hook is used for generating url path from parameters
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss';

const GET_CATEGORY = gql`
query($title: String!) {
  getCollectionsByTitle(title: $title) {
  id
  title
  items {
    id
    name    
    price
    imageUrl
  }
}
}
`
const Category = () => {
  //we are de-structuring { category } from the return of useParams();
  const { category } = useParams();

  const { loading, error, data} = useQuery(GET_CATEGORY, {
    variables: {
      title: category
    }
  });

 useEffect(() => {
  if(data) {
    // nested destructuring, items get destructured from 'getCollectionsByTitle', which gets destructured off 'data'
   const {
    getCollectionsByTitle: { items }
   } = data;

   setProducts(items);
  }
 }, [category, data]);

  // we are not using an empty state here by default, instead we are using categoriesMap,
  // because by default categoriesMap is an empty object (and has no products)
  const [products, setProducts] = useState([]);

  return (
    <Fragment>
      {
        loading ? <Spinner /> :
        (
          <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">      
              {/* because we are getting our products from a database, this step is asynchronous,
              so we must only render our products based on the condition, that the products are present */}
              {products &&
                products.map((product) => <ProductCard key={product.id} product={product} /> )
              }
            </div>
          </Fragment>
        )
      }    
    </Fragment>
  )

};

export default Category;