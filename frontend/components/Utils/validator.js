import validator from 'validator';

export const validate = (info) => {
  if (info.email === '' || info.password === '') {
    return { status: 'Failed', msg: 'All fields are required' }
  }

  if (!validator.isEmail(info.email)) {
    return { status: 'Failed', msg: 'Please enter valid email' }
  }
}