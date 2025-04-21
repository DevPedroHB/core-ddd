import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import { UserCreatedEvent } from "@/domain/account/enterprise/events/user-created-event";
import { DomainEvents, EventHandler } from "@pedrohb/core-ddd";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CreateNotificationUseCase } from "../use-cases/create-notification";

export class OnUserCreatedSubscriber implements EventHandler {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly createNotificationUseCase: CreateNotificationUseCase,
	) {
		this.setupSubscription();
	}

	public setupSubscription(): void {
		DomainEvents.register(
			this.sendUserCreatedNotification.bind(this),
			UserCreatedEvent.name,
		);
	}

	private async sendUserCreatedNotification(event: UserCreatedEvent) {
		const user = await this.usersRepository.findByFields({
			id: event.getAggregateId(),
		});

		if (!user) {
			return;
		}

		const content = [
			{
				type: "h1",
				children: [{ text: `Bem‑vindo(a) à FastFeet, **${user.name}**! 🏎️🚚` }],
			},
			{
				type: "p",
				children: [
					{ text: "Sua conta foi criada em " },
					{
						text: format(user.createdAt, "PPPPp", {
							locale: ptBR,
						}),
						bold: true,
					},
					{
						text: ". Agora você pode gerenciar e rastrear suas encomendas facilmente.",
					},
				],
			},
			{
				type: "ul",
				children: [
					{
						type: "li",
						children: [{ text: "📦 Adicionar endereços de coleta" }],
					},
					{ type: "li", children: [{ text: "🗓️ Agendar sua primeira coleta" }] },
					{
						type: "li",
						children: [{ text: "🔍 Acompanhar envios em tempo real" }],
					},
				],
			},
			{
				type: "p",
				children: [
					{ text: "Acesse seu painel de controle em " },
					{
						type: "link",
						url: "https://fastfeet.com/dashboard",
						children: [{ text: "fastfeet.com/dashboard" }],
					},
					{ text: " ou visite nossa " },
					{
						type: "link",
						url: "https://fastfeet.com/ajuda",
						children: [{ text: "Central de Ajuda" }],
					},
					{ text: "." },
				],
			},
		];

		await this.createNotificationUseCase.execute({
			title: `Bem‑vindo(a) à FastFeet, ${user.name}!`,
			content: JSON.stringify(content),
			recipientId: user.id.id,
		});
	}
}
