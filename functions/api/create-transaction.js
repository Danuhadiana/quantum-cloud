// Cloudflare Pages Function: /api/create-transaction
export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const serverKey = context.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-vZfk_30Ff15~004vBo1esFfQ";
    const authString = btoa(serverKey + ":");

    // Pemetaan metode pembayaran terpilih ke kanal resmi Midtrans
    const channelMap = {
      qris: ["qris", "gopay", "shopeepay"],
      gopay: ["gopay", "qris"],
      dana: ["qris", "gopay"],
      bca: ["bca_va"],
      mandiri: ["echannel", "mandiri_clickpay"],
      jago: ["other_va", "bca_va", "qris"]
    };

    const payload = {
      transaction_details: {
        order_id: data.orderId || `INV-QTM-${Date.now()}`,
        gross_amount: data.amount || 1500000
      },
      customer_details: {
        first_name: data.customerName || "Klien Quantum",
        phone: data.customerPhone || "089507146296"
      }
    };

    if (data.method && channelMap[data.method]) {
      payload.enabled_payments = channelMap[data.method];
    }

    const midtransRes = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Basic ${authString}`
      },
      body: JSON.stringify(payload)
    });

    const result = await midtransRes.json();
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Gagal menghubungkan ke Midtrans" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
