import { lucia } from "lucia";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { github } from "@lucia-auth/oauth/providers";
import { astro } from "lucia/middleware";
import sqlite from "better-sqlite3";

const db = sqlite("main.db");

export const auth = lucia({
	adapter: betterSqlite3(db, {
		user: "user",
		session: "user_session",
		key: "user_key"
	}),
	middleware: astro(),
	env: import.meta.env.DEV ? "DEV" : "PROD",
	getUserAttributes: (data) => {
		return {
			githubUsername: data.github_username
		};
	}
});

export const githubAuth = github(auth, {
	clientId: import.meta.env.GITHUB_CLIENT_ID,
	clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
