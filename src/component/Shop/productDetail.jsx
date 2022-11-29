
import { useWindowWidth } from "@react-hook/window-size";

import ProductDetailMB from "./productDetail MB";
import ProductDetailPC from "./productDetailPC";

function ProductDetail() {
  
const isMb = useWindowWidth()

if(isMb<1024){
 return <ProductDetailMB></ProductDetailMB>
}else{
  return <ProductDetailPC></ProductDetailPC>
}
}
export default ProductDetail;