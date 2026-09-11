<script setup lang="ts">
import IndustryPageTemplate, { type UseCase, type FaqItem, type SimMessage } from './IndustryPageTemplate.vue'

const useCases: UseCase[] = [
  {
    title: 'Automated EMI & Loan Reminders',
    desc: 'Send timely, personalized EMI payment alerts with dynamic payment links, avoiding late penalty fees and improving loan recovery rates.',
    metric: '94%',
    metricLabel: 'Timely EMI Collections'
  },
  {
    title: 'KYC Document Collection & Verification',
    desc: 'Guide borrowers step-by-step through uploading Aadhaar, PAN card, and salary slips via encrypted WhatsApp chat with automated OCR hooks.',
    metric: '68%',
    metricLabel: 'Faster Loan Approval'
  },
  {
    title: 'Policy Renewals & Statement Dispatch',
    desc: 'Send insurance renewal reminders, policy documents in PDF format, and investment portfolio summaries with one-tap download.',
    metric: '3.2x',
    metricLabel: 'Policy Renewal Ratio'
  },
  {
    title: 'Instant Credit Eligibility Bot',
    desc: 'Provide an instant credit score check, loan eligibility estimator, or insurance premium calculator through an interactive conversational flow.',
    metric: '85%',
    metricLabel: 'Self-Serve Completion'
  }
]

const chatSimulator: SimMessage[] = [
  {
    sender: 'bot',
    text: 'Dear Rajesh, your personal loan EMI of ₹14,250 is due on 15th Sep. Pay now to maintain your 780+ CIBIL score.',
    time: '09:30 AM',
    buttons: ['Pay via UPI (Zero Fee)', 'Request 5-Day Grace Period', 'Download Statement']
  },
  {
    sender: 'user',
    text: 'Pay via UPI (Zero Fee)',
    time: '09:31 AM'
  },
  {
    sender: 'bot',
    text: '✅ Instant payment link: https://fin.bank/pay/emi-9812. You can also scan the QR code sent below via GPay, PhonePe, or Paytm.',
    time: '09:31 AM'
  }
]

const faqs: FaqItem[] = [
  {
    q: 'Is WhatsApp Cloud API compliant with banking privacy standards?',
    a: 'Yes. Messages are end-to-end encrypted in transit by Meta. NexWhat supports ISO 27001, SOC2 security controls, and role-based data isolation.'
  },
  {
    q: 'Can customers check their account balance via WhatsApp?',
    a: 'Yes, with our API webhooks, you can securely connect to your core banking system with 2-factor OTP verification for balance checks and mini statements.'
  },
  {
    q: 'What are the charges for financial service conversations?',
    a: 'Service conversations (customer-initiated inquiries) receive 1,000 free sessions every month from Meta with zero markup fees on NexWhat.'
  }
]
</script>

<template>
  <IndustryPageTemplate
    industry-key="finance"
    badge-text="Finance, FinTech & Banking"
    title="Automate Financial Services with Secure, High-Speed WhatsApp Messaging"
    subtitle="Accelerate loan disbursements, collect EMIs on time, and automate KYC verification with direct Meta billing."
    description="Engineered for FinTech lenders, NBFCs, insurance brokers, and wealth managers. Drive timely loan recovery, verify documents securely, and deliver monthly statements with 0% conversation surcharge."
    hero-metric-number="94%"
    hero-metric-label="On-Time EMI Recovery Rate"
    :use-cases="useCases"
    :chat-simulator="chatSimulator"
    :faqs="faqs"
  />
</template>
