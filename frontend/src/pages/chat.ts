export function Chat(): string {
    return `
        <div class="chat-container">
            <h1>Chat en Tiempo Real</h1>
            
            <!-- Sección para enviar mensajes -->
            <div class="chat-section">
                <h3>Enviar Mensaje</h3>
                <form id="message-form">
                    <input type="number" id="recipient-id" placeholder="ID del destinatario" required />
                    <input type="text" id="message-content" placeholder="Escribe tu mensaje..." required />
                    <button type="submit">Enviar</button>
                </form>
                <div id="message-result"></div>
            </div>

            <!-- Sección para ver conversaciones -->
            <div class="chat-section">
                <h3>Mis Conversaciones</h3>
                <button id="load-conversations">Cargar Conversaciones</button>
                <div id="conversations-list"></div>
            </div>
        </div>
    `;
}