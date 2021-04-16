export const fieldValidator = (value) =>  !!value.length ? undefined : "The field cannot be empty"
export const maxLengthValidator = (length) => (value) => value.length > length ?  "Max length is " + length : undefined
export const minLengthValidator = (length) => (value) => value.length < length ?  "Min length is " + length : undefined
export const emailValidator = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? undefined : "This email does not appear to be valid."
}