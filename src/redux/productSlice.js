import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "product",
    initialState:{
        Products:{
            allProducts:false,
            isFetching:false,
            error: false,
            isLoadingFinish:false
        },
        cate:{
          allCate:false,
          isFetching:false,
          error: false,
          isLoadingFinish:false
        }
       
        
    },
    reducers:{
        getProductsStart:(state)=>{
            state.Products.isFetching=true;

        },
        getProductsSuccess:(state,action)=>{
            state.Products.isFetching =false;
            state.Products.allProducts=action.payload;
            state.Products.error=false;
            state.Products.isLoadingFinish=true
        },
        getProductsFailed:(state)=>{
            state.Products.isFetching =false;          
            state.Products.error=true;
        },
        getCateStart:(state)=>{
          state.cate.isFetching=true;

      },
      getCateSuccess:(state,action)=>{
          state.cate.isFetching =false;
          state.cate.allCate=action.payload;
          state.cate.error=false;
          state.cate.isLoadingFinish=true
      },
      getCateFailed:(state)=>{
          state.Products.isFetching =false;          
          state.cate.error=true;
      },
        deleteProductStart:(state)=>{
            state.Products.isFetching=true;
        },
        deleteProductSuccess:(state,action)=>{
            state.Products.isFetching =false;
            state.Products.error=false;
            state.Products.isLoadingFinish=true;
            state.msg=action.payload
        },
        deleteProductFailed:(state,action)=>{
            state.Products.isFetching =false;          
            state.Products.error=true;
            state.msg=action.payload
        },

    }
})
export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailed,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,
    getCateStart,
  getCateSuccess,
  getCateFailed
 
} = productSlice.actions
export default productSlice.reducer