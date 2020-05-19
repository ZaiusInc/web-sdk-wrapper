export interface ConsentData {
  identifier_value: string;
  consent?: boolean;
  identifier_field_name?: string;
  update_reason?: string;
  update_ts?: number;
  event_data?: {};
}

export interface ListSubscriptionObject {
  list_id: string;
  email: string;
}

export interface ZaiusBrowserSdk {
  /**
   * Used to send events to Zaius
   */
  event: (eventType: string, eventData?: Record<string, any>) => void;
  /**
   * Used to send entity (Object) updates/upserts to Zaius
   */
  entity: (entityType: string, entityData: Record<string, any>) => void;
  /**
   * Used to identify a customer by customer_id
   */
  identify: (customerId: string) => void;
  /**
   * Add a callback when Zaius has loaded, if Zaius is already loaded then the function will be immediately invoked.
   */
  onload: (fn: () => void) => void;
  /**
   * Used to subscribe an email address to a list
   */
  subscribe: (
    subscriptionOptions: ListSubscriptionObject,
    onSuccess: () => void,
    onError: (message: string) => void
  ) => void;
  /**
   * Used to unsubscribe an email address from a list
   */
  unsubscribe: (
    subscriptionOptions: ListSubscriptionObject,
    onSuccess: () => void,
    onError: (message: string) => void
  ) => void;
  /**
   * Update the subscription status for a given identifier
   */
  consent: (
    consentObject: ConsentData,
    onSuccess?: () => void,
    onError?: (msg?: string) => void
  ) => Promise<string | void>;
  /**
   * Refreshes the cookie identifier and removes any cached customer_id
   * meaning that subsequent events from this browser window shouldn't be
   * associated to the previous events from the session
   */
  anonymize: () => void;
  /**
   * Used to call a Zaius plugin
   */
  dispatch: (
    pluginName: string,
    pluginFunctionName: string,
    ...args: any[]
  ) => void;
}
