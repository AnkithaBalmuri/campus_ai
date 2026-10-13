export function requireEnv(name: string) { const value = process.env[name]; if (!value) throw new Error(`${name} is not configured. Add it to .env.local.`); return value; }
export function configured(...names: string[]) { return names.every((name) => Boolean(process.env[name])); }
