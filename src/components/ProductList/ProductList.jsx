import ProductItem from '../ProductItem/ProductItem';

const ProductList = ({ products, error }) => {
  return (
    <>
      
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
        {error === true ? <p>{`Error ${error.errorCode}`}</p> : <div></div>}
      
    </>
  );
};
export default ProductList;
