export class ApiResponse<TResult>{
    isSuccess!: boolean;
    isFailure!: boolean;
    error!: ApiError
    result!: TResult;

    success(result: TResult): ApiResponse<TResult>{
        let resultObj = new ApiResponse<TResult>();

        resultObj.isSuccess = true;
        resultObj.isFailure = false;
        resultObj.result = result;
        resultObj.error = new ApiError("", "");

        return resultObj;
    }

    failure(error: ApiError): ApiResponse<TResult>{
        let resultObj = new ApiResponse<TResult>();

        resultObj.error = error;
        resultObj.isFailure = true;
        resultObj.isSuccess = false;

        return resultObj;
    }
}

export class ApiError{
    code!: string;
    message!: string;


    constructor(code: string, message: string){
        this.code = code;
        this.message = message
    }


}