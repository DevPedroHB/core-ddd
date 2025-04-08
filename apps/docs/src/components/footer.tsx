import { getYear } from "date-fns";
import { Link } from "./ui/link";

export function Footer() {
	const currentDate = getYear(new Date());

	return (
		<footer className="flex justify-center items-center bg-card p-4 border-t text-card-foreground">
			<h2 className="text-muted-foreground text-sm">
				&copy; {currentDate}{" "}
				<Link
					href="https://www.npmjs.com/package/@pedrohb/core-ddd"
					target="_blank"
				>
					@pedrohb/core-ddd
				</Link>
				. Todos os direitos reservados.
			</h2>
		</footer>
	);
}
