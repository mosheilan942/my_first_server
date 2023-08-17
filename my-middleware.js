const regemail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const regpass = new RegExp(/^(?=[a-zA-Z]*[a-z])(?=[a-zA-Z]*[A-Z])[a-zA-Z0-9]{8}$/);


export const checkvalid = (req, res, next) => {
    regemail.test(req.body.email) ? null : res.send("the email is not valid")
    regpass.test(req.body.password) ? null : res.send("the the password is not valid")
    next()
    };


export const printParams = (req, res, next) => {
    const {params} = req
    console.log(`my params are: ${params}`);
    next()
}

