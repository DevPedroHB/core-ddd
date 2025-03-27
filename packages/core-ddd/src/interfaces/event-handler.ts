/**
 * Interface que define um manipulador de eventos, responsável por configurar as assinaturas necessárias.
 */
export interface EventHandler {
	/**
	 * Configura a assinatura para os eventos que este manipulador irá tratar.
	 */
	setupSubscription(): void;
}
