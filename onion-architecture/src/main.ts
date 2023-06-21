import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import { routes } from "@onion-architecture/user-interface";

class Application {
	private static readonly port = 3000;

	public static main(): void {
		const server = express();

		server.use(morgan("dev"));
		server.use(bodyParser.json());

		routes.forEach((route) => {
			server[route.method](route.path, route.controller);
		});

		server.listen(Application.port, () => console.log(`Onion architecture - Hotel application is running on port ${Application.port}`));
	}
}

Application.main();
