import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'midtrans-dev-api',
      configureServer(server) {
        server.middlewares.use('/api/create-transaction', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}');
                const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-vZfk_30Ff15~004vBo1esFfQ';
                const authString = Buffer.from(serverKey + ':').toString('base64');

                const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Basic ${authString}`
                  },
                  body: JSON.stringify({
                    transaction_details: {
                      order_id: data.orderId || `INV-QTM-${Date.now()}`,
                      gross_amount: data.amount || 1500000
                    },
                    customer_details: {
                      first_name: data.customerName || 'Klien Quantum',
                      phone: data.customerPhone || '089507146296'
                    }
                  })
                });

                const result = await response.json();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
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
