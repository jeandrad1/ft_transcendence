export function ErrorPage(): string {
    return `
        <div class="error-page" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
            <h1 style="color:#ff4444;">Error</h1>
            <p>Something went wrong. Please try again or contact support.</p>
            <a href="#/" style="color:#25D366;">Go to Home</a>
        </div>
    `;
}
