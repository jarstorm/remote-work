AccountsTemplates.configureRoute('verifyEmail', {
    name: 'verifyEmail',
    path: '/verifyemail',
    redirect: '/',
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    redirect: '/',
});

AccountsTemplates.addField({
    _id: "type",
    type: "select",
    displayName: "User type",
    select: [
        {
            text: "Company",
            value: "company",
        },
        /*{
            text: "User",
            value: "user",
        },*/
    ],
});

AccountsTemplates.configure({
    // Behaviour
    sendVerificationEmail: true,
    enablePasswordChange: true,
});    


AccountsTemplates.configureRoute('changePwd', {
    name: 'changePwd',
    path: '/changePwd',
    redirect: '/',
});
