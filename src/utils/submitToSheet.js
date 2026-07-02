// Envía cada respuesta completa a un Google Sheet mediante un Google Apps Script
// desplegado como Web App. Ver /GOOGLE_SHEET_SETUP.md para las instrucciones
// de cómo crear ese script (5 minutos, sin costo).
//
// Mientras no configures la URL, el envío se omite silenciosamente y la persona
// igual ve su resultado con normalidad — nunca bloquea la experiencia del usuario.

const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbytjKYIWFTyLnFZ0MyECK2ybBLNvNqHUFT7TPa8wQFyGOtk-vDSmngc72yrCw2oP2KlEA/exec";

export async function submitToSheet(payload) {
  if (!SHEET_WEBHOOK_URL) {
    console.warn(
      "SHEET_WEBHOOK_URL no configurada: la respuesta no se guardó en el Sheet. Ver GOOGLE_SHEET_SETUP.md"
    );
    return { skipped: true };
  }

  try {
    await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script Web Apps no devuelven CORS headers legibles
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch (err) {
    console.error("No se pudo guardar la respuesta en el Sheet:", err);
    return { ok: false, error: err };
  }
}
