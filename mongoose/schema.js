const mongoose = require('mongoose');
const { Schema } = mongoose;

// Enum for UserRole
const UserRole = {
  ADMIN: 'ADMIN',
  CREATOR: 'CREATOR',
  REVISOR: 'REVISOR',
  COLLABORATOR: 'COLLABORATOR',
  EDITOR: 'EDITOR',
  VIEWER: 'VIEWER',
  USER: 'USER'
};

// Role Schema
const RoleSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Setting Schema
const SettingSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  value: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Permission Schema
const PermissionSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  roles: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Group Schema
const GroupSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  level: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// User Schema
const UserSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Row' }],
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }]
});

// Table Schema
const TableSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  identifier: { type: String, required: true },
  rows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Row' }],
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
  config: { type: Schema.Types.Mixed },
  category: { type: String },
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }]
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
  deleted_at: { type: Date }
});

// Row Type
const RowSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  value: { type: Schema.Types.Mixed },
  config: { type: Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rowId: { type: mongoose.Schema.Types.ObjectId, ref: 'Row' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Form Schema
const FormSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, default: '', required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  published: { type: Boolean, default: false },
  description: { type: String, default: '' },
  visits: { type: Number, default: 0 },
  submissions: { type: Number, default: 0 },
  shareUrl: { type: String, default: () => uuid() },
  formSubmissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FormSubmissions' }]
});

// FormSubmissions Schema
const FormSubmissionsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  created_at: { type: Date, default: Date.now },
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  content: { type: String, required: true }
});

// Models
const Role = mongoose.model('Role', RoleSchema);
const Setting = mongoose.model('Setting', SettingSchema);
const Permission = mongoose.model('Permission', PermissionSchema);
const Group = mongoose.model('Group', GroupSchema);
const User = mongoose.model('User', UserSchema);
const Table = mongoose.model('Table', TableSchema);
const Column = mongoose.model('Column', ColumnSchema);
const Row = mongoose.model('Row', RowSchema);
const Review = mongoose.model('Review', ReviewSchema);
const Form = mongoose.model('Form', FormSchema);
const FormSubmissions = mongoose.model('FormSubmissions', FormSubmissionsSchema);

module.exports = { Role, Setting, Permission, Group, User, Table, Column, Row, Review, Form, FormSubmissions, UserRole };
