// Notification Service for Palace OS
// Handles email, SMS, and push notifications

import { supabase } from '@/lib/auth/supabase';
import type { NotificationConfig } from '@/packages/config/src/types';

export class NotificationService {
  private config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.config = config;
  }

  // Email notifications using Resend
  async sendEmail(to: string, templateKey: string, data: Record<string, any> = {}): Promise<boolean> {
    if (!this.config.email.enabled) {
      console.warn('Email notifications are disabled');
      return false;
    }

    try {
      // Get template from config
      const template = this.config.email.templates[templateKey];
      if (!template) {
        console.error(`Email template ${templateKey} not found`);
        return false;
      }

      // Replace placeholders in template
      let message = template;
      Object.keys(data).forEach(key => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), data[key]);
      });

      // In a real implementation, we would call Resend API here
      // For now, we'll simulate the API call and store in database
      await this.storeNotification({
        type: 'email',
        recipient: to,
        templateKey,
        data,
        status: 'sent'
      });

      console.log(`Email sent to ${to} with template ${templateKey}`);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      await this.storeNotification({
        type: 'email',
        recipient: to,
        templateKey,
        data,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  // SMS notifications using Termii (Nigerian gateway)
  async sendSMS(to: string, templateKey: string, data: Record<string, any> = {}): Promise<boolean> {
    if (!this.config.sms.enabled) {
      console.warn('SMS notifications are disabled');
      return false;
    }

    try {
      // Get template from config
      const template = this.config.sms.templates[templateKey];
      if (!template) {
        console.error(`SMS template ${templateKey} not found`);
        return false;
      }

      // Replace placeholders in template
      let message = template;
      Object.keys(data).forEach(key => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), data[key]);
      });

      // In a real implementation, we would call Termii API here
      // For now, we'll simulate the API call and store in database
      await this.storeNotification({
        type: 'sms',
        recipient: to,
        templateKey,
        data,
        status: 'sent'
      });

      console.log(`SMS sent to ${to} with template ${templateKey}`);
      return true;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      await this.storeNotification({
        type: 'sms',
        recipient: to,
        templateKey,
        data,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  // Push notifications using FCM
  async sendPushNotification(userId: string, templateKey: string, data: Record<string, any> = {}): Promise<boolean> {
    if (!this.config.push.enabled) {
      console.warn('Push notifications are disabled');
      return false;
    }

    try {
      // Get template from config (though push notifications might have different structure)
      const template = this.config.email.templates[templateKey] || `Notification: ${templateKey}`;
      
      // Replace placeholders in template
      let message = typeof template === 'string' ? template : JSON.stringify(template);
      Object.keys(data).forEach(key => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), data[key]);
      });

      // In a real implementation, we would call FCM API here
      // For now, we'll simulate the API call and store in database
      await this.storeNotification({
        type: 'push',
        recipient: userId,
        templateKey,
        data,
        status: 'sent'
      });

      console.log(`Push notification sent to user ${userId} with template ${templateKey}`);
      return true;
    } catch (error) {
      console.error('Failed to send push notification:', error);
      await this.storeNotification({
        type: 'push',
        recipient: userId,
        templateKey,
        data,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  // Store notification in database for tracking
  private async storeNotification(notification: {
    type: 'email' | 'sms' | 'push';
    recipient: string;
    templateKey: string;
    data: Record<string, any>;
    status: 'sent' | 'failed';
    error?: string;
  }): Promise<void> {
    try {
      await supabase.from('notifications').insert([{
        type: notification.type,
        recipient: notification.recipient,
        template_key: notification.templateKey,
        data: notification.data,
        status: notification.status,
        error: notification.error || null,
        created_at: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Failed to store notification:', error);
      // Don't throw here as we don't want to fail the notification sending
    }
  }

  // Get notification history for a user
  async getNotificationHistory(userId: string, limit = 50): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('recipient', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get notification history:', error);
      return [];
    }
  }
}

// Factory function to create notification service with default config
export function createNotificationService(): NotificationService {
  // In a real app, we would fetch this from config endpoint or use fallback
  // For now, we'll use the fallback config from defaults
  import { fallbackNotificationConfig } from '@/packages/config/src/defaults';
  return new NotificationService(fallbackNotificationConfig);
}