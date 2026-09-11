<script setup lang="ts">
import IndustryPageTemplate, { type UseCase, type FaqItem, type SimMessage } from './IndustryPageTemplate.vue'

const useCases: UseCase[] = [
  {
    title: 'Instant Site Visit Booking',
    desc: 'Let prospective homebuyers pick their preferred weekend date and time slot right inside WhatsApp with automated calendar sync and Google Maps pin.',
    metric: '3.5x',
    metricLabel: 'Site Visits Scheduled'
  },
  {
    title: 'Automated Brochure Dispatch',
    desc: 'Immediately deliver high-res floor plans, project brochures, pricing sheets, and virtual walk-through videos when leads click your Meta Ads.',
    metric: '88%',
    metricLabel: 'Instant Engagement Rate'
  },
  {
    title: 'Budget & BHK Pre-Qualification',
    desc: 'Filter serious buyers from window shoppers by automatically capturing budget range, preferred configuration (2BHK/3BHK), and purchase timeline.',
    metric: '55%',
    metricLabel: 'Sales Team Time Saved'
  },
  {
    title: 'WhatsApp Voice Calling & Transfers',
    desc: 'Enable real-time VoIP voice calling on WhatsApp. Automatically route high-intent calls to designated property relationship managers.',
    metric: '99%',
    metricLabel: 'High-Intent Call Connect'
  }
]

const chatSimulator: SimMessage[] = [
  {
    sender: 'user',
    text: 'Interested in the Prestige Lakeview 3BHK luxury apartments in Whitefield 🏢',
    time: '04:12 PM'
  },
  {
    sender: 'bot',
    text: 'Hello Vikram! 🌟 Welcome to Prestige Lakeview. We have ultra-luxury 3BHK residences starting at ₹1.45 Cr with lake views.',
    time: '04:12 PM',
    buttons: ['Download Floor Plans 📄', 'Schedule Site Visit 📅', 'Talk to Sales Manager 📞']
  },
  {
    sender: 'user',
    text: 'Schedule Site Visit 📅',
    time: '04:13 PM'
  },
  {
    sender: 'bot',
    text: 'Great! Please select your preferred day for a VIP guided tour (Complimentary cab pickup available):',
    time: '04:13 PM',
    buttons: ['This Saturday (11 AM)', 'This Sunday (03 PM)', 'Next Weekday']
  }
]

const faqs: FaqItem[] = [
  {
    q: 'Can our real estate brokers and agents make voice calls through WhatsApp?',
    a: 'Yes! NexWhat includes native WhatsApp Voice Calling with IVR trees and warm transfer support directly on your official WhatsApp Business number.'
  },
  {
    q: 'How does Click-to-WhatsApp ads work with NexWhat?',
    a: 'When an interested buyer clicks your Facebook or Instagram ad, a WhatsApp chat opens with their selected project pre-filled, triggering the chatbot instantly.'
  },
  {
    q: 'Can we assign leads to specific project managers based on location?',
    a: 'Yes, NexWhat’s routing engine automatically assigns conversations to specific teams or individual agents based on project, budget, or city.'
  }
]
</script>

<template>
  <IndustryPageTemplate
    industry-key="real-estate"
    badge-text="Real Estate & PropTech"
    title="Turn WhatsApp into Your #1 High-Value Property Closing Channel"
    subtitle="Automate site visit bookings, qualify homebuyer budgets, and send interactive brochures with 0% markup."
    description="Designed for real estate builders, brokerage firms, and property consultants. Combine instant brochure dispatch, automated site visit scheduling, and WhatsApp voice calling to close deals faster."
    hero-metric-number="3.5x"
    hero-metric-label="Increase in Site Visits"
    :use-cases="useCases"
    :chat-simulator="chatSimulator"
    :faqs="faqs"
  />
</template>
