Discount = new Mongo.Collection("discount");

DiscountMethods = (function () {
    var methods = {};
    methods.validateDiscount = function(companyId, discountCode) {
        var discount = Discount.findOne(discountCode);
        var returnValue = {result: false};
        if (discount && ("all" === discount.companyId || companyId === discount.companyId)) {
            returnValue = {result: true, percentage: discount.percentage};
        }
        return returnValue;
    };
    return methods;
})();
