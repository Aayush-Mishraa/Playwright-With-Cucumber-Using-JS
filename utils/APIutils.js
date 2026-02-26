class APIutils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {

            data: this.loginPayload

        })

        const loginData = await loginResponse.json();
        const token = loginData.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {


            data: orderPayload,
            headers: {
                'Authorization': response.token,//this is refering to the getToken method of the class, which will return the token that we need to use in the header of the request
                'Content-type': 'application/json',//what if we using getToken without this, then we will get an error because the server will not understand the request and will not be able to process it, so we need to specify the content type of the request as application/json, which is the format that the server expects to receive the data in
            }
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponse);
        const orderId = orderResponseJson.orders[0];
        console.log(orderId);
        response.orderId = orderId;
        return response;
    }
}

module.exports = APIutils;