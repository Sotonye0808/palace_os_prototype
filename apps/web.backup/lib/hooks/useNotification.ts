import { useCallback } from 'react';
import { createNotificationService, NotificationService } from '@/lib/services/notification';

export function useNotification() {
  const notificationService = useCallback(() => {
    return createNotificationService();
  }, []);

  const sendEmail = useCallback(async (
    to: string, 
    templateKey: string, 
    data: Record<string, any> = {}
  ): Promise<boolean> => {
    const service = notificationService();
    return service.sendEmail(to, templateKey, data);
  }, [notificationService]);

  const sendSMS = useCallback(async (
    to: string, 
    templateKey: string, 
    data: Record<string, any> = {}
  ): Promise<boolean> => {
    const service = notificationService();
    return service.sendSMS(to, templateKey, data);
  }, [notificationService]);

  const sendPushNotification = useCallback(async (
    userId: string, 
    templateKey: string, 
    data: Record<string, any> = {}
  ): Promise<boolean> => {
    const service = notificationService();
    return service.sendPushNotification(userId, templateKey, data);
  }, [notificationService]);

  const getNotificationHistory = useCallback(async (
    userId: string, 
    limit = 50
  ): Promise<any[]> => {
    const service = notificationService();
    return service.getNotificationHistory(userId, limit);
  }, []);

  return {
    sendEmail,
    sendSMS,
    sendPushNotification,
    getNotificationHistory
  };
}