import { useWindowWidth } from "@react-hook/window-size";
import CategoriesMB from "./cateforMB";
import CategoriesPC from "./cateforPC";


function Categories() {
  

  const width = useWindowWidth()
  return(
    <>
    {width>1024?<CategoriesPC></CategoriesPC>:<CategoriesMB></CategoriesMB>}
    </>
  )
}

export default Categories;