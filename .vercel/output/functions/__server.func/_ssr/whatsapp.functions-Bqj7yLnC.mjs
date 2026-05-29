import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-CHbAJjby.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const sendInvoiceSchema = objectType({
  phone: stringType().min(5),
  filename: stringType().min(1),
  caption: stringType().min(1),
  pdfBase64: stringType().min(1)
});
const sendWhatsAppInvoicePdf_createServerFn_handler = createServerRpc({
  id: "15c063ea822cba8d4660da48eea48425d7b15e3f8912e7a5fcd13b794115b3cf",
  name: "sendWhatsAppInvoicePdf",
  filename: "src/lib/api/whatsapp.functions.ts"
}, (opts) => sendWhatsAppInvoicePdf.__executeServer(opts));
const sendWhatsAppInvoicePdf = createServerFn({
  method: "POST"
}).inputValidator(sendInvoiceSchema).handler(sendWhatsAppInvoicePdf_createServerFn_handler, async ({
  data
}) => {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v20.0";
  if (!accessToken || !phoneNumberId) {
    return {
      ok: false,
      reason: "missing_config",
      message: "WhatsApp Cloud API credentials are not configured."
    };
  }
  const cleanPhone = data.phone.replace(/\D/g, "");
  const recipient = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const pdfBytes = Uint8Array.from(atob(data.pdfBase64), (char) => char.charCodeAt(0));
  const mediaForm = new FormData();
  mediaForm.append("messaging_product", "whatsapp");
  mediaForm.append("type", "application/pdf");
  mediaForm.append("file", new Blob([pdfBytes], {
    type: "application/pdf"
  }), data.filename);
  const mediaResponse = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/media`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: mediaForm
  });
  const mediaResult = await mediaResponse.json().catch(() => ({}));
  if (!mediaResponse.ok || !mediaResult.id) {
    return {
      ok: false,
      reason: "media_upload_failed",
      message: mediaResult?.error?.message || "WhatsApp media upload failed."
    };
  }
  const messageResponse = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: recipient,
      type: "document",
      document: {
        id: mediaResult.id,
        caption: data.caption,
        filename: data.filename
      }
    })
  });
  const messageResult = await messageResponse.json().catch(() => ({}));
  if (!messageResponse.ok) {
    return {
      ok: false,
      reason: "message_send_failed",
      message: messageResult?.error?.message || "WhatsApp document message failed."
    };
  }
  return {
    ok: true,
    messageId: messageResult?.messages?.[0]?.id
  };
});
export {
  sendWhatsAppInvoicePdf_createServerFn_handler
};
