export function Settings() {
  return `
    <h1>Settings</h1>
    <form id="settings-form">
      <p id="username"></p>
      <p id="useremail"></p>
    </form>
  `;
}

export function registerHandlers() {

  setTimeout(() => { //Defines la funcion, no se ejecuta aun
    const form = document.querySelector<HTMLFormElement>("#settings-form")!;
    const usernameField = document.querySelector<HTMLParagraphElement>("#username")!;
    const emailField = document.querySelector<HTMLParagraphElement>("#useremail")!;
  
    async function fetchUserData() {
      try {
        console.log("Hace la petición");
        const me = await fetch("http://localhost:8080/users/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include" // Asegura que las cookies se envíen con la solicitud
        });
        console.log("Sale de la petición");
        const data = await me.json();
        if (me.ok) {
          usernameField.textContent = `Username: ${data.username}`;
          emailField.textContent = `Email: ${data.email}`;
        } else {
          console.error("Error fetching user data:", data);
        }
      } catch (err) {
        console.error("⚠️ Failed to reach server");
      }
    }

    fetchUserData(); // Aqui se ejecuta la funcion

  }, 0);
}