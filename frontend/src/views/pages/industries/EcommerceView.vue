<script setup lang="ts">
import IndustryPageTemplate, { type UseCase, type FaqItem, type SimMessage } from './IndustryPageTemplate.vue'

const useCases: UseCase[] = [
  {
    title: 'Automated Cart Recovery',
    desc: 'Trigger personalized WhatsApp messages with product image, one-click checkout link, and exclusive coupon within 15 minutes of abandonment.',
    metric: '45%+',
    metricLabel: 'Cart Recovery Rate'
  },
  {
    title: 'COD to Prepaid Conversion',
    desc: 'Verify Cash on Delivery orders via interactive buttons and offer 5% instant discount to convert orders into UPI prepaid payments.',
    metric: '60%',
    metricLabel: 'RTO Drop Rate'
  },
  {
    title: 'Live Shipment Tracking',
    desc: 'Send real-time dispatch, transit, out-for-delivery, and proof-of-delivery notifications with live tracking links directly on WhatsApp.',
    metric: '80%',
    metricLabel: 'WISMO Ticket Reduction'
  },
  {
    title: 'VIP Reorder & Upsells',
    desc: 'Segment buyers by past order history (Shopify/WooCommerce) and broadcast replenishments, seasonal drops, and back-in-stock alerts.',
    metric: '3.8x',
    metricLabel: 'Repeat Purchase Revenue'
  }
]

const chatSimulator: SimMessage[] = [
  {
    sender: 'bot',
    text: 'Hey Priya! 👗 We noticed you left the Emerald Silk Maxi Dress in your bag. Complete your purchase now and get an extra 10% off with code SILK10!',
    time: '02:15 PM',
    buttons: ['Complete Order (₹1,799)', 'Talk to Stylist', 'Change Size']
  },
  {
    sender: 'user',
    text: 'Complete Order (₹1,799)',
    time: '02:16 PM'
  },
  {
    sender: 'bot',
    text: 'Awesome! 🎉 Your checkout link has been generated: https://brand.store/checkout/9821. Tap below to pay via GPay/PhonePe and save ₹200!',
    time: '02:16 PM'
  }
]

const faqs: FaqItem[] = [
  {
    q: 'Can I integrate NexWhat with Shopify or WooCommerce?',
    a: 'Yes! NexWhat provides native webhooks and REST APIs to sync orders, customer data, and abandoned carts seamlessly with Shopify, WooCommerce, and custom web stores.'
  },
  {
    q: 'How does Direct Meta Billing save money for D2C brands?',
    a: 'Middlemen BSPs add a 20% to 35% surcharge on top of Meta fees. With NexWhat, you pay Meta wholesale rates directly. Plus, the first 1,000 customer service conversations every month are 100% free.'
  },
  {
    q: 'Can I broadcast seasonal flash sales to 50,000+ customers?',
    a: 'Absolutely. Using pre-approved Meta utility or marketing message templates, you can schedule and send high-volume broadcasts with 98% open rates without phone number bans.'
  }
]
</script>

<template>
  <IndustryPageTemplate
    industry-key="ecommerce"
    badge-text="E-Commerce & D2C Brands"
    title="Scale Your Online Store with High-Converting WhatsApp Automation"
    subtitle="Recover abandoned carts, eliminate RTO losses, and drive 3.8x repeat purchases with zero markup fees."
    description="Connect your Shopify, WooCommerce, or custom storefront directly to official Meta WhatsApp Cloud API. Send automated cart recovery triggers, COD confirmations, and tracking updates while saving thousands in markup costs."
    hero-metric-number="45%"
    hero-metric-label="Average Cart Recovery"
    :use-cases="useCases"
    :chat-simulator="chatSimulator"
    :faqs="faqs"
  />
</template>
