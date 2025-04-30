import mongoose from 'mongoose';

const { Schema } = mongoose;

const settingsSchema = new Schema({
  userPreferences: {
    defaultLanguage: {
      type: String,
      enum: ['en', 'es', 'fr'],
      default: 'en',
    },
    timeZone: {
      type: String,
      enum: ['UTC', 'EST', 'PST'],
      default: 'UTC',
    },
    dateFormat: {
      type: String,
      enum: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
      default: 'MM/DD/YYYY',
    },
  },
  notificationSettings: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
    notificationFrequency: {
      type: String,
      enum: ['immediate', 'daily', 'weekly'],
      default: 'immediate',
    },
  },
  securitySettings: {
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    sessionTimeout: {
      type: Number,
      min: 5,
      max: 120,
      default: 30,
    },
    passwordExpiry: {
      type: Number,
      min: 30,
      max: 365,
      default: 90,
    },
  },
  backupSettings: {
    autoBackupSchedule: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily',
    },
  },
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
