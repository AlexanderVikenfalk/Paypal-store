$(document).ready(function () {
    var mySwitch = 1;
    var bearer;
    var token;
    var content;

    

    // Step #1 Authorization
        var bearer;
        var URL = window.location.href;
        var total;
     

        // Step #1 Authorization
        var sendData = function () {
            var bananas = $('#bananas').val();
            var bananasPrice = 3;
            var bananasTotal = bananas * bananasPrice;
            
            content = content = {
                "intent": "sale",
                "redirect_urls": {
                    "return_url": "http://alexander-paypalstore20170226075102.azurewebsites.net",
                    "cancel_url": "http://example.com/your_cancel_url.html"
                },
                "payer": {
                    "payment_method": "paypal"
                },
                "transactions": [
                  {
                      "amount": {
                          "total": bananasTotal,
                          "currency": "SEK"
                      },
                      "description": "This is the payment transaction description.",
                      "item_list": {
                          "items": [
                            {
                                "name": "bananas",
                                "price": bananasPrice,
                                "currency": "SEK",
                                "quantity": bananas,
                                "description": "Tasty bananas"
                            }
                          ]
                      }
                  }
                ]
            };

            $.ajax({
                url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
                type: 'post',
                data: {
                    grant_type: 'client_credentials'

                },
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    "Authorization": 'Basic QWRZSHplUmVXYzlBcFdIRmdvS2hxcjRxN3VrN2hkbnNRYnRxaFptR1p1ZzlUY3gwM2o0YUhDU2dJUXVKblpUVFVmUUdHa1pRQXpLY2U3TEI6RU54UGxWcGtwbTFTMjIwTWlrSVltQjJrUkNDVS1aN3ppMjVucWc1VmpnWjZHaFNpTXBwVURXZVFZY25ZWi1zZVBWR1JGbW1LYnI2Q0lCbFI='
                },
                dataType: 'json',
                success: function (data) {
                    bearer = "Bearer " + data.access_token;
                    token = data.access_token;
                    //console.log("Data is "+data);
                    paymentrequest();
                }
            });
            
        }

        

        // step #2 Paymentrequest
       
        

        var paymentrequest = function () {
            $.getJSON("http://localhost:64433/SendKey?bearer=" + token + "", function (json) {
            });
            
            $.ajax({
                url: 'https://api.sandbox.paypal.com/v1/payments/payment/',
                type: 'post',
                data: JSON.stringify(content),
                headers: {
                    "Content-Type": 'application/json', 
                    "Authorization": bearer
                },
                dataType: 'json',
                success: function (data) {
                    window.location.replace(data.links[1].href);



                }
            });
        }

        if (~URL.indexOf("paymentId") && mySwitch== 1) {
            mySwitch = 0;

            var paymentIDraw = URL.substring(URL.indexOf("paymentId"));
            var paymentIDtrimmed = paymentIDraw.substring(10);
            var paymentID = paymentIDtrimmed.substring(0, paymentIDtrimmed.indexOf("&token"));
            //console.log(paymentID);

            var payerIDraw = URL.substring(URL.indexOf("PayerID"));
            var payerID = payerIDraw.substring(8);
            var bodyApproveRequest = { "payer_id": "" + payerID + "" };
            //console.log(payerID);

            
            //Getting bearer from backend
            var getKey = function () {
                $.getJSON("http://localhost:64433/GetKey", function (json) {
                    bearer ="Bearer "+ json;
                    //console.log("bearer from backend is " + bearer)
                    paymentApprove();
                });

            };

            //Approving buy
            var paymentApprove = function () {
                console.log("Body approve request är " + JSON.stringify(bodyApproveRequest));
                $.ajax({
                    url: "https://api.sandbox.paypal.com/v1/payments/payment/" + paymentID + "/execute/",
                    type: 'post',
                    data: JSON.stringify(bodyApproveRequest),
                    headers: {
                        "Content-Type": 'application/json', 
                        "Authorization": bearer
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log("suceess");
                    },
                    fail: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        //console.log(bearer);
                    },

                });
            }
            getKey();
        }
        $('#search').click(sendData);
    });
