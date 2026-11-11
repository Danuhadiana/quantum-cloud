import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'midtrans-dev-api',
      configureServer(server) {
        server.middlewares.use('/api/create-transaction', (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}');
                const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-vZfk_30Ff15~004vBo1esFfQ';
                const authString = Buffer.from(serverKey + ':').toString('base64');

                const channelMap = {
                  qris: ['qris', 'gopay', 'shopeepay'],
                  gopay: ['gopay', 'qris'],
                  dana: ['qris', 'gopay'],
                  bca: ['bca_va'],
                  mandiri: ['echannel', 'mandiri_clickpay'],
                  jago: ['other_va', 'bca_va', 'qris']
                };

                const payload = {
                  transaction_details: {
                    order_id: data.orderId || `INV-QTM-${Date.now()}`,
                    gross_amount: data.amount || 1500000
                  },
                  customer_details: {
                    first_name: data.customerName || 'Klien Quantum',
                    phone: data.customerPhone || '089507146296'
                  }
                };

                if (data.method && channelMap[data.method]) {
                  payload.enabled_payments = channelMap[data.method];
                }

                const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Basic ${authString}`
                  },
                  body: JSON.stringify(payload)
                });

                const result = await response.json();
                res.writeHead(response.ok ? 200 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message || 'Gagal memproses transaksi Midtrans' }));
              }
            });
          } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          }
        });
      }
    }
  ],
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
