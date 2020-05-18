export interface ZaiusBrowserSdk extends Array<any> {
  /**
   * Used to send events to Zaius
   * @param {string} eventType - The event type, e.g. "pageview"/"email"/"list"
   * @param {object} [eventData] - An object containing additional fields to be sent along with the event
   */
  event: (eventType: string, eventData?: Record<string, any>) => void;
  /**
   * Used to send entity (Object) updates/upserts to Zaius
   * @param {string} entityType - The name of the entity, e.g. "customer"
   * @param {object} entityData - An object containing a representation of the object,
   *    e.g. {email: "abc@def.com", first_name: "Abc Def"}
   */
  entity: (entityType: string, entityData: Record<string, any>) => void;
  /**
   * Used to identify a customer by customer_id
   * @param {string} customerId
   */
  identify: (customerId: string) => void;
  /**
   * Refreshes the cookie identifier and removes any cached customer_id
   * meaning that subsequent events from this browser window shouldn't be
   * associated to the previous events from the session
   */
  anonymize: () => void;
  /**
   * Used to call a Zaius plugin
   * @param {string} pluginName - The name of the plugin to invoke a function on
   * @param {string} pluginFunctionName - The name of the function to invoke on the plugin
   * @param {...object} args - Arguments to be passed to the plugin function
   */
  dispatch: (
    pluginName: string,
    pluginFunctionName: string,
    ...args: any[]
  ) => void;
}
