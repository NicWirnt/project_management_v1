import UserSchema from "./User.schema.js";

export const insertUser = (obj) => {
  return UserSchema(obj).save();
};

export const getUser = () => {
  return UserSchema.find();
};
export const getUserById = (_id) => {
  return UserSchema.findById(_id);
};
//filter must be an object
export const getUserFilter = (filter) => {
  return UserSchema.findOne(filter);
};

export const updateUser = (filter, obj) => {
  return UserSchema.findOneAndUpdate(filter, obj, { new: true });
};
