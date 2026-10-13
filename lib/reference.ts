export function complaintReference(now = new Date(), random = Math.random) { return `CC-${now.getFullYear()}-${String(now.getTime()).slice(-6)}-${Math.floor(random() * 900 + 100)}`; }
