// Permission
Company.allow({
    insert: function (userId, doc) {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});

Job.allow({
    insert: function (userId, doc) {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});

WebPages.allow({
    insert: function (userId, doc) {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});

Discount.allow({
    insert: function (userId, doc) {
        return false;
    },
    update: function () {
        return false;
    },
    remove: function () {
        return false;
    }
});
