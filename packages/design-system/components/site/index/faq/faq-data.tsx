export const faqData = [
  {
    value: 'item-0',
    question: 'How secure are the payment transactions?',
    answer:
      "All payment data is handled securely through Stripe's PCI-compliant infrastructure. We never store sensitive card data on our servers, and all transactions are encrypted end-to-end.",
  },
  {
    value: 'item-1',
    question: 'How do webhooks help with payment processing?',
    answer:
      'Webhooks provide real-time notifications about payment events like successful charges, failed payments, or refunds. Our system automatically handles these events, updates your database, and can trigger custom business logic.',
  },
  {
    value: 'item-2',
    question: 'What happens if a webhook fails?',
    answer:
      'Our platform includes automatic retry logic for failed webhooks. We store events securely and attempt redelivery with exponential backoff. You can monitor webhook status and manually retry if needed.',
  },
  {
    value: 'item-3',
    question: 'What payment methods are supported?',
    answer:
      'Through Stripe, we support all major credit cards, digital wallets like Apple Pay and Google Pay, and local payment methods. The available methods can be customized based on your region and business needs.',
  },
  {
    value: 'item-4',
    question: 'Can I customize the payment flow?',
    answer:
      'Yes! You can customize the checkout experience, add your branding, configure payment methods, and set up specific business rules. Our webhook system can also be configured to trigger custom actions based on payment events.',
  },
  {
    value: 'item-5',
    question: 'How do I monitor payment and webhook activity?',
    answer:
      'Our dashboard provides real-time monitoring of payment transactions and webhook events. You can track successful payments, view failed webhooks, analyze performance metrics, and export detailed reports.',
  },
] as const
