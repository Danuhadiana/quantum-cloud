// Cloudflare Pages Function: /api/create-transaction
export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const serverKey = context.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-vZfk_30Ff15~004vBo1esFfQ";
    const authString = btoa(serverKey + ":");

    const midtransRes = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Basic ${authString}`
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: data.orderId || `INV-QTM-${Date.now()}`,
          gross_amount: data.amount || 1500000
        },
        customer_details: {
          first_name: data.customerName || "Klien Quantum",
          phone: data.customerPhone || "089507146296"
        }
      })
    });

    const result = await midtransRes.json();
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
