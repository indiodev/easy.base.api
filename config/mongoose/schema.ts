/* eslint-disable no-undef */
import mongoose, { Schema } from "mongoose";

// Enum for UserRole
const UserRole = {
  ADMIN: "ADMIN",
  CREATOR: "CREATOR",
  REVISOR: "REVISOR",
  COLLABORATOR: "COLLABORATOR",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
  USER: "USER",
};

// Role Schema
const RoleSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Setting Schema
const SettingSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  value: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Permission Schema
const PermissionSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  roles: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Group Schema
const GroupSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  level: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// User Schema
const UserSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Table" }],
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  rows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Row" }],
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Form" }],
  config: { type: Schema.Types.Mixed },
});

// Column Type
const ColumnSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  identifier: { type: String },
  slug: { type: String },
  type: { type: String },
  data: { type: Schema.Types.Mixed },
  config: { type: Schema.Types.Mixed },
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

// Row Type
const RowSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  value: { type: Schema.Types.Mixed },
  config: { type: Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Review Schema
const ReviewSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  text: { type: String },
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rowId: { type: mongoose.Schema.Types.ObjectId, ref: "Row" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Form Schema
const FormSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, default: "", required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  published: { type: Boolean, default: false },
  description: { type: String, default: "" },
  visits: { type: Number, default: 0 },
  submissions: { type: Number, default: 0 },
  shareUrl: { type: String, default: "" },
  formSubmissions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FormSubmissions" },
  ],
});

// FormSubmissions Schema
const FormSubmissionsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  created_at: { type: Date, default: Date.now },
  form: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  content: { type: String, required: true },
});

// Table Schema
const TableSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  identifier: { type: String, required: true },
  rows: [RowSchema],
  columns: [ColumnSchema],
  config: { type: Schema.Types.Mixed },
  schema: { type: Schema.Types.Mixed },
  data_collection: { type: String },
  category: { type: String },
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});


// Models
const Role = mongoose.model<RoleDocument>("Role", RoleSchema, "Role");
const Setting = mongoose.model("Setting", SettingSchema, "Setting");
const Permission = mongoose.model<PermissionDocument>(
  "Permission",
  PermissionSchema,
  "Permission",
);
const Group = mongoose.model<GroupDocument>("Group", GroupSchema, "Group");
const User = mongoose.model<UserDocument>("User", UserSchema, "User");
const Table = mongoose.model<TableDocument>("Table", TableSchema, "Table");
const Column = mongoose.model<ColumnDocument>("Column", ColumnSchema, "Column");
const Row = mongoose.model<RowDocument>("Row", RowSchema, "Row");
const Review = mongoose.model<ReviewDocument>("Review", ReviewSchema, "Review");
const Form = mongoose.model<FormDocument>("Form", FormSchema, "Form");
const FormSubmissions = mongoose.model<FormSubmissionsDocument>(
  "FormSubmissions",
  FormSubmissionsSchema,
  "FormSubmissions",
);

export interface InteractionDocument extends Document {
  userId: any;
  value: any;
  timestamp: Date;
}

export interface RoleDocument extends Document {
  role: keyof typeof UserRole;
  permissions: Schema.Types.ObjectId[];
  users: Schema.Types.ObjectId[];
}

export interface PermissionDocument extends Document {
  title: string;
  slug: string;
  roles: Schema.Types.ObjectId;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  userId: Schema.Types.ObjectId;
}

export interface GroupDocument extends Document {
  title: string;
  level: string;
  users: Schema.Types.ObjectId[];
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  group?: Schema.Types.ObjectId;
  tables?: Schema.Types.ObjectId[];
  status?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  reviews?: Schema.Types.ObjectId[];
  rows?: Schema.Types.ObjectId[];
  role?: Schema.Types.ObjectId;
  formIds?: Schema.Types.ObjectId[];
  config?: any;
}

export interface TableDocument extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  identifier: string;
  rows: any[] | RowDocument[];
  columns: ColumnDocument[];
  schema?: Schema.Types.Mixed;
  config?: any;
  category?: string;
  data_collection?: string;
  status?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  owner: Schema.Types.ObjectId;
}

export interface ColumnDocument extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  identifier?: string;
  slug?: string;
  type?: string;
  data?: any;
  config?: any;
  status?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RowDocument extends Document {
  value: any;
  config?: any;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  userId: Schema.Types.ObjectId;
}

export interface ReviewDocument extends Document {
  title: string;
  text?: string;
  status?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by: Schema.Types.ObjectId;
  rowId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

export interface FormDocument extends Document {
  title: string;
  table: Schema.Types.ObjectId;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by: Schema.Types.ObjectId;
  published: boolean;
  description?: string;
  visits: number;
  submissions: number;
  shareUrl?: string;
  formSubmissions: Schema.Types.ObjectId[];
}

export interface FormSubmissionsDocument extends Document {
  created_at: Date;
  form: Schema.Types.ObjectId;
  content: string;
}

export const Schemas = {
  RoleSchema,
  SettingSchema,
  PermissionSchema,
  GroupSchema,
  UserSchema,
  TableSchema,
  ColumnSchema,
  RowSchema,
  ReviewSchema,
  FormSchema,
  FormSubmissionsSchema,
};

export const Models = {
  Role,
  Setting,
  Permission,
  Group,
  User,
  Table,
  Column,
  Row,
  Review,
  Form,
  FormSubmissions,
  UserRole,
};