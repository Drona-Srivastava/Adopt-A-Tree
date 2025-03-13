const API_URL = 'https://your-api-endpoint.com';

export async function adoptTree(treeData) {
  const response = await fetch(`${API_URL}/adopt-tree`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treeData)
  });
  if (!response.ok) {
    throw new Error('Tree adoption failed');
  }
  return await response.json();
}

export async function processPayment(paymentData) {
  const response = await fetch(`${API_URL}/process-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  });
  if (!response.ok) {
    throw new Error('Payment processing failed');
  }
  return await response.json();
}
