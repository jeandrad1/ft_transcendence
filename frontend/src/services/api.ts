export async function pingGateway(): Promise<string> {
    try {
        const res = await fetch("http://localhost:8080/ping");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return `Gateway status: ${data.pong}`;
    } catch (err) {
        console.error("Failed to reach gateway:", err);
        return "Gateway is unreachable";
    }
}