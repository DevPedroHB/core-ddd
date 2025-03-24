export abstract class UseCase<UseCaseRequest, UseCaseResponse> {
	abstract execute(request: UseCaseRequest): Promise<UseCaseResponse>;
}
