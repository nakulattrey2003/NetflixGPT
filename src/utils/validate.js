const checkValidateData = (email, password) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^.{6,}$/.test(password);


    if(!isEmailValid) return "Email is not valid";
    if(!isPasswordValid) return "Password should be 6 or greater length";

    return null;
}

export default checkValidateData;