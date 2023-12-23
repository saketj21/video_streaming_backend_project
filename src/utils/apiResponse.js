class apiResponse{
    constructor(statusCode=200,message="success"){
        this.statusCode=statusCode;
        this.message=message;
        this.data=null;
        this.success=statusCode<400;
        this.errors=[];
    }
}
export {apiResponse}