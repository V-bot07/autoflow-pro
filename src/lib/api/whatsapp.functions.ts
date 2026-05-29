import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const sendInvoiceSchema = z.object({
  phone: z.string().min(5),
  filename: z.string().min(1),
  caption: z.string().min(1),
  pdfBase64: z.string().min(1),
});

export const sendWhatsAppInvoicePdf = createServerFn({ method: "POST" })
  .inputValidator(sendInvoiceSchema)
  .handler(async ({ data }) => {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const apiVersion = process.env.WHATSAPP_API_VERSION || "v20.0";

    if (!accessToken || !phoneNumberId) {
      return {
        ok: false,
        reason: "missing_config",
        message: "WhatsApp Cloud API credentials are not configured.",
      };
    }

    const cleanPhone = data.phone.replace(/\D/g, "");
    const recipient = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const pdfBytes = Uint8Array.from(atob(data.pdfBase64), (char) => char.charCodeAt(0));
    const mediaForm = new FormData();
    mediaForm.append("messaging_product", "whatsapp");
    mediaForm.append("type", "application/pdf");
    mediaForm.append("file", new Blob([pdfBytes], { type: "application/pdf" }), data.filename);

    const mediaResponse = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/media`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: mediaForm,
    });

    const mediaResult = await mediaResponse.json().catch(() => ({}));
    if (!mediaResponse.ok || !mediaResult.id) {
      return {
        ok: false,
        reason: "media_upload_failed",
        message: mediaResult?.error?.message || "WhatsApp media upload failed.",
      };
    }

    const messageResponse = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipient,
        type: "document",
        document: {
          id: mediaResult.id,
          caption: data.caption,
          filename: data.filename,
        },
      }),
    });

    const messageResult = await messageResponse.json().catch(() => ({}));
    if (!messageResponse.ok) {
      return {
        ok: false,
        reason: "message_send_failed",
        message: messageResult?.error?.message || "WhatsApp document message failed.",
      };
    }

    return {
      ok: true,
      messageId: messageResult?.messages?.[0]?.id,
    };
  });
