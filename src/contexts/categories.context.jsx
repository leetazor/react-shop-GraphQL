import { createContext, useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

//below two imports are for writing collections and products into the Firestore database - only need to do it once
//import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
//import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
   categoriesMap: {},
});

const COLLECTIONS = gql`
  query {
    collections {
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

export const CategoriesProvider = ({children}) => {
  const { loading, error, data } = useQuery(COLLECTIONS);
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    if(data) {
      const { collections } = data;
      // we are reducing over 'collections' Array from the 'data' Object,
      // to create a new Object with each category's title as a key and 'items' Array of each category as a value
      const collectionsMap = collections.reduce((acc, collection) => {
        const {title, items} = collection;
        // this adds a new key + value pair to the initial accumulator empty Object, building out an object with collection's title and items for us
        acc[title.toLowerCase()] = items;
        return acc;
      }, {});

      setCategoriesMap(collectionsMap);
    }
  }, [data]);

    const value = {categoriesMap, loading};

    return (
        <CategoriesContext.Provider value={value}>
          {children}
        </CategoriesContext.Provider>
    )
}