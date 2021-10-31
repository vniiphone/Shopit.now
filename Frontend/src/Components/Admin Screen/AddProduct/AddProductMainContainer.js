import React, { Component } from 'react';
import axios from 'axios';
import api from '../../../api/api-endpoints.json'
import dummyImage from '../../../Images/camera.png';
import {getJwt} from '../../../services/LoginReg';

class AddProductMainContainer extends Component {

    constructor(props){
        super(props); 
        this.imageUploadError = React.createRef();
        this.logoError=React.createRef();
        this.moreThanFiveError=React.createRef();
        this.helpError=React.createRef();
        this.productImageError=React.createRef();
        this.goBackChange=React.createRef();
        this.helpChange=React.createRef();
    }

    state = {
        logoImage:dummyImage,
        thumbnail:null,
        productImage:dummyImage,
        allproductImages:[],
        loading:false,
        beforeSuccess:false,
        uploadNote:null,
        uploadFail:false,
        submitImages:[],
        uploadLen:0
     }
     componentDidMount(){
        this.props.handleSelectedScreen("Add Product");
     }

    handleLogoChange=(e)=>{
        if(e.target.files[0]){
            const {size,type}=e.target.files[0];
            this.imageUploadErrorRemove();
            if(this.imageValidation(size,type)){
                const reader=new FileReader();
                reader.onload=()=>{
                    if(reader.readyState===2){
                        this.setState({logoImage:reader.result, thumbnail:e.target.files[0]});
                    }
                }
                reader.readAsDataURL(e.target.files[0])
            }else{
                this.setState({logoImage:dummyImage});
            }
        }else return ;
    }
    
    imageValidation=(size,type)=>{
        this.imageUploadErrorRemove();
        const allowedTypes=["jpeg","png","jpg"];
        const allowedSize=1000000;
        const imageType=type.split("/");
        if(!(allowedTypes.includes(imageType[1]))){
            const errorMsg="Should be .jpeg or .png";
            this.imageUploadErrorAdd(errorMsg);
            return false;
        }else if(size>=allowedSize){
            const errorMsg="Should be less than 1mb";
            this.imageUploadErrorAdd(errorMsg);
            return false;
        }else{
            this.imageUploadErrorRemove();
            this.logoError.current.classList.remove("product-logo-error-visible");
            return true;
        }
    }

    imageUploadErrorAdd=(errorMsg)=>{
        this.imageUploadError.current.innerHTML=errorMsg;
        this.imageUploadError.current.classList.add("product-image-upload-error-display");
    }

    imageUploadErrorRemove=()=>{
        this.imageUploadError.current.classList.remove("product-image-upload-error-display");
    }

    handleProductSubmit=(value)=>{
        const {allproductImages,logoImage}= this.state;
        if(allproductImages.length!==4)
            this.handleProductImageErrors()
        else
            this.handleProductImageErrorsRemove();
        if(!this.productImageCheck()){
            this.logoError.current.classList.add("product-logo-error-visible");
        }
        else{
            this.logoError.current.classList.remove("product-logo-error-visible");
        }
        if(allproductImages.length===4 && logoImage!==dummyImage){
            this.setState({loading:true});
            this.setState({uploadNote:"Uploading Product Details.."})
            this.uploadTheFile(value);   
        }
    }
    productImageCheck=()=>{
        const {logoImage}=this.state;
        if(logoImage===dummyImage){
            return false;
        }
        return true;
    }
    uploadTheFile=async(data)=>{
        const {thumbnail,submitImages}=this.state;
        const thumbnailImage = new FormData();
        thumbnailImage.append('thumbnailFile',thumbnail,thumbnail.name);
        const product={
            title:data.title,
            price:data.price,
            category:data.category,
            inStock:0,
            trending:false,
            productRatings:{
                overallRating:0,
                usersReviews:[]
            }
        }
        const allimages=new FormData();
        for(let i of submitImages){
            allimages.append("imageFiles",i);
        }

        await axios.post(`${api.productAddApi}`,product,{
            headers:{'Authorization':getJwt()}
        }).then(({data})=>{
            this.setState({uploadNote:"Uploading the Thumbnail...Hold On..."});
            this.sendThumbnailRequest(data,thumbnailImage,allimages);
        }).catch(()=>{
            this.setState({uploadNote:"Product details submission failed...",uploadFail:true});
        });
    }
    sendThumbnailRequest=async(id,thumbnailImage,allimages)=>{
        await axios.post(`${api.productAddApi}/thumbnail-image/${id}`,thumbnailImage,{
            headers:{'Authorization':getJwt()}
        }).then(()=>{
            this.setState({uploadNote:"Just a min...Uploading the Product Images.."});
            this.sendProductImagesRequest(id,allimages);
        }).catch(()=>{
            this.setState({uploadNote:"Thumbnail upload failed...",uploadFail:true});
        });
    }
    sendProductImagesRequest=async(id,allimages)=>{
        await axios.post(`${api.productAddApi}/product-images/${id}`,allimages,{
            headers:{'Authorization':getJwt()}
        }).then(()=>{
            this.setState({beforeSuccess:true,uploadNote:null});
        }).catch(()=>{
            this.setState({uploadNote:"Image upload failed...",uploadFail:true});
        });
    }

    handleHelp=()=>this.helpError.current.classList.toggle("help-container-details-visible");
    
    handleProductImageErrors=()=>{
        this.productImageError.current.classList.add("product-image-errors-display");
    }
    handleProductImageErrorsRemove=()=>{
        this.productImageError.current.classList.remove("product-image-errors-display");
    }

    handleProductImages=(e)=>{
        if(e.target.files.length){
            const images= e.target.files;
            this.storeProductImages(images);
        }else return ;
    }

    storeProductImages=(images)=>{        
        const {allproductImages}=this.state;
        const storedLen=allproductImages.length;
        const imgLen=images.length;
        let l=0;
        if(imgLen>=4){
            l=4-storedLen;
            if(imgLen+storedLen>4){ 
                this.moreImageSelectionError();
                this.handleProductImageErrorsRemove();
            }
        }else{
            if((imgLen+storedLen)<=4){ l=imgLen;
                if(imgLen+storedLen===4) this.handleProductImageErrorsRemove();
                else if(imgLen+storedLen<4) this.handleProductImageErrors();
            }
            else l=imgLen-((imgLen+storedLen)-4)-4;
        }
        for(let i=0;i<l;i++){
            const reader=new FileReader();
            reader.readAsDataURL(images[i]); 
            reader.onload=()=>{
                if(reader.readyState===2) {
                    if(this.imageValidation(images[i].size,images[i].type)){
                        this.setState({allproductImages:[...this.state.allproductImages,reader.result],submitImages:[...this.state.submitImages,images[i]]});
                    }
                }
            }
        }        
    }

    removeProductImage=(position)=>{
        const {allproductImages,submitImages}=this.state;
        const updateProductImages=allproductImages.filter((i,index)=>index!==position);
        const updateSubmitImages=submitImages.filter((i,index)=>index!==position);
        if(updateProductImages.length<4) this.handleProductImageErrors();
        this.setState({allproductImages:updateProductImages,submitImages:updateSubmitImages});
    }
    moreImageSelectionError=()=>{
        const error=this.moreThanFiveError.current.classList;
        error.add("more-than-five-selection-visible");
        setTimeout(()=>error.remove("more-than-five-selection-visible"),4000);
    }
    tryUploadAgian=()=>{
        this.setState({loading:false,beforeSuccess:false,uploadNote:null,uploadFail:false})
    }
}

export default AddProductMainContainer;