import { useWindowWidth } from "@react-hook/window-size";
import CheckOutMB from "./check_out_MB";
import CheckOutPC from "./check_out_PC";

function CheckOut() {
        const width = useWindowWidth()

    if( width<1024){
      return(
        <>
        <CheckOutMB></CheckOutMB>
        </>
      )

    }else{
      return(
        <>
        <CheckOutPC></CheckOutPC>
        </>
      )
    }
}

export default CheckOut;