<script setup lang="ts">
import IndustryPageTemplate, { type UseCase, type FaqItem, type SimMessage } from './IndustryPageTemplate.vue'

const useCases: UseCase[] = [
  {
    title: 'Instant Test Drive Scheduling',
    desc: 'Capture car buyer leads from Meta ads and website inquiries. Let them choose car model, fuel variant, and preferred dealership or doorstep drive.',
    metric: '3.6x',
    metricLabel: 'Test Drive Bookings'
  },
  {
    title: 'Periodic Vehicle Service Reminders',
    desc: 'Trigger automated 6-month or 10,000 km service reminders with estimated pricing, free pick & drop booking, and digital estimate approval.',
    metric: '82%',
    metricLabel: 'Service Bay Retention'
  },
  {
    title: 'Brochure & Price List Delivery',
    desc: 'Share interactive model brochures, on-road price breakdowns, financing schemes, and exchange value calculators in under 3 seconds.',
    metric: '95%',
    metricLabel: 'Customer Satisfaction'
  },
  {
    title: 'Insurance Renewal & Extended Warranty',
    desc: 'Send vehicle insurance renewal alerts with comparison quotes and instant payment links 30 days before policy expiration.',
    metric: '2.8x',
    metricLabel: 'Policy Renewal Conversions'
  }
]

const chatSimulator: SimMessage[] = [
  {
    sender: 'user',
    text: 'Want to book a test drive for the new EV SUV ⚡',
    time: '01:20 PM'
  },
  {
    sender: 'bot',
    text: 'Hi Rohan! 🚗 The NexEV Long-Range (450km range) is available for test drive at our Koramangala hub or at your home.',
    time: '01:20 PM',
    buttons: ['Book Doorstep Drive 🏡', 'Visit Dealership 🏢', 'Download Brochure 📄']
  },
  {
    sender: 'user',
    text: 'Book Doorstep Drive 🏡',
    time: '01:21 PM'
  },
  {
    sender: 'bot',
    text: 'Great choice! Please share your delivery pincode or preferred day:',
    time: '01:21 PM',
    buttons: ['Tomorrow 11 AM', 'Saturday 04 PM', 'Sunday 11 AM']
  }
]

const faqs: FaqItem[] = [
  {
    q: 'Can dealerships route leads to specific sales advisors?',
    a: 'Yes, NexWhat supports dynamic agent assignment based on vehicle model, city, and dealership location.'
  },
  {
    q: 'Can we send service job cards and billing invoices via WhatsApp?',
    a: 'Yes! Automated webhooks allow your DMS (Dealer Management System) to dispatch final service bills and UPI payment links directly to vehicle owners.'
  },
  {
    q: 'How much do we save on WhatsApp message costs?',
    a: 'NexWhat offers 0% markup over official Meta pricing, saving dealerships up to 35% compared to legacy BSP providers.'
  }
]
</script>

<template>
  <IndustryPageTemplate
    industry-key="automobile"
    badge-text="Automobile & Dealerships"
    title="Accelerate Car Sales & Service Bookings on WhatsApp"
    subtitle="Book test drives, automate periodic vehicle servicing reminders, and share digital quotes with 0% markup."
    description="Engineered for car dealerships, two-wheeler showrooms, and multi-brand service stations. Automate high-intent test drive bookings, service reminders, and customer feedback surveys on official WhatsApp Cloud API."
    hero-metric-number="3.6x"
    hero-metric-label="Higher Test Drive Turnout"
    :use-cases="useCases"
    :chat-simulator="chatSimulator"
    :faqs="faqs"
  />
</template>
